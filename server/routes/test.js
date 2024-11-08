const express=require('express')
const router=express.Router();

const submissionQuery = require('../models/submissionQuery');
const STATUS_MAP = {
  1: "In Queue",
  2: "Processing",
  3: "Accepted",
  4: "Wrong Answer",
  5: "Time Limit Exceeded",
  6: "Compilation Error",
  ...Object.fromEntries([...Array(6)].map((_, i) => [i + 7, "Runtime Error"])),
  13: "Internal Error",
};
const successResponse = (res, message, data = null) => {
  const response = {
    success: true,
    message,
  };
  
  if (data !== null) {
    response.data = data;  
  }

  res.status(201).json(response);
};
const formatResponseData = async (data) => {
  const decodeOutput = (output) => {
    return output ? Buffer.from(output, 'base64').toString('utf-8') : null;
  };

  const responseData = {
    time: data?.time || null,                       
    memory: data?.memory || null,                  
    status: data ? STATUS_MAP[data.status.id] : null, 
    compileOutput: data ? decodeOutput(data.compile_output) : null,
    stdout: data ? decodeOutput(data.stdout) : null, 
    message: data?.message || null,                                            
  };

  return responseData;
};
const updateTestResult = async (req, res, next) => {
  try {


    // const testcase = await TestCase.findOneAndUpdate(
    //   { tokenId: data.token },
    //   {
    //     status: data.status.description,
    //     time: data.status.time,
    //     memory: data.status.memory,
    //     stdin: data.stdin,
    //     expectedOutput: data.expected_output,
    //     stdout: data.stdout,
    //   },
    //   { new: true } 
    // );

 
    // if ([6, 7, 8, 9, 10, 11, 12, 13, 14].includes(data.status.id)) {
    //   await Submission.findByIdAndUpdate(data.token, {
    //     status: data.status.description,
    //     compilerError: atob(data.compile_output),
    //   });
    //   return successResponse(res, 'Compilation or Runtime Error handled');
    // }

    // if (["4", "5"].includes(data.status.id)) {
    //   await Submission.findByIdAndUpdate(data.token, {
    //     status: data.status.description,
    //     test: data.test 
    //   });
    // }

 
    // const allTestCases = await TestCase.find({ submissionId: testcase.submissionId });


    // const pendingTestCases = allTestCases.filter(tc => tc.status === 'Pending');
    // if (pendingTestCases.length > 0) {
    //   return successResponse(res, 'Pending test cases remaining');
    // }


    // const failedTestCases = allTestCases.filter(tc => tc.status !== 'Wrong Answer' && tc.status !== 'Pending');
    // if (failedTestCases.length > 0) {
    //   const firstFailedTest = failedTestCases.sort((a, b) => a.createdAt - b.createdAt)[0];
    //   await Submission.findByIdAndUpdate(testcase.submissionId, {
    //     status: 'Failed',
    //     testCase: firstFailedTest._id,
    //   });
    //   return successResponse(res, 'Submission failed on a test case');
    // }


    // const maxTime = Math.max(...allTestCases.map(tc => Number(tc.time || 0)));
    // const maxMemory = Math.max(...allTestCases.map(tc => Number(tc.memory || 0)));


    // const tleTestCases = allTestCases.filter(tc => tc.status === 'Time Limit Exceeded');
    // if (tleTestCases.length > 0) {
    //   const firstTleTest = tleTestCases.sort((a, b) => a.createdAt - b.createdAt)[0];
    //   await Submission.findByIdAndUpdate(testcase.submissionId, {
    //     status: 'TLE',
    //     testCase: firstTleTest._id,
    //     time: maxTime,
    //     memory: maxMemory,
    //   });
    //   return successResponse(res, 'Submission exceeded time limit');
    // }


    // await Submission.findByIdAndUpdate(testcase.submissionId, {
    //   status: 'Accepted',
    //   time: maxTime,
    //   memory: maxMemory,
    // });
    console.log("callback called");
    const data = req.body;
    console.log(req.headers);
    const {orderId}=req.query;
    const result=await formatResponseData(data);
    const submission = await submissionQuery.findOne({ orderId });
    const tokenIndex = submission.output.token.indexOf(data.token);

   const newSubmission = await submissionQuery.findOneAndUpdate(
   { orderId },
   { 
    $set: { [`output.result.${tokenIndex}`]: result },
    $inc: { 'input.totalTestCaseEvaluated': 1 } 
   },
   { new: true }
  );
  if(newSubmission.input.totalTestCase===newSubmission.input.totalTestCaseEvaluated){
    newSubmission.status="Completed";
    await newSubmission.save();
  }
    return successResponse(res, 'Submission accepted');
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error processing test case', error: error.message });
  }
};


router.put("/updateTestCase",updateTestResult);
module.exports=router;
