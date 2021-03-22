const express = require('express');
const cors = require('cors');
var jwt = require('jsonwebtoken');
const {Sequelize} = require('Sequelize');

// Constants
const PORT = process.env.PORT || 5000;
const USER = "ykyujzyxlhjojz";
const PASSWORD = "ad680e6dd565e0186b6c618f0fee006d38b4e649768e8f1fbc3a573f379d13b1";
const HOST = "ec2-52-71-161-140.compute-1.amazonaws.com";
const DATABASE = "d7gg4a8p93jkhk"



// Express
var app = express();
app.use(express.json());
app.use(cors());

// Database
const sequelize = new Sequelize(DATABASE, USER, PASSWORD, {
    host: HOST,
    dialect: 'postgres',
    port: 5432,

    dialectOptions: {
        ssl: {
            require: true, 
            rejectUnauthorized: false 
        }
    },

});


sequelize.authenticate().then((data) => {
    console.log('Database connected ');
}).catch((error) => {
    console.log('Unable to connect to database: ', error);
});

app.post('/login', (req, res) => {
    sequelize.query(`SELECT name, email FROM Person WHERE id = '${req.body.id}' AND password='${req.body.password}'`)
    .then(data => {
        if(data[0].length != 0){
            sequelize.query(`SELECT * FROM Token WHERE id_person = '${req.body.id}'`)
            .then(data2 => {
                res.json({bool: true, data: data[0], token: data2[0]})
            })
            .catch(e => {
                res.json({bool: false, error: "There's an error with this user"})
            })
        } else {
            res.json({bool: false, error: "User not found"})
        }
    }).catch(e => {
        res.json({bool: false, error: e.message});
    })

})

app.post('/register', (req, res) => {
    var token = jwt.sign({ user: req.body.id }, req.body.password);
    sequelize.query(`INSERT INTO Person VALUES('${req.body.id}', '${req.body.name}', '${req.body.email}', '${req.body.password}')`)
    .then(_ => {
        sequelize.query(`INSERT INTO Token VALUES('${token}', '${req.body.id}')`)
        .then(_ => {
            res.json({bool: true, data:"User registered"});
        })
        .catch(e => {
            sequelize.query(`DELETE FROM Person WHERE id = '${req.body.id}'`)
            .then(_ => {
                res.json({bool: false, error:`Can not register user - ${e.message}`});
            })
            .catch(e => {
                res.json({bool: false, error:`Unexpected error - ${e.message}`});
            })
        })
    })
    .catch(e => {
        res.json({bool: false, error: `Can not register user - ${e.message}`});
    })
})

app.listen(PORT, () => {
    console.log('Server on port: ' + PORT);
})

