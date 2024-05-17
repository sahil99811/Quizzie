const mongoose=require('mongoose');

const questionSchema=new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    optionType: {
        type: String,
        enum: ['text', 'imageurl', 'text&imageurl'],
        required: true
      },
    text: {
        type: String,
        required: function() {
          return this.optionType === 'text' || this.optionType === 'text&imageurl';
        }
    },
    imageurl: {
        type: String,
        required: function() {
          return this.optionType === 'imageurl' || this.optionType === 'text&imageurl';
        }
    },
    correctOption:{
        type:Number,
        required: true
    } 
},{timestamps:true});
module.exports=mongoose.model('question',questionSchema)