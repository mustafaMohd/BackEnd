import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import db from './Congif/index';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import path from 'path';



let app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
// app.use(compress());

// secure apps by setting various HTTP headers
app.use(helmet());

//for Angular
app.use(express.static(path.join(__dirname, "../frontEnd/dist/frontEnd")));

//for files
app.use(express.static(path.join(__dirname, "./Files")));

//#region MongoDB connection 

mongoose.connect(db.mongoDbUrl);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('mongoDb connection established successfully');
});
// If the connection throws an error
mongoose.connection.on('error', function(err) {
    console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose default connection disconnected');
});
// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});


//#endregion


// API location
// app.use('/api', api);

// Send all other requests to the Angular app 
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../frontEnd/dist/frontEnd/index.html"));
});

//Set Port
const port = process.env.PORT || '3000';



app.listen(port, () => {
    console.log('Server running on Port 3000');
});