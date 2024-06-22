# Eligibility Service

## Visão Geral
A API do Serviço de Elegibilidade foi projetada para determinar a elegibilidade dos clientes. Caso a empresa não seja elegível, precisamos explicitar os motivos para tal. Caso ela seja elegível, precisamos calcular também a projeção da quantidade de CO2 que ela deixaria de emitir caso usasse energia limpa.

## Recursos
- **Verificações de Elegibilidade:** Determine a elegibilidade com base dados fornecidos.

## Endpoints da API

### Verificar Elegibilidade
- **Endpoint:** `/check-eligibility`
- **Método:** `POST`
- **Corpo de Requisição:**
```json
{
  "numeroDoDocumento": "11021433793",
  "tipoDeConexao": "bifasico",
  "classeDeConsumo": "comercial",
  "modalidadeTarifaria": "convencional",
  "historicoDeConsumo": [
    3878,
    4580,
    5976,
    2797,
    2481,
    5731,
    5000,
    4392,
    7859,
    4160,
    6941,
    3000
  ]
}
```
- **Corpo de Requisição:**
```json
{
    "elegivel": true,
    "economiaAnualDeCO2": 4770.78
}
```
