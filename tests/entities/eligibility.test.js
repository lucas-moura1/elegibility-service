const Eligibility = require('../../src/entities/eligibility')

describe('Test Eligibility', () => {
  it('should add "Número do documento inválido" to issues because document number is invalid', () => {
    const eligibility = new Eligibility({
      documentNumber: '123456789001',
      connectionType: 'monofasico',
      consumptionClass: 'residencial',
      tariffModality: 'convencional',
      consumptionHistory: [
        100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200
      ]
    })

    expect(eligibility.issues).toContain('Número do documento inválido')
  })

  it('should add "Tipo de conexão inválido" to issues because connection type is invalid', () => {
    const eligibility = new Eligibility({
      documentNumber: '12345678901234',
      connectionType: 'invalid',
      consumptionClass: 'residencial',
      tariffModality: 'convencional',
      consumptionHistory: [
        100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200
      ]
    })

    expect(eligibility.issues).toContain('Tipo de conexão inválido')
  })

  it('should add "Classe de consumo não aceita" to issues because consumption class is invalid', () => {
    const eligibility = new Eligibility({
      documentNumber: '12345678901234',
      connectionType: 'monofasico',
      consumptionClass: 'invalid',
      tariffModality: 'convencional',
      consumptionHistory: [
        100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200
      ]
    })

    expect(eligibility.issues).toContain('Classe de consumo não aceita')
  })

  it('should add "Modalidade tarifária não aceita" to issues because tariff modality is invalid', () => {
    const eligibility = new Eligibility({
      documentNumber: '12345678901234',
      connectionType: 'monofasico',
      consumptionClass: 'residencial',
      tariffModality: 'invalid',
      consumptionHistory: [
        100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200
      ]
    })

    expect(eligibility.issues).toContain('Modalidade tarifária não aceita')
  })

  it('Should add "Histórico de consumo deve conter 12 meses" to issues because consumption history does not have 12 months', () => {
    const eligibility = new Eligibility({
      documentNumber: '12345678901234',
      connectionType: 'monofasico',
      consumptionClass: 'residencial',
      tariffModality: 'convencional',
      consumptionHistory: [100, 200, 300, 400, 500, 600, 700, 800]
    })

    expect(eligibility.issues).toContain(
      'Histórico de consumo deve conter 12 meses'
    )
  })

  it('should not add any issues because all inputs are valid', () => {
    const eligibility = new Eligibility({
      documentNumber: '12345678901234',
      connectionType: 'monofasico',
      consumptionClass: 'residencial',
      tariffModality: 'convencional',
      consumptionHistory: [
        100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200
      ]
    })

    expect(eligibility.issues).toHaveLength(0)
  })

  it('should add "Consumo muito baixo para tipo de conexão" to issues because consumption average is too low for monofasico connection type', () => {
    const eligibility = new Eligibility({
      documentNumber: '12345678901234',
      connectionType: 'monofasico',
      consumptionClass: 'residencial',
      tariffModality: 'convencional',
      consumptionHistory: [
        100, 200, 300, 350, 320, 350, 200, 350, 300, 250, 300, 150
      ]
    })

    expect(eligibility.issues).toContain(
      'Consumo muito baixo para tipo de conexão'
    )
  })

  it('should add "Consumo muito baixo para tipo de conexão" to issues because consumption average is too low for bifasico connection type', () => {
    const eligibility = new Eligibility({
      documentNumber: '12345678901234',
      connectionType: 'bifasico',
      consumptionClass: 'residencial',
      tariffModality: 'convencional',
      consumptionHistory: [
        100, 200, 300, 400, 450, 500, 450, 300, 250, 400, 450, 300
      ]
    })

    expect(eligibility.issues).toContain(
      'Consumo muito baixo para tipo de conexão'
    )
  })

  it('should add "Consumo muito baixo para tipo de conexão" to issues because consumption average is too low for trifasico connection type', () => {
    const eligibility = new Eligibility({
      documentNumber: '12345678901234',
      connectionType: 'trifasico',
      consumptionClass: 'residencial',
      tariffModality: 'convencional',
      consumptionHistory: [
        100, 200, 300, 400, 500, 550, 600, 650, 700, 750, 800, 850
      ]
    })

    expect(eligibility.issues).toContain(
      'Consumo muito baixo para tipo de conexão'
    )
  })

  it('should be eligible because all inputs are valid', () => {
    const eligibility = new Eligibility({
      documentNumber: '12345678901234',
      connectionType: 'monofasico',
      consumptionClass: 'residencial',
      tariffModality: 'convencional',
      consumptionHistory: [
        100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200
      ]
    })

    expect(eligibility.eligible).toBe(true)
    expect(eligibility.annualCO2Economy).toBe(655.2)
  })
})
