const Eligibility = require('../entities/eligibility')
const InvalidEligibleError = require('./errors/invalidEligibleError')

module.exports = isEligible = ({
  documentNumber,
  connectionType,
  consumptionClass,
  tariffModality,
  consumptionHistory
}) => {
  const issues = []
  if (!documentNumber) {
    issues.push('Número do documento é obrigatório')
  }
  if (!connectionType) {
    issues.push('Tipo de conexão é obrigatório')
  }
  if (!consumptionClass) {
    issues.push('Classe de consumo é obrigatória')
  }
  if (!tariffModality) {
    issues.push('Modalidade tarifária é obrigatória')
  }
  if (!consumptionHistory) {
    issues.push('Histórico de consumo é obrigatório')
  }
  if (issues.length > 0) {
    throw new InvalidEligibleError(issues)
  }

  const eligibility = new Eligibility({
    documentNumber,
    connectionType,
    consumptionClass,
    tariffModality,
    consumptionHistory
  })

  if (eligibility.issues.length > 0) {
    response = {
      elegivel: eligibility.eligible,
      razoesDeInelegibilidade: eligibility.issues
    }
    return response
  }

  response = {
    elegivel: true,
    economiaAnualDeCO2: eligibility.annualCO2Economy
  }

  return response
}
