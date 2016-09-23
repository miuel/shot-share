'use strict'

const jwt = require('jsonwebtoken')
const berarer = require('token-extractor')

module.exports = {
  async signToken (payload, secret, options) {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) return reject(err)

        resolve(token)
      })
    })
  },

  async verifyToken (token, secret, options) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, secret, options, (err, decoded) => {
        if (err) return reject(err)
        resolve(decoded)
      })
    })
  },

  async extracToken (req) {
    return new Promise((resolve, reject) => {
      berarer(req, (err, token) => {
        if (err) return reject(err)
        resolve(token)
      })
    })
  }
}
