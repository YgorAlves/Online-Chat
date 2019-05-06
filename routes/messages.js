var express = require('express');
var router = express.Router();

var Message = require("../models/message");
var User = require("../models/user");

router.post('/', function(req, res, next){
    var message = new Message({
        content : req.body.content,
        user : req.body.userId
    });

    message.save(function(err,result){
        if (err){
            return res.status(500).json({
                myErrorTitle: 'Um erro aconteceu ao salvar',
                myError : err
            })
        }
        res.status(201).json({
            myMsgSucess: 'Mensagem salva',
            objMessageSave : result
        });
    });
});

router.get('/:id', function(req, res, next){
    User.findById(req.params.id, function(err, resultMsgRecuperada){
        if (err){
            return res.status(500).json({
                myErrorTitle : "Um erro aconteceu ao recuperar aas mensagens",
                myError : err
            });
        }
        res.status(200).json({
            myMsgSucess : "Sucesso ao recuperar mensagens",
            autor : resultMsgRecuperada
        })
    })
});

router.get('/', function(req, res, next){
    Message.find().exec(function(err, result){
        if (err){
            return res.status(500).json({
                myErrorTitle : "Um erro aconteceu ao recuperar aas mensagens",
                myError : err
            });
        }
        res.status(200).json({
            myMsgSucess : "Sucesso ao recuperar mensagens",
            objSMessageSRecuperadoS : result
        })
    })
});

router.patch('/:id', function(req, res, next){
    Message.findById(req.params.id, function(err, resultMsgRecuperada){
        if (err){
            return res.status(500).json({
                myErroTitle : "Erro ao atualizar mensagem pelo ID",
                myError : err
            });
        }
        if (!resultMsgRecuperada){
            return res.status(500).json({
                myErroTitle : "Erro ao atualizar mensagem pelo ID. Mensagem não encontrada.",
                myError : {info : "Não encontrou mensagem com ID "+ req.params.id}
            });
        }
        resultMsgRecuperada.content = req.body.content;
        resultMsgRecuperada.save(function(err, resultMsgAlterada){
            if (err){
                return res.status(500).json({
                    myErroTitle : "Erro ao atualizar mensagem pelo ID",
                    myError : err
                });
            }
            res.status(200).json({
                myMsgSucess : "Mensagem atualizada com sucesso.",
                objMensagemAtualizado : resultMsgAlterada
            })
        })
    })
})

router.delete('/:id', function(req, res, next){
    Message.findById(req.params.id, function(err, resultMsgRecuperada){
        if (err){
            return res.status(500).json({
                myErroTitle : "Erro ao deletar mensagem pelo ID",
                myError : err
            });
        }
        if (!resultMsgRecuperada){
            return res.status(500).json({
                myErroTitle : "Erro ao atualizar mensagem pelo ID. Mensagem não encontrada.",
                myError : {info : "Não encontrou mensagem com ID "+ req.params.id}
            });
        }
        resultMsgRecuperada.remove(function(err, resultMsgDeletada){
            if (err){
                return res.status(500).json({
                    myErroTitle : "Erro ao deletar mensagem pelo ID",
                    myError : err
                });
            }
            res.status(200).json({
                myMsgSucess : "Mensagem removida com sucesso.",
                objMensagemAtualizado : resultMsgDeletada
            })
        })
    })
})

module.exports = router;
