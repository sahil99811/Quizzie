
const Question=require('../models/Question');
const Quizz = require('../models/Quizz');
const errorResponse = (res, statusCode, message) => {
    res.status(statusCode).json({
      success: false,
      message,
    });
  };

exports.createQuizz = async (req, res) => {
    try {
        const { id } = req.user;
        const { quizzName, quizzType, questions } = req.body;

        // Check if required fields are missing
        if (!quizzName || !quizzType || !questions) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const _questions = JSON.parse(questions);
        const allQuestions = [];

        // Create each question and push to allQuestions array
        for (const question of _questions) {
            const questionData = await Question.create({
                description: question.description,
                optionType: question.optionType,
                text: question.text,
                imageUrl: question.imageUrl,
                correctOption: question.correctOption,
                timer: question.timer
            });
            allQuestions.push(questionData);
        }

        // Create the quizz with the created questions
       const quizzData=await Quizz.create({
            quizzName,
            quizzType,
            questions: allQuestions,
            createdBy: id
        });

        // Send success response
        res.status(201).json({ message: 'Quizz created successfully',quizzId:quizzData._id });
    } catch (err) {
        // Handle any errors
        console.error(err);
        errorResponse(res,500,'Internal server error')
    }
};

// exports.getTrendingQuizz=async (req,res)=>{
//     try{
//       const {id}=req.user;
      
//     }catch(err){
//         console.log(err);
//         errorResponse(res,500,'Internal server error')
//     }
// }