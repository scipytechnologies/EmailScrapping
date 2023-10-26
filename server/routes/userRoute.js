import express from "express";
const userRouter = express.Router();
import { signup, signin, verifyToken, getUser, getAllUsers } from "../controllers/user.js"




// POST request for creating a new user.
userRouter.post("/signup", signup);

// GET request for user login.
userRouter.post("/signin", signin);
userRouter.post('/auth', verifyToken);
userRouter.get(`/getuser/:id`, getUser);
userRouter.get('/getallusers', getAllUsers)




export default  userRouter;