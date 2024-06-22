const cpf = {
  type: 'string',
  pattern: '^\\d{11}$',
  example: '21554495008'
}

const cnpj = {
  type: 'string',
  pattern: '^\\d{14}$',
  example: '33400689000109'
}

const connectionType = ['monofasico', 'bifasico', 'trifasico']

const consumptionClass = ['residencial', 'industrial', 'comercial']

const tariffModality = ['branca', 'convencional']

module.exports = {
  cpf,
  cnpj,
  connectionType,
  consumptionClass,
  tariffModality
}
