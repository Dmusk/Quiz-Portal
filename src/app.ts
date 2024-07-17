import express from 'express';
import mongoose from "mongoose";

import userRoutes from "./routes/user";
import authRoutes from "./routes/auth";

const app = express();
const PORT = 1240;
const connectionString = "mongodb+srv://Dadu:DaduMDB%402003@cluster0.mzwtfbm.mongodb.net/quiz_portal";

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
  res.send("This is My hosted site");
});

// user
// Redirect to -> /route/auth 
app.use('/auth', authRoutes);

//Redirect to -> /route/user
app.use('/user', userRoutes);

mongoose.connect(connectionString, {
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch((err: any) => {
  console.error('Failed to connect to MongoDB', err);
});
