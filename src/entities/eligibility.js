const {
  cpf,
  cnpj,
  connectionType,
  consumptionClass,
  tariffModality
} = require('./types')

module.exports = class Eligibility {
  issues = []
  eligible = false
  annualCO2Economy = 0
  #consumptionAvg = 0
  #consumptionSum = 0

  constructor({
    documentNumber,
    connectionType,
    consumptionClass,
    tariffModality,
    consumptionHistory
  }) {
    this.documentNumber = documentNumber
    this.connectionType = connectionType
    this.consumptionClass = consumptionClass
    this.tariffModality = tariffModality
    this.consumptionHistory = consumptionHistory

    this.#validate()
    if (this.issues.length == 0) {
      this.eligible = true
      this.#calculateEstimatedAnnualEconomy()
    }
  }

  #validate() {
    if (
      this.documentNumber.match(cpf.pattern) == null &&
      this.documentNumber.match(cnpj.pattern) == null
    ) {
      this.issues.push('Número do documento inválido')
    }
    if (!connectionType.includes(this.connectionType)) {
      this.issues.push('Tipo de conexão inválido')
    }
    if (!consumptionClass.includes(this.consumptionClass)) {
      this.issues.push('Classe de consumo não aceita')
    }
    if (!tariffModality.includes(this.tariffModality)) {
      this.issues.push('Modalidade tarifária não aceita')
    }
    if (this.consumptionHistory.length != 12) {
      this.issues.push('Histórico de consumo deve conter 12 meses')
    }
    if (this.issues.length > 0) {
      return
    }

    this.#calculateConsumptionSum()
    this.#consumptionAvg = this.#consumptionSum / this.consumptionHistory.length

    switch (this.connectionType) {
      case 'monofasico':
        if (this.#consumptionAvg < 400) {
          this.issues.push('Consumo muito baixo para tipo de conexão')
        }
        break
      case 'bifasico':
        if (this.#consumptionAvg < 500) {
          this.issues.push('Consumo muito baixo para tipo de conexão')
        }
        break
      case 'trifasico':
        if (this.#consumptionAvg < 750) {
          this.issues.push('Consumo muito baixo para tipo de conexão')
        }
    }
  }

  #calculateConsumptionSum() {
    this.#consumptionSum = this.consumptionHistory.reduce((a, b) => a + b, 0)
  }

  #calculateEstimatedAnnualEconomy() {
    this.annualCO2Economy = (this.#consumptionSum * 84) / 1000
  }
}
