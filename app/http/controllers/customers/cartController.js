const User = require('../../../models/user');

function cartController(){
    return{
        index (req,res){
            res.render('customers/cart');
        },
        update(req,res){
            // if(!req.user){
               
            //     return res.redirect('/');
            // }
            //console.log(req.user);
           
            if(!req.user.items){
                req.user.items = {
                    dishes: {},
                    totalQty: 0,
                    totalPrice: 0
                }
            }
            let cart = req.user.items;
            if(!cart.dishes[req.body._id]){
                cart.dishes[req.body._id]={
                    item: req.body,
                    qty:1
                }
                console.log( cart.dishes[req.body._id]);
                cart.totalQty= cart.totalQty + 1;
                cart.totalPrice= cart.totalPrice + req.body.price;
            }
            else{
                cart.dishes[req.body._id].qty = cart.dishes[req.body._id].qty + 1;
                cart.totalQty = cart.totalQty + 1;
                cart.totalPrice = cart.totalPrice + req.body.price;
            }
         User.findByIdAndUpdate(req.user._id, {items:cart}, function(err, docs){
            if (err){
                console.log(err);
            }
            else{
                console.log("Updated User : ", docs);
            }
         });
            console.log(req.user.items)
            return res.json({ totalQty: req.user.items.totalQty});
       
        }
        
       
    }
}
module.exports= cartController;