const express=require('express')
const router=express.Router();
const TestCase=require('../models/testcase');
const Submission=require('../models/submission');
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

const updateTestResult = async (req, res, next) => {
  try {
    console.log("API is called");
    const data = req.body;
    console.log(data);

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

    return successResponse(res, 'Submission accepted');
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error processing test case', error: error.message });
  }
};


router.put("/updateTestCase",updateTestResult);
module.exports=router;
