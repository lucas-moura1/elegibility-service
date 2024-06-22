module.exports = class InvalidEligibleError extends Error {
  constructor(error) {
    super(error)
    this.message = error
  }
}
