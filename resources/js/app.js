import axios from 'axios'
import Noty from 'noty'


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
        new Noty({
            type: 'error',
            timeout: 1000,
            text: 'Something Went wrong',
            progressBar: false
        }).show()
    })
}

addToCart.forEach((btn) =>{
btn.addEventListener('click', (e)=>{
    let dish = JSON.parse(btn.dataset.dish)
    console.log(dish.name);
   updateCart(dish)
})
})