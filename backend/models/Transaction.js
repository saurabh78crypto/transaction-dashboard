import mongoose from "mongoose";

// Define the schema for transactions
const transactionSchema = new mongoose.Schema({
    id: {
        type: Number,  
        required: true,  
        unique: true,  
    },
    productTitle: {
        type: String,
        required: true,  
    },
    productDescription: {
        type: String,
        required: true,  
    },
    price: {
        type: Number,
        required: true,  
    },
    dateOfSale: {
        type: Date,
        required: true,  
    },
    category: {
        type: String,
        required: true,  
    },
    image: {
        type: String,   
    },
    sold: {
        type: Boolean,
        required: true,  
    },
    month: {
        type: Number,  
    },
}, {
    timestamps: true,  
});

// Create the model for the 'Transaction' collection
const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
