const express = require('express');


const jwt = require('jsonwebtoken');


const app = express();

const scretKey = "scretKey";


app.get("/", (req, res) => {


    res.json({



        message: 'A Simple Api'

    });


});



app.post("/login", (req, res)=>{

    const user = {


        id: 1,
        username: "Sikander",
        email: "sikanderkhalil056@gmail.com"

    }

    jwt.sign({user}, scretKey, {expiresIn: '300s'}, (error, token) => {


        res.json({

            token
        });

        

    });



});

app.post("/profile", verifyToken, (req, resp) => {


    jwt.verify(req.token, scretKey, (error, authData)=> {


        if(error){


            resp.send({result: 'Invalid Token'});

            
        }else{


            resp.json({


                message: "Profile Accessed",
                authData
            });




        }

    });

});

function verifyToken(req, resp, next){


    const bearerHeader = req.headers['authorization'];

    if(typeof bearerHeader != 'undefined'){

        const bearer = bearerHeader.split(" ");
        const token = bearer[1];
        console.log(token);

        req.token = token ;

        next();


    }else{


        resp.send({

            result: 'Token is Not Valid'
        });
    }







}


app.listen(5000);
