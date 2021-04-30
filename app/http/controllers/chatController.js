const Order = require('../../models/order');

function chatController(){
    return{
        async  index(req,res){
            console.log(req.params.id)
            const order=await Order.findById(req.params.id)
             
            if(req.user._id.toString() === order.customerId.toString()){

                const eventEmitter = req.app.get('eventEmitter');
                eventEmitter.emit('message', {id:req.body.orderId})
              return  res.render('chat', {order: order})
            }
            else{
                return res.redirect('/');

            }
        }
    }
}
module.exports= chatController;