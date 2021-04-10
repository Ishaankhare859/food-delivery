const authController = require("../app/http/controllers/authControllrer");
const homeController = require("../app/http/controllers/homeController");
const cartController = require("../app/http/controllers/customers/cartController");


function initRoutes(app){
    app.get("/",homeController().index);
    
    app.get("/signup",authController().signup);
    app.get("/signin",authController().signin);
    app.get("/cart",cartController().index);

}
module.exports=initRoutes;