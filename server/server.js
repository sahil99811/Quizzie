const express=require('express');
const app=express();
const {dbConnect}=require('./config/databaseConnect')
const authRoutes=require('./routes/Auth');
const dotenv=require('dotenv');

dotenv.config();
app.use(express.json());
app.use('/api/v1/auth',authRoutes);
dbConnect()
    .then(() => {
        console.log("Database connected successfully");
        // Start the server
        const server = app.listen(process.env.PORT, () => {
            console.log("Server is started");
        });

        // Handle server startup errors
        server.on('error', (error) => {
            console.error("Server failed to start:", error);
            process.exit(1);
        });
    })
    .catch((error) => {
        console.error("DB Connection Failed:", error);
        process.exit(1);
    });

