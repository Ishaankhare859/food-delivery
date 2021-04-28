const Order = require('../../../models/order');
 const moment = require('moment');

 const User = require('../../../models/user');


function orderController(){

    return{
        store(req,res){
            console.log(req.body);

            //validate req
            const {phone, address}=req.body;
            if(!phone || !address){
                req.flash('error', 'All fields are required');
                return res.redirect('/cart');
            }
            const order= new Order({
                customerId: req.user._id,
                items: req.user.items,
                phone,
                address
            })
            order.save()
            .then(result=>{
              
                req.user.items = {
                    dishes: {},
                    totalQty: 0,
                    totalPrice: 0
                }
                User.findByIdAndUpdate(req.user._id, {items:req.user.items}, function(err, docs){
                    if (err){
                        console.log(err);
                    }
                    else{
                        console.log("Updated User : ", docs);
                    }
                 });
                 req.flash('success', 'order placed Successfully');
                return res.redirect('/customers/orders');
            }).catch(err=>{
                console.log(err);
               return res.redirect('/cart');
            })
        }, 
       async index(req,res){
            const orders = await Order.find({customerId:req.user._id},
                 null,
                 {sort: {'createdAt':-1}});
                 res.header('Cache-Control', 'mo-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0')
            res.render('customers/orders', {orders: orders, moment: moment})
            console.log(orders._id);
        }
    }
}
module.exports = orderController;