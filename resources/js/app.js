import axios from 'axios'
import Noty from 'noty'
import {initAdmin} from './admin'
import {initChat} from './chat'

import moment from 'moment'
let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cartCounter');
function updateCart(dish){
    axios.post('/update-cart', dish).then(res =>{
        cartCounter.innerText = res.data.totalQty; 
        new Noty({
            type: 'success',
            timeout: 100,
            text: 'Item added to cart',
            progressBar: false
        }).show()
      
    })
    .catch(err =>{
   //console.log('ishaandfghjkl;lkjhghjkl;')
          if(1){
            new Noty({
                type: 'error',
                timeout: 10000,
                text: 'Signin to add to cart',
                progressBar: false
            }).show()
        }
        else {
       new Noty({
        type: 'error',
        timeout: 1000,
        text: 'Something went wrong',
        progressBar: false
    }).show()
}
    })
}

addToCart.forEach((btn) =>{
btn.addEventListener('click', (e)=>{
    let dish = JSON.parse(btn.dataset.dish)
    //console.log('ishaannnnnnnnnnnnnnnnnnnnnnnnnnnnn');
   updateCart(dish)
})
})

//remove order alert
const alertMsg = document.querySelector('#success-alert')
if(alertMsg){
    setTimeout(()=>{
        alertMsg.remove()
    }, 2000)
}


//change order status
let statuses = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput.value : null
order = JSON.parse(order)
let time = document.createElement('small')

function updateStatus(order) {
    statuses.forEach((status) => {
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepCompleted = true;
    statuses.forEach((status) => {
       let dataProp = status.dataset.status
       if(stepCompleted) {
            status.classList.add('step-completed')
       }
       if(dataProp === order.status) {
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
           if(status.nextElementSibling) {
            status.nextElementSibling.classList.add('current')
           }
       }
    })

}
updateStatus(order);
// let name;
// let textarea = document.querySelector('#textarea')
// let messageArea = document.querySelector('.message__area')
// do {
//     name = prompt('Please enter your name: ')
// } while(!name)

// textarea.addEventListener('keyup', (e) => {
//     if(e.key === 'Enter') {
//         sendMessage(e.target.value)
//     }
// })

// function sendMessage(message) {
//     let msg = {
//         user: name,
//         message: message.trim()
//     }
//     // Append 
//     appendMessage(msg, 'outgoing')
//     textarea.value = ''
//     scrollToBottom()

//     // Send to server 
//     socket.emit('message', msg)

// }

// function appendMessage(msg, type) {
//     let mainDiv = document.createElement('div')
//     let className = type
//     mainDiv.classList.add(className, 'message')

//     let markup = `
//         <h4>${msg.user}</h4>
//         <p>${msg.message}</p>
//     `
//     mainDiv.innerHTML = markup
//     messageArea.appendChild(mainDiv)
// }
//socket.io
let socket =io();
//join
if(order){
    socket.emit('join', `order_${order._id}`)
}

let adminAreaPath = window.location.pathname;
console.log(adminAreaPath);
if(adminAreaPath.includes('admin')){
    initAdmin(socket)

    socket.emit('join', 'adminRoom');
}

let chatareaPath = window.location.pathname;
console.log(chatareaPath);
if(chatareaPath.includes('chat')){
    initChat(socket)
    socket.emit('join', `chat`);
    

}

socket.on('orderUpdated', (data)=>{
    const updatedOrder = {...order};
    updatedOrder.updatedAt = moment().format();
    updatedOrder.status = data.status;
    updateStatus(updatedOrder);
    new Noty({
        type: 'success',
        timeout: 1000,
        text: data.status,
        progressBar: false
    }).show()

})
// socket.on('message', (msg) => {
//     appendMessage(msg, 'incoming')
//     scrollToBottom()
// })

// function scrollToBottom() {
//     messageArea.scrollTop = messageArea.scrollHeight
// }