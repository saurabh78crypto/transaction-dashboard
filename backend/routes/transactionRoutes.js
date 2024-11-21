import express from "express";
import { initializeDatabase, getTransactions, getStatistics, getBarChartData, getPieChartData, 
    getCombinedData } from "../controllers/transactionController.js";

const router = express.Router();

// Define routes in an object
const routes = [
    { path: '/initialize', handler: initializeDatabase },
    { path: '/transactions', handler: getTransactions },
    { path: '/statistics', handler: getStatistics },
    { path: '/bar-chart', handler: getBarChartData },
    { path: '/pie-chart', handler: getPieChartData },
    { path: '/combined', handler: getCombinedData },
]

// Register all routes using loop
routes.forEach(({ path, handler }) => router.get(path, handler));


export default router;
