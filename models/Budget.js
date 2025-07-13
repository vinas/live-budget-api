class Budget {
  constructor({ id, name, initialAmount, endDate, startingDate }) {
    this.id = this.id;
    this.name = name;
    this.startingDate = startingDate;
    this.endDate = endDate;
    this.initialAmount = initialAmount;
    this.createdAt = new Date();
  }

  setId(id) {
    this.id = id;
  };
}

module.exports = Budget;
