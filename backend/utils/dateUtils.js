const getMonthNumber = (monthName) => {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December",
    ];
    return months.indexOf(monthName) + 1; // 1-based indexing
};

export default getMonthNumber;