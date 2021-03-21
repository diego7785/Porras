const express = require('express');
const cors = require('cors');
const {Sequelize} = require('Sequelize');

// Constants
const PORT = process.env.PORT || 5000;
const USER = "jlhoacphljjpui";
const PASSWORD = "fcddbaa49baaec267311775239e1dd5045b1298f5f642efad886d6ce2a925c66";
const HOST = "ec2-3-91-127-228.compute-1.amazonaws.com";
const DATABASE = "d5mb7o1cos7u2q"



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

