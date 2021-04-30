const Order = require('../../../models/order');

function adminchatController(){
    return{
        async  index(req,res){
           
            const order=await Order.findById(req.params.id)
            console.log(req.user.role )
            if(req.user.role === 'admin'){
              return  res.render('adminchat', {order: order})
            }
            else{
                return res.redirect('/');

            }
        }
    }
}
module.exports= adminchatController;