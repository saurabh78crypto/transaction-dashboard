import React, { useEffect, useState } from "react";
import MonthDropdown from "./Dropdown/MonthDropdown";
import SearchTransaction from "./Table/SearchTransaction";
import TransactionTable from "./Table/TransactionTable";
import TransactionStatistics from "./Statistics/TransactionStatistics";
import BarChart from "./Charts/BarChart";
import { getTransactions, getCombinedData } from "../api/api";
import Pagination from "./Pagination/Pagination";

const Dashboard = () => {
  const [month, setMonth] = useState("March");
  const [transactions, setTransactions] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [barChart, setBarChart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [total, setTotal] = useState(0);

  // Fetch data based on search query and other filters
  const fetchData = async (isSearch = false) => {
    try {
      setLoading(true);

      const params = { month, page, perPage, search: isSearch ? searchQuery : '' };

      if (isSearch && searchQuery) {
        const transactionRes = await getTransactions(params);
        setTransactions(transactionRes.data.transactions || []);
      } else {
        const transactionRes = await getTransactions(params);
        const combinedRes = await getCombinedData(params);
        const { statistics, barChart } = combinedRes.data;

        setTransactions(transactionRes.data.transactions || []);
        setStatistics(statistics || {});
        setBarChart(barChart || []);
      }

      setError(null);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError(error.message || "Failed to fetch data.");
      setTransactions([]);
      setStatistics({});
      setBarChart([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on month, page changes
  useEffect(() => {
    fetchData(false);
  }, [month, page]);

  // Fetch data when searchQuery changes
  useEffect(() => {
    if (searchQuery === "") {
      fetchData(false); // Fetch default transactions when search is cleared
    } else {
      fetchData(true); // Fetch searched transactions
    }
  }, [searchQuery]);

  const handleNextPage = () => {
    if (page * perPage < total) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // Handle search action
  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1); // Reset to page 1 for new searches
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="dashboard">
      <div className="circle-title">
        <h1>Transaction Dashboard</h1>
      </div>
      <div className="controls">
        <MonthDropdown selectedMonth={month} onMonthChange={setMonth} />
        <SearchTransaction
          searchQuery={searchQuery}
          onSearch={handleSearch} 
        />
      </div>
      <TransactionTable transactions={transactions} />
      <Pagination
        page={page}
        perPage={perPage}
        total={total}
        onNextPage={handleNextPage}
        onPreviousPage={handlePreviousPage}
      />
      <TransactionStatistics statistics={statistics} params={month} />
      <BarChart data={barChart} params={month} />
    </div>
  );
};

export default Dashboard;
