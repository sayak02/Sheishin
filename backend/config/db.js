
const mongoose = require("mongoose");

const connectDB = async () => {
    mongoose.connect('mongodb://localhost/Seishin',
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useFindAndModify: false 
    }
);

mongoose.connection.once('open',()=>{
    //Init stream
    console.log('mongo connection made');
}).on('error',(err)=>{
    console.log('Connection error: ',err);
})
}

module.exports = connectDB;