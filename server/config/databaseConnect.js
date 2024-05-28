const mongoose=require('mongoose');
exports.dbConnect= () => {
   return mongoose.connect("mongodb+srv://amanpatel8815370:Sahil99811%40@cluster0.n51k6au.mongodb.net/Quizzie");
};