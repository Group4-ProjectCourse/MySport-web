const path = require('path');
const express = require('express');
const csurf = require('csurf');
const helmet = require('helmet');
const flash = require('connect-flash');
const session = require('express-session');
const compression = require('compression');
const exphbs = require('express-handlebars');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const MongoStore = require('connect-mongodb-session')(session);

const homeRoute = require('./routes/home');
const authRoute = require('./routes/auth');
const sportsRoute = require('./routes/sports');
const postsRoute = require('./routes/posts');
const msgRoute = require('./routes/messaging');
const errorMiddleware = require('./middleware/error');
const config = require('./keys/config');

const app = express();
const store = MongoStore({
    collection: 'sessions',
    uri: config.MONGODB_URL
});
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
    helpers: require('./utils/hbs-helpers')
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

// app.use(async (req, res, next) => {
//     try {
//         const user = await User.findById('60178252be6be323919216bd');
//         req.user = user;
//         next();
//     }
//     catch (e) {
//         console.log(e);
//     }
// });

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store
}));
////app.use(csurf());
//app.use(flash());
//app.use(helmet());
app.use(compression());
app.use(express.json());

app.use('/auth', authRoute);
app.use('/sports', sportsRoute);
app.use('/posts', postsRoute);
app.use('/messaging', msgRoute);
app.use('/', homeRoute);
app.use(errorMiddleware);

const PORT = process.env.PORT || 3002;
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

async function start(){
    try {    
        await mongoose.connect(config.MONGODB_URL, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });


        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}..`);
        });
        //testPost(PORT);
        // require('bcryptjs').compare('123123', '$2a$12$pSjEfFjTD9saDZ1Bw36jxugKcwq93dnvJSopfRbtmWcFDhZvkJnVu').then(v => {
        //     console.log(v);
        // });
    }
    catch (e) {
        console.log(e);
    }
}

function testPost(port){
//     const axios = require('axios')

// axios
//   .get('http://localhost:3000', {
//     todo: 'Buy the milk'
//   })
//   .then(res => {
//     console.log(`statusCode: ${res.statusCode}`)
//     console.log(res)
//   })
//   .catch(error => {
//     console.error(error)
//   })
// var request = require('request');
//     const obj= {'msg': [
//         {
//           "username": "testuser1",
//           "firstName": "test",
//           "lastName": "user1",
//           "password": "password1"
//         },
//         {
//           "username": "testuser2",
//           "firstName": "test",
//           "lastName": "user2",
//           "password": "password2"
//         }
//       ]};
      
//       request.post({
//           url: `http://localhost:${port}/sports/add`,
//           body: obj,
//           json: true
//         }, function(error, response, body){
//         console.log(error);
//       });
    var request = require('request');
    const obj = {
        "title": "Football",
        "start_date": new Date(2021, 11, 25, 17, 30),
        "end_date": new Date(2021, 11, 25, 19, 30),
        "location": {
            type: 'Point',
            coordinates: [-71.1513232, 42.40513]
        }
    };

    const url1 = `http://localhost:${port}/sports/add`;
    const url2 = `http://localhost:${port}/auth/register`;
    const url3 = `http://localhost:${port}/sports/get-day`;

    const user = {
        "firstname": "Deniel",
        "lastname": "Alekseev",
        "email": "daniel.neo.eu@icloud.com",
        "password": "123",
        "personal_number": "19980516-1234"
    };

    const day = {
        "date": new Date(2021, 02, 26)
    };
      
    request.post({
        url: url3,
        body: day,
        json: true
    }, function(error, res, body){
        // if (!error) {        
        //     console.log(response.json(JSON.parse(body)));
        // }
        console.log(res.statusCode);
        console.log(body);
    });
 
}
start();

// let flag = false;

// let p = new Promise((resolve, reject) => {
//     if(flag){
//         resolve('sucess');
//     }
//     else {
//         // reject({
//         //     mes: 'error',
//         //     isGay: flag
//         // });
//     }   
// });

// p.then((message) => {
//     console.log('OnResolved: ' + message);
// }, (message) => {
//     console.log('OnReject: ' + message.mes + " " + message.isGay);
// }).then((message) => {
//     console.log('2. OnResolved: ' + message);
// }, (message) => {
//     console.log('2. OnReject: ' + message.mes + " " + message.isGay);
// });

// console.log('dadd121');