const mongoose = require('mongoose')
const mongoPath = 'mongodb+srv://administrator:test1234@info-2413.md3gl.mongodb.net/TestDB?retryWrites=true&w=majority'

module.exports = async() => {
    await mongoose.connect(mongoPath,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    return mongoose;
}