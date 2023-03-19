const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://mtvdoan:I10v3413x@cluster0.pbqvoi9.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

    .then(() => console.log("Connected to database"))
    .catch((err) => console.log("Something went wrong", err))