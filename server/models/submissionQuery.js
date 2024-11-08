const mongoose = require('mongoose');
const { Schema } = mongoose;

const resultSchema = new Schema({
  status: { 
    type: String, 
    required: true 
  },
  memory: { 
    type: Number, 
    default:0
  },
  stdout: { 
    type: String, 
    default:null
  },
  compileOutput: { 
    type: String, 
    default: null 
  },
  message: { 
    type: String, 
    default: null 
  },
  time: { 
    type: Number, 
    default:0
  }
});



const submissionSchema = new Schema({
  orderId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  input: {
    sourceCode: { 
      type: String, 
      required: true 
    },
    maxTime: { 
      type: Number, 
    
    },
    maxMemory: { 
      type: Number, 
    },
    testCases: [{type:mongoose.Schema.Types.Mixed}],
    language:{
      type:String,
      required:true
    },
    totalTestCase:{
      type:Number,
      default:0
    },
    totalTestCaseEvaluated:{
      type:Number,
      default:0
    }
  },
  output: {
    token: { 
      type: [String], 
      required: true 
    },
    result: [resultSchema] 
  },
  status: {
    type: String,
    enum: ["Pending", "Submitted", "Completed"],
    default: "Pending"
  },
  responseTopic:{
    type:"String",
    required:true
  }
}, { timestamps: true });


module.exports = mongoose.model('SubmissionQuery', submissionSchema);
