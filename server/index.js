import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import dbConnect from './mongodb/config.js';
const app = express();

import router from './routes/scrapeRoute.js'
import userRouter from './routes/userRoute.js'


dotenv.config()
const PORT = process.env.PORT

dbConnect(); // MONGOOSE CONNECTION


app.use(cors());
app.use(express.json());
app.use("/scrape", router);
app.use("/multipleurl", router);
app.use("/pdfscrap", router)
app.use("/user", userRouter)

app.listen(PORT, () => {console.log(`Server is porting ${PORT}`)})


