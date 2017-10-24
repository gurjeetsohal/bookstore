var express = require('express');
var router = express.Router();
var jwt=require('jsonwebtoken');

router.post('/test',function(req,res){
    res.json({
      index: "data posted",
      name : req.body
    }) 
})

router.post('/log_in',function(req,res){
   const token=jwt.sign({name : "gurjeet"},'secret_key');
   res.json({token : token});
})

router.get('/protected', ensureToken, function(req, res) {
  jwt.verify(req.token, 'secret_key', function(err, data) {
    if (err) {
      res.redirect('http://localhost:3000/login/test')
      res.sendStatus(403);
    } else {
      res.json({
        description: 'Protected information. Congrats!'
      });
    }
  });
});

function ensureToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.redirect('http://localhost:3000/login/test')
    res.sendStatus(403);
  }
}

module.exports = router;