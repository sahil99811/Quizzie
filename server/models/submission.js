const mongoose=require('mongoose');


const submissionSchema=new mongoose.Schema({
  userId:{
    type:String,
    required:true
  },
  problemId:{
     type:String,
    required:true
  },
  solution:{
     type:String,
     required:true
  },
  fullCode:{
     type:String,
     required:true
  },
  status:{
    type:String,
    enum:['Pending','Accepted','Rejected','TLE']
  },
  tesCasePassed:{
    type:Number
  },
  totalTestCase:{
     type:Number
  },
  language:{
    type:String
  },
  maximumTime:{
     type:Number
  },
  maximumMemory:{
     type:Number
  },
  compilerError:{
    type:String
  },
  testCase: {
    type:mongoose.Types.ObjectId,
    ref:"TestCase"
  },
})

module.exports = mongoose.model('Submission', submissionSchema);
