import axios from 'axios'
import Noty from 'noty'
import {initAdmin} from './admin'

let addToCart = document.querySelectorAll('.add-to-cart');
let cartCounter = document.querySelector('#cartCounter');
function updateCart(dish){
    axios.post('/update-cart', dish).then(res =>{
        cartCounter.innerText = res.data.totalQty; 
        new Noty({
            type: 'success',
            timeout: 1000,
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

initAdmin()