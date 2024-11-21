import React from "react";

const TransactionStatistics = ({ statistics, params }) => {
  return (
    <div className="statistics-box">
      <div className="statistics-header">
        <h3>Statistics - {params}</h3>
      </div>
      <div className="statistics-content">
        <p>
          <span>Total Sale:</span> {statistics.totalSalesAmount}
        </p>
        <p>
          <span>Total Sold Items:</span> {statistics.totalSoldItems}
        </p>
        <p>
          <span>Total Not Sold Items:</span> {statistics.totalNotSoldItems}
        </p>
      </div>
    </div>
  );
};

export default TransactionStatistics;
