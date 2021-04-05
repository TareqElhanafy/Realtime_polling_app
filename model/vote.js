const mongooose = require('mongoose')
const voteSchema = new mongooose.Schema({
    os:{
        type:String,
        required:true,
    },
    points:{
        type:Number,
        required:true
    }
})

const Vote = mongooose.model('Vote', voteSchema)
module.exports = Vote