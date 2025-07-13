class Budget {
  constructor({ name, email, age }) {
    this.id = getLastId() + 1;
    this.name = name;
    this.startingDate = email;
    this.endDate = age;
    this.initialAmount = initialAmount;
    this.createdAt = new Date();
  }

  getLastId = () => {
    return 0;
  };
}

module.exports = Budget;
