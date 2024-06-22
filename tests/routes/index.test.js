const request = require('supertest')
const app = require('../../src/config/server')
const isEligible = require('../../src/usecases/isEligible')
const InvalidEligibleError = require('../../src/usecases/errors/invalidEligibleError')

jest.mock('../../src/usecases/isEligible')

describe('POST /check-eligibility', () => {
  beforeEach(() => {
    isEligible.mockReset()
  })

  it('should return 200 and eligible true because all inputs are valid', async () => {
    isEligible.mockReturnValue({ elegivel: true })

    const response = await request(app)
      .post('/check-eligibility')
      .send({
        numeroDoDocumento: '12345678901234',
        tipoDeConexao: 'monofasico',
        classeDeConsumo: 'residencial',
        modalidadeTarifaria: 'convencional',
        historicoDeConsumo: [
          100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200
        ]
      })

    expect(response.status).toBe(200)
    expect(response.body.elegivel).toBe(true)
  })

  it('should return 400 and error message because any input is invalid', async () => {
    isEligible.mockImplementation(() => {
      throw new InvalidEligibleError(['Número do documento é obrigatório'])
    })

    const response = await request(app)
      .post('/check-eligibility')
      .send({
        tipoDeConexao: 'monofasico',
        classeDeConsumo: 'residencial',
        modalidadeTarifaria: 'convencional',
        historicoDeConsumo: [100, 200, 300, 400]
      })

    expect(response.status).toBe(400)
    expect(response.body.erros).toContain('Número do documento é obrigatório')
  })

  it('should return 500 and error message because there is an internal server error', async () => {
    isEligible.mockImplementation(() => {
      throw new Error('Internal server error')
    })

    const response = await request(app)
      .post('/check-eligibility')
      .send({
        numeroDoDocumento: '12345678901234',
        tipoDeConexao: 'monofasico',
        classeDeConsumo: 'residencial',
        modalidadeTarifaria: 123,
        historicoDeConsumo: ['invalid']
      })

    expect(response.status).toBe(500)
    expect(response.body.erro).toBe('Erro interno do servidor')
  })
})
