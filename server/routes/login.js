var express = require('express');
var router = express.Router();
var jwt=require('jsonwebtoken');
var cassandra = require("cassandra-driver");

const client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'library'});
client.connect(function(err,result){
    console.log('cassandra connected')
});

router.post('/test',function(req,res){
    res.json({
      index: "data posted",
      name : req.body
    }) 
})

router.post('/log_in',function(req,res){
   console.log(req.body);
    let param_arr = [];
    param_arr[0]=req.body.email;

   console.log(param_arr);
   var query="select password from users where email = ?";
   client.execute(query,param_arr,{ prepare : true },function(err,result){
    if(err){
      console.log(err) ;
      res.json({error: err});
     }else{
        console.log(result.rows[0].password);
        const db_pass = result.rows[0].password;
        if(db_pass === req.body.password){
          const token=jwt.sign({name : req.body.email},'secret_key');
          res.json({token : token});
        }
     }
     
   })
})


//***********************dont delete important code*************************

// router.get('/protected', ensureToken, function(req, res) {
//   jwt.verify(req.token, 'secret_key', function(err, data) {
//     if (err) {
//       res.redirect('http://localhost:3000/login/log_in')
//       res.sendStatus(403);
//     } else {
//       res.json({
//         description: 'Protected information. Congrats!'
//       });
//     }
//   });
// });

// function ensureToken(req, res, next) {
//   const bearerHeader = req.headers["authorization"];
//   if (typeof bearerHeader !== 'undefined') {
//     const bearer = bearerHeader.split(" ");
//     const bearerToken = bearer[1];
//     req.token = bearerToken;
//     next();
//   } else {
//     res.redirect('http://localhost:3000/login/test')
//     res.sendStatus(403);
//   }
// }
//*******************************Dont delete*****************************************

module.exports = router;