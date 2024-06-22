const express = require('express')
const isEligible = require('../usecases/isEligible')
const InvalidEligibleError = require('../usecases/errors/invalidEligibleError')
const logger = require('../config/logger')

const routes = express.Router()

routes.post('/check-eligibility', (req, res) => {
  try {
    logger.info('Starting validating eligibility')

    const eligibility = isEligible({
      documentNumber: req.body.numeroDoDocumento,
      connectionType: req.body.tipoDeConexao,
      consumptionClass: req.body.classeDeConsumo,
      tariffModality: req.body.modalidadeTarifaria,
      consumptionHistory: req.body.historicoDeConsumo
    })

    return res.json(eligibility)
  } catch (error) {
    if (error instanceof InvalidEligibleError) {
      return res.status(400).json({ erros: error.message })
    }
    logger.error(`Error >> ${JSON.stringify(error)}`)
    return res.status(500).json({ erro: 'Erro interno do servidor' })
  }
})

module.exports = routes
