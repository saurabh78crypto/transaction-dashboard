import React from "react";

const TransactionTable = React.memo(({ transactions }) => {
  if (!transactions.length) {
    return <div>No transactions available for the selected month.</div>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Price</th>
          <th>Category</th>
          <th>Sold</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction) => (
          <tr key={transaction._id}>
            <td>{transaction.id}</td>
            <td>{transaction.productTitle}</td>
            <td>{transaction.productDescription}</td>
            <td>{transaction.price}</td>
            <td>{transaction.category}</td>
            <td>{transaction.sold ? "Yes" : "No"}</td>
            <td>
              <img
                src={transaction.image}
                alt={transaction.productTitle}
                style={{ width: "50px", height: "50px", objectFit: "cover" }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

export default TransactionTable;
