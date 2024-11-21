import Transaction from "../models/Transaction.js";
import fetchThirdPartyData from "../utils/fetchThirdParty.js";
import getMonthNumber from "../utils/dateUtils.js";
import { getStatisticsData, getBarChartDataData, getPieChartDataData } from "../utils/transactionHelpers.js";

// Initialize database with seed data
const initializeDatabase = async (req, res) => {
    try {
        const data = await fetchThirdPartyData();

        // Format `month` field during data insertion
        const formattedData = data.map((item) => {
            const date = new Date(item.dateOfSale);
            return {
                id: item.id,  
                productTitle: item.title, 
                productDescription: item.description,  
                price: item.price,
                dateOfSale: new Date(item.dateOfSale),  
                category: item.category,
                image: item.image,
                sold: item.sold,
                month: date.getMonth() + 1, 
            };
        });

         // Insert the data into the database
         const result = await Transaction.insertMany(formattedData, { ordered: false }); // `ordered: false` will allow continuing on errors

         res.status(200).json({ message: "Database initialized successfully!" , result});
    } catch (error) {
        res.status(500).json({ error: "Failed to initialize database" });
    }
};

// GET Transactions
const getTransactions = async (req, res) => {
    const { month, page = 1, perPage = 10, search = "" } = req.query;

    try {
        const monthNumber = getMonthNumber(month);
        const query = { month: monthNumber}; 

        if (search.trim()) {
            const searchConditions = [];
            const trimmedSearch = search.trim();

            // Handle text-based search for productTitle and productDescription
            if (trimmedSearch.length > 0) {
                try {
                    const regex = new RegExp(trimmedSearch, "i"); // Case-insensitive
                    console.log("Debug: Regex object created:", regex);
                    searchConditions.push({ productTitle: { $regex: regex } });
                    searchConditions.push({ productDescription: { $regex: regex } });
                } catch (regexError) {
                    console.error("Error creating regex:", regexError);
                }
            }

            // Handle numeric search for price
            const priceValue = parseFloat(trimmedSearch);
            if (!isNaN(priceValue)) {
                searchConditions.push({
                    price: { $gte: priceValue - 0.01, $lte: priceValue + 0.01 },
                });
            }

            if (searchConditions.length > 0) {
                query.$or = searchConditions;
            }
        }


        const transactions = await Transaction.find(query)
            .skip((page - 1) * perPage)
            .limit(10);

        const total = await Transaction.countDocuments(query);

        res.status(200).json({ total, page, perPage, transactions });
    } catch (error) {
        console.error("Error fetching transactions:", error);
        res.status(500).json({ error: "Failed to fetch transactions" });
    }
};


// GET statistics
const getStatistics = async (req, res) => {
    const { month } = req.query;
    try {
        // Convert month to number
        const monthNumber = getMonthNumber(month);

        if(monthNumber < 1 || monthNumber > 12)     {
            return res.status(400).json({ error: 'Invalid month name' });
        }

        const totalSoldItems = await Transaction.countDocuments({ sold: true, month: monthNumber });
        const totalNotSoldItems = await Transaction.countDocuments({ sold: false, month: monthNumber });
        const totalSalesAmount = await Transaction.aggregate([
            { $match: { sold: true, month: monthNumber } },
            { $group: { _id: null, totalAmount: { $sum: "$price" } } },
        ]);
        
        const result = {
            totalSalesAmount: totalSalesAmount[0]?.totalAmount || 0,
            totalSoldItems,
            totalNotSoldItems,
        };
         res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch statistics" });
    }
};

// Bar chart data
const getBarChartData = async (req, res) => {
    const { month } = req.query;
    try {
        // Convert month to number
        const monthNumber = getMonthNumber(month);

        if(monthNumber < 1 || monthNumber > 12) {
            return res.status(400).json({ error: 'Invalid month name' });
        }

        const priceRanges = [
            { range: "0-100", min: 0, max: 100 },
            { range: "101-200", min: 101, max: 200 },
            { range: "201-300", min: 201, max: 300 },
            { range: "301-400", min: 301, max: 400 },
            { range: "401-above", min: 401, max: Infinity },
        ];

        const barChartData = await Promise.all(
            priceRanges.map(async (range) => {
                const count = await Transaction.countDocuments({
                    price: { $gte: range.min, $lt: range.max },
                    month: monthNumber,
                });
                return { range: range.range, count };
            })
        );

        res.status(200).json(barChartData); 
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch bar chart data" });
    }
};

// Pie chart data
const getPieChartData = async (req, res) => {
    const { month } = req.query;
    try {
        // Convert month to number
        const monthNumber = getMonthNumber(month);

        if(monthNumber < 1 || monthNumber > 12) {
            return res.status(400).json({ error: 'Invalid month name' });
        }

        const categories = await Transaction.aggregate([
            { $match: { month: monthNumber, } },
            { $group: { _id: "$category", count: { $sum: 1 } } },
        ]);

        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch pie chart data" });
    }
};

// Combined API
const getCombinedData = async (req, res) => {
    try {
        // Fetch the data from individual functions
        const statistics = await getStatisticsData(req); 
        const barChart = await getBarChartDataData(req); 
        const pieChart = await getPieChartDataData(req); 
        
        // Send the combined response
        return res.status(200).json({ statistics, barChart, pieChart });
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch combined data" });
    }
};

export { initializeDatabase, getTransactions, getStatistics, getBarChartData, 
    getPieChartData, getCombinedData };