var express = require('express');
var router = express.Router();

var User = require("../models/user");

router.post('/', function(req, res, next){
    var message = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : req.body.password,
        titulo : req.body.titulo
    });

    message.save(function(err, result){
        if (err){
            return res.status(500).json({
                myErrorTitle: 'Um erro aconteceu ao cadastrar usuário.',
                myError : err
            })
        }
        result.password = null;
        res.status(201).json({
            myMsgSucess: 'Usuário cadastrado.',
            objUserSave : result
        });
    });
});

router.get('/:email/:senha', function(req, res, next){
    User.findOne({'email' : req.params.email, 'password' : req.params.senha}, function (err, result){
        if (err){
            return res.status(500).json({
                myErrorTitle: 'Um erro aconteceu ao fazer login de ' + req.params.email,
                myError : err
            })
        }
        if (!result){
            return res.status(500).json({
                myErrorTitle: 'Email: '+req.params.email+' ou senha: '+req.params.senha+'incorretos.',
                myError : {info : "Email ou senha incorretos"}
            })
        }
        res.status(201).json({
            myMsgSucess: 'Login de ' + req.params.email + ' efetuado com sucesso. Senha : ' + req.params.senha,
            objUserRecuperado : result
        });
    })
});

module.exports = router;
