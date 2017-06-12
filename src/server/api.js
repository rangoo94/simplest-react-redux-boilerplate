'use strict'

const { Router } = require('express')

const api = new Router()

const article = {
  id: 1,
  title: 'Some title'
}

api.get('/articles', (req, res) => res.send([ article ]))

api.get('/articles/1', (req, res) => res.send(article))

api.all('*', (req, res) => res.sendStatus(404))

module.exports = api
