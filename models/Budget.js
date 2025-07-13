class Budget {
  constructor({ id, name, initialAmount, endDate, startingDate }) {
    this.id = id;
    this.name = name;
    this.startingDate = startingDate;
    this.endDate = endDate;
    this.initialAmount = initialAmount;
  }
}

module.exports = Budget;
