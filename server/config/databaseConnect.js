const mongoose=require('mongoose');
// exports.dbConnect= () => {
//    return mongoose.connect(process.env.MONGODB_URL);
// };

exports.dbConnect= () => {
   return mongoose.connect(process.env.DATABASE_URL);
};

