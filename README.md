# Transaction Dashboard Application

This is a web application for displaying and managing transactions. It allows users to filter transactions by month and search for specific transactions. The application features a paginated transaction table, statistics, and charts, making it easy to visualize transaction data.

## Features
- **Month Filter**: Select a specific month to view transactions for that month.
- **Search Functionality**: Search for transactions by `productTitle`, `productDescription`, and `price`.
- **Pagination**: Navigate through paginated results, displaying a maximum of 10 transactions per page.
- **Transaction Table**: Displays transaction data with details such as `productTitle`, `productDescription`, `price`, and more.
- **Statistics**: View transaction statistics like total sales and other metrics for the selected month.
- **Bar Chart**: Visualize transaction data through a bar chart representation.

## Technologies Used
- **Frontend**:
  - React
  - Axios (for API requests)
  - React Router
  - React Hooks (useState, useEffect)
  - Material UI (for styling)
  - Pagination Component

- **Backend**:
  - Node.js
  - Express
  - MongoDB (via Mongoose)
  - API for fetching and managing transaction data

## Setup Instructions

### Prerequisites
Before setting up the project, ensure that you have the following installed:
- **Node.js**: [Download and install Node.js](https://nodejs.org/en/download/)
- **MongoDB**: [Download and install MongoDB](https://www.mongodb.com/try/download/community)

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/saurabh78crypto/transaction-dashboard.git 
   cd transaction-dashboard
   ```

2. **Backend Setup:**
    - Navigate to the backend directory:
        ```bash
        cd backend
        ```

    - Install dependencies:
        ```bash
        npm install
        ```    

    - Create a `.env` file in the backend directory and add your MongoDB connection string:
        ```bash
        MONGO_URI=your-mongodb-connection-string
        PORT=5000
        THIRD_PARTY_API ='https://s3.amazonaws.com/roxiler.com/product_transaction.json'
        CORS_ORIGIN = *
        CORS_METHODS = GET
        ```

    - Start the server:
        ```bash
        npm start
        ```

  - The backend server will now be running at `http://localhost:5000`.


3. **Frontend Setup:**
    - Navigate to the frontend directory:
        ```bash
        cd frontend
        ```

    - Install dependencies:
        ```bash
        npm install
        ```    

    - Start the development server:
        ```bash
        npm start
        ```

  - The frontend will now be available at `http://localhost:3000`.

