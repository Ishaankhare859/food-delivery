const menu = require('../../models/menu');
function homeController(){
    return{
       async index(req,res){
          const dishes= await  menu.find()
                return  res.render('home', {dishes: dishes});
        
       
        }
    }
}
module.exports= homeController;