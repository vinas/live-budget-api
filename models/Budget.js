class Budget {
  constructor({ name, initialAmount, endDate, startingDate }) {
    const getLastId = () => {
      return 0;
    };

    this.id = getLastId() + 1;
    this.name = name;
    this.startingDate = startingDate;
    this.endDate = endDate;
    this.initialAmount = initialAmount;
    this.createdAt = new Date();
  }
}

module.exports = Budget;
