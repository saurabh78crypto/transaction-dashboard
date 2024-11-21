import { getStatistics, getBarChartData, getPieChartData } from "../controllers/transactionController.js";

export const getStatisticsData = async (req) => {
    const response = await new Promise((resolve, reject) => {
        getStatistics(req, { status: (statusCode) => ({ json: (data) => resolve(data) }) });
    });
    return response;
};

export const getBarChartDataData = async (req) => {
    const response = await new Promise((resolve, reject) => {
        getBarChartData(req, { status: (statusCode) => ({ json: (data) => resolve(data) }) });
    });
    return response;
};

export const getPieChartDataData = async (req) => {
    const response = await new Promise((resolve, reject) => {
        getPieChartData(req, { status: (statusCode) => ({ json: (data) => resolve(data) }) });
    });
    return response;
};
