const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const cors = require('cors')

const getLista = () =>
    JSON.parse(fs.readFileSync('./db.json', 'utf8')).lista
const saveLista = (newLista) =>
    fs.writeFileSync('./db.json', JSON.stringify({lista: newLista}, null, 2))

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Ostoslista')
})

app.get('/lista', (req, res) => {
    res.json(getLista())
})

app.get('/lista/:id', (req, res) => {
    const id = Number(req.params.id)
    console.log(id)
    const lista = getLista()
    console.log(lista)
    const prod = lista.find(prod => prod.id === id)
    console.log(prod)
    if (prod) {
        res.json(prod)
    } else {
        res.status(404).end()
    }
})

app.post('/list/:id'), (req, res) => {
    const id = 1

}

app.delete('/lista/:id', (req, res) => {
    const id = Number(req.params.id)
    console.log(id)
    let lista = getLista()
    lista = lista.filter(prod => prod.id !== id)
    saveLista(lista)
    console.log(lista)
    res.status(204).send(null).end()
})

const port = 3001
app.listen(port)

console.log(`Server  runing on port: ${port}`)
