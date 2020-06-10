const mongoose = require('mongoose');

mongoose.connect(
    process.env.MONGODB_URL,
    { 
        useNewUrlParser: true ,
        useUnifiedTopology: true,
        useCreateIndex : true,
        useFindAndModify : false
    }
)
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

module.exports = mongoose;