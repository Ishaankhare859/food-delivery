function authController(){
    return{
        signin (req,res){
            res.render('auth/signin');
        },
        signup (req,res){
            res.render('auth/signup');
        }
    }
}
module.exports= authController;