const authController = require("../app/http/controllers/authControllrer");
const homeController = require("../app/http/controllers/homeController");
const cartController = require("../app/http/controllers/customers/cartController");
const orderController = require("../app/http/controllers/customers/orderController");
const AdminOrderController = require("../app/http/controllers/admin/orderController");

//middlewares
const guest = require('../app/http/middleware/guest')
const auth = require('../app/http/middleware/auth')
const admin = require('../app/http/middleware/admin')


function initRoutes(app){
    app.get("/",homeController().index);    
    app.get("/signup",guest,authController().signup);
    app.get("/signin",guest,authController().signin);
    app.post("/signin",authController().Postsignin);
    app.post('/signup',authController().postSignup);
    app.post('/logout',authController().logout);
//customer routes
    app.post('/orders',auth, orderController().store);
    app.get('/customers/orders',auth,orderController().index);



    app.get("/cart",cartController().index);
    app.post('/update-cart', cartController().update)

    //adminroutes
    app.get('/admin/orders', admin, AdminOrderController().index);

}
module.exports=initRoutes;