import express from"express";
import dotenv from"dotenv";
import moment from "moment";
import cors from"cors";
import connectDB from"./config/db.js";
import transactionRoutes from"./routes/transactionRoutes.js";

dotenv.config();
connectDB();

const app = express();
const { PORT, CORS_ORIGIN, CORS_METHODS } = process.env;
const corsOptions = { origin: CORS_ORIGIN, methods: CORS_METHODS };

app.use(express.json());

app.listen(PORT, () => {
    console.log(
        `Server is up and running on port ${PORT} on ${moment().format(
            "DD-MMM-YYYY-T-HH:mm:ss.S"
        )}`
    );
});

// Cross Origin setup
app.use(cors(corsOptions));

// Route
app.use("/api", transactionRoutes);


