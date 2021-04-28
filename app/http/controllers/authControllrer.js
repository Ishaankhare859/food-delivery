const User = require('../../models/user');
const bcrypt = require('bcrypt');
const passport = require('passport');
function authController(){
    const _getRedirect=(req)=>{
        return req.user.role === 'admin' ? '/admin/orders' : '/'
    }
    return{
        signin (req,res){
            res.render('auth/signin');
        },
        Postsignin(req, res, next){
            passport.authenticate('local', (err, user, info)=>{
                if(err){
                    req.flash('error', info.message)
                    return next(err);
                }
                if(!user){
                    req.flash('error', info.message)
                    return res.redirect('/signin');
                }
                req.logIn(user, (err)=>{
                    if(err){
                        req.flash('error', info.message)
                    return next(err);
                    }
                    return res.redirect(_getRedirect(req));
                })


            })(req,res,next)
        },
        signup (req,res){
            res.render('auth/signup');
        },
       async postSignup(req,res){
            const {name, email, password} = req.body;

            //validate req
            if(!name || !email || !password){
                req.flash('error', 'All fields are required');
                req.flash('name', name);
                req.flash('email', email);

                return res.redirect('/signup');
            }
// if email already eixsts


User.exists({email: email}, (err, result)=>{
    if(result){
        req.flash('error', 'Email already registered');
        req.flash('name', name);
        req.flash('email', email);

        return res.redirect('/signup');
    }
})


      // Hash password 
      const hashedPassword = await bcrypt.hash(password, 10).catch(err=>{
          console.log(err);
      })
      // Create a user 
      const user = new User({
          name,
          email,
          password: hashedPassword
      })
user.save().then((user) =>{
//login

return res.redirect('/')
})
.catch(err =>{
    console.log(err);
    req.flash('error', 'Something went wrong!');
        return res.redirect('/signup');
    });

        },
       async logout(req, res){
            // req.session.destroy()

          await  req.session.destroy();
            //  res.send("logged out", 401);

            return res.redirect('/');
        }
    }
}
module.exports= authController;