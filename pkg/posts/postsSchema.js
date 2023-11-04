const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    plot: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, // id od kolekcija korisnici
        ref: 'User', // poentirame deka ke ima id od users
    }
});