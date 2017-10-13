var express = require('express');
var router = express.Router();


const cassandra = require('cassandra-driver');

const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'library' });
client.connect(function(err,result){
    console.log('cassandra connected')
});


// router.get('/books',function(req,res){
//     res.json([
//         { name : "xyz" ,
//           author :" xyz",
//           id : 1 ,
//           price :100
//        },
//        { name : "xyz" ,
//           author :" xyz",
//           id : 1 ,
//           price :100
//        },
//        { name : "xyz" ,
//           author :" xyz",
//           id : 1 ,
//           price :100
//        },
//        { name : "xyz" ,
//           author :" xyz",
//           id : 1 ,
//           price :100
//        }
//     ]);
// })

router.get('/books',function(req,res){

    var query = "select * from books";
    client.execute(query,function(err,result){
        if(!err){
             res.json(result.rows);
        }
    })
})

router.post('/add_book',function(req,res){
    
        var query = "insert into books(id,name,author,price) values(?,?,?,?)";
        client.execute(query,req.body,function(err,result){
            if(!err){
                 res.send("done");
                 console.log("done");
            }
        })
    })

module.exports = router;