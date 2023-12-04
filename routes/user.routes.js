const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User')

router.get("/", async (req, res, next) =>
{
    const users = await User.find();
    return res.status(201).json(users);
});

router.post('/register', (req, res, next) => {
    const done = (error, user) => {
        if (error){
            return next(error);
        }
        req.logIn(user, (error) => {
            if(error){
                return next(error);
            }
            return res.status(200).json(user)
        });
    };
    passport.authenticate("register", done)(req);
});

router.post('/login', (req, res, next) => {
    passport.authenticate('login', (error, user) => {
        if (error) return next(error)

        req.logIn(user, (error) => {
            // Si hay un error logeando al usuario, resolvemos el controlador
            if (error) {
                return next(error);
            }
            // Si no hay error, devolvemos al usuario logueado
            return res.status(200).json(user)
        });
    })(req);
});


router.post('/logout', (req, res, next) => {
    if (req.user) {
      // Destruimos el objeto req.user para este usuario
      req.logout((err) => {
        if (err) {
          return next(err);
        }
  
        req.session.destroy(() => {
          // Eliminamos la cookie de sesión al cancelar la sesión
          res.clearCookie('connect.sid');
          return res.status(200).json('¡Hasta pronto!');
        });
      });
    } else {
      return res.status(200).json('No hay sesión activa'); // Si no hay usuario, no habremos cambiado nada
    }
  });
  

module.exports = router;