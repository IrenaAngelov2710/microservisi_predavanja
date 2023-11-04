//* npm install mongoose
const mongoose = require('mongoose');
//* npm install dotenv
const dotenv = require('dotenv');
//* povikuvanje na fajlot config.env za da go povrzeme so kodot
dotenv.config({path: `${__dirname}/../config/config.env`});

const DB = process.env.DATABASE.replace(
    '<PASSWORD>', 
    process.env.DATABASE_PASSWORD
);

exports.init = async() => {
    try {
        await mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Successfully connected to the database');
    } catch (err) {
        console.log(err);
    }
};
