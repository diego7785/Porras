const express = require('express');
const cors = require('cors');
const {Sequelize} = require('Sequelize');

// Constants
const PORT = process.env.PORT || 5000;
const USER = "";
const PASSWORD = "";
const HOST = "";
const DATABASE = ""



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
    sequelize.query(`SELECT * FROM Person WHERE id = '${req.body.id}' AND password='${req.body.password}'`)
    .then(data => {
        if(data[0].length != 0){
            res.json({bool: true, data: data[0]})
        } else {
            res.json({bool: false, error: "User not found"})
        }
    }).catch(e => {
        res.json({bool: false, error: e.message});
    })

})

app.post('/register', (req, res) => {
    sequelize.query(`INSERT INTO Person VALUES('${req.body.id}', '${req.body.name}', '${req.body.email}', '${req.body.password}')`)
    .then(data => {
        res.json({bool: true, data:"User registered"});
    })
    .catch(e => {
        res.json({bool: false, error: "Can not register user"});
    })
})

app.listen(PORT, () => {
    console.log('Server on port: ' + PORT);
})

