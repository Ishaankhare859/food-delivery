const authController = require("../app/http/controllers/authControllrer");
const homeController = require("../app/http/controllers/homeController");
const cartController = require("../app/http/controllers/customers/cartController");

const guest = require('../app/http/middleware/guest')
function initRoutes(app){
    app.get("/",homeController().index);    
    app.get("/signup",guest,authController().signup);
    app.get("/signin",guest,authController().signin);
    app.post("/signin",authController().Postsignin);
    app.post('/signup',authController().postSignup);
    app.post('/logout',authController().logout);


    app.get("/cart",cartController().index);
    app.post('/update-cart', cartController().update)

}
module.exports=initRoutes;