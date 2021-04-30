const Order = require('../../../models/order');
 const moment = require('moment');

 const User = require('../../../models/user');


function orderController(){

    return{
        store(req,res){
            console.log(req.body);

            //validate req
            const {phone, address}=req.body;
            console.log(phone)
            console.log(address)
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
              Order.populate(result, {path: 'customerId'},(err, placedOrder)=>{
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
                 const eventEmitter = req.app.get('eventEmitter');
                 eventEmitter.emit('orderPlaced', placedOrder)
                return res.redirect('/customers/orders');
              })
               
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
        },
      async  show(req,res){
            const order=await Order.findById(req.params.id)
            //check user and order match
            //Order.f
            if(req.user._id.toString() === order.customerId.toString()){
              return  res.render('customers/singleOrder', {order: order})
            }
            else{
                return res.render('/')
            }
        }
    }
}
module.exports = orderController;