const mongoose=require('mongoose');
exports.dbConnect= () => {
   return mongoose.connect(process.env.MONGODB_URL);
<<<<<<< HEAD
};
=======
};
>>>>>>> 068517f076f7041b2f48132a8fc4047abcff4004
