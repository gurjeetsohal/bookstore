var express = require('express');
var router = express.Router();



const cassandra = require('cassandra-driver');

const client = new cassandra.Client({contactPoints: ['127.0.0.1'], keyspace: 'library'});
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

//JSON.parse(req.body.param_arr),{ prepare : true },

router.post('/add_book',function(req,res){
    
        var query = "insert into books(id,name,author,price) values(?,?,?,?)";
        client.execute(query,req.body.param_arr,{ prepare : true },function(err,result){
            if(!err){
                 res.send("done from api");
                 console.log("done");
                 console.log(req.body.param_arr);
            }
        })
    })

router.post('/delete_book',function(req,res){
    console.log(req.body.bookId);
    let param_arr = [];
    param_arr.push(req.body.bookId);

    var query = "delete from books where id = ?" ;
    client.execute(query,param_arr,{prepare : true},function(err,result){
        if(!err){
            console.log("deleted successfully");
        }else{
            console.log(err);
        }
    })
})

router.post('/update_book',function(req,res){
    
    console.log(req.body);
    let param_array = [];
    let len = req.body.param_arr.length-1;
    param_array.push(req.body.param_arr[len]);

    var query = "delete from books where id = ?" ;
    client.execute(query,param_array,{prepare : true},function(err,result){
        if(!err){
            console.log("deleted successfully");
        }else{
            console.log(err);
        }
    })
    
    let param_array2=[];
    param_array2 = req.body.param_arr.slice(0,len)
    var query = "insert into books(id,name,author,price) values(?,?,?,?)";
    client.execute(query,param_array2,{ prepare : true },function(err,result){
        if(!err){
             res.send("done from api");
             console.log("added updated record");
             
        }
    })
})
module.exports = router;