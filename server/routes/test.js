const express=require('express')
const router=express.Router();
const updateTestResult = async (req, res, next) => {
  try {
    console.log("api is called");
    const data = req.body;
    console.log(data);

    // // Handle compilation and runtime errors
    // if (['Compilation Error', 'Runtime Error'].includes(data.status.description)) {
    //   await Submission.findByIdAndUpdate(data.token, {
    //     status: data.status.description,
    //     compilerError: data.status.compilerError
    //   });
    //   return successResponse(res,'Compilation or Runtime Error handled')
    // }

    // // Update the specific test case
    // const testcase = await TestCase.findByIdAndUpdate(data.token, {
    //   status: data.status.description,
    //   time: data.status.time,
    //   memory: data.status.memory,
    //   stdin:data.stdin,
    //   expectedOutput:data.expected_output,
    //   stdout:data.stdout
    // }, { new: true });

    // // Fetch all test cases for the submission
    // const allTestCases = await TestCase.find({ submissionId: testcase.submissionId });

    // // Check for pending test cases
    // const pendingTestCases = allTestCases.filter(tc => tc.status === 'PENDING');
    // if (pendingTestCases.length > 0) {
    //   return successResponse(res,'Pending test cases remaining')
    // }

    // const failedTestCases = allTestCases.filter(tc => tc.status !== 'ACCEPTED' && tc.status !== 'PENDING');



    // if (failedTestCases.length > 0) {
    //   // Sort failed test cases to get the first failed case
    //   const firstFailedTest = failedTestCases.sort((a, b) => a.createdAt - b.createdAt)[0];
    //   await Submission.findByIdAndUpdate(testcase.submissionId, {
    //     status: 'Failed',
    //     testCase: firstFailedTest._id
    //   });
    //   return successResponse(res,'Submission failed on a test case')
    // }
    //     // Handle the max time and memory
    // const maxTime = Math.max(...allTestCases.map(tc => Number(tc.time || 0)));
    // const maxMemory = Math.max(...allTestCases.map(tc => Number(tc.memory || 0)));
    // // Check for TLE (Time Limit Exceeded)
    // const tleTestCases = allTestCases.filter(tc => tc.status === 'TLE');
    // if (tleTestCases.length > 0) {
    //   // Sort TLE test cases to get the first TLE case
    //   const firstTleTest = tleTestCases.sort((a, b) => a.createdAt - b.createdAt)[0];
    //   await Submission.findByIdAndUpdate(testcase.submissionId, {
    //     status: 'TLE',
    //     testCase: firstTleTest._id,
    //     time: maxTime,
    //     memory: maxMemory
    //   });
    //   return successResponse(res,'Submission exceeded time limit');
    // }

    // // If no failures or TLE, mark as accepted
    // await Submission.findByIdAndUpdate(testcase.submissionId, {
    //   status: 'Accepted',
    //   time: maxTime,
    //   memory: maxMemory
    // });
    return res.status(200).json({success:true,message:"test updated succeddfully"});
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error processing test case', error: error.message });
  }
};

router.put("/updateTestCase",updateTestResult);
module.exports=router;
