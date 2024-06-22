const isEligible = require('../../src/usecases/isEligible')
const Eligibility = require('../../src/entities/eligibility')
const InvalidEligibleError = require('../../src/usecases/errors/invalidEligibleError')

describe('Test isEligible', () => {
  it('should return the eligibility response when all required fields are provided', () => {
    const expectedResponse = {
      elegivel: true,
      economiaAnualDeCO2: 655.2
    }

    const response = isEligible({
      documentNumber: '12345678901234',
      connectionType: 'monofasico',
      consumptionClass: 'residencial',
      tariffModality: 'convencional',
      consumptionHistory: [
        100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200
      ]
    })

    expect(response).toEqual(expectedResponse)
  })

  it('should return without eligibility', () => {
    const expectedResponse = {
      elegivel: false,
      razoesDeInelegibilidade: ['Histórico de consumo deve conter 12 meses']
    }

    const response = isEligible({
      documentNumber: '12345678901234',
      connectionType: 'monofasico',
      consumptionClass: 'residencial',
      tariffModality: 'convencional',
      consumptionHistory: [100]
    })

    expect(response).toEqual(expectedResponse)
  })

  it('should throw an InvalidEligibleError when any required field is missing', () => {
    expect(() => {
      isEligible({
        documentNumber: undefined,
        connectionType: undefined,
        consumptionClass: undefined,
        tariffModality: undefined,
        consumptionHistory: null
      })
    }).toThrow(InvalidEligibleError)
  })
})
