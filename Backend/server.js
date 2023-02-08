const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const cors = require('cors')
//import { generateID } from './idGen'

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
    console.log('getttt')
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

app.post('/lista/'),(req, res) => {
    let lista = getLista()
    //req.id = generateID(lista).JSON.stringify()
}

app.put('/lista/:id', (req, res) => {
    console.log('aaabababa')
    const id = Number(req.params.id)
    let lista = getLista()
    const prodToChange = lista.find(prod => prod.id === id)
    if (!prodToChange) {
        console.log(lista, id)
        res.status(404).end()
        return
    }
    Object.assign(prodToChange, req.body)
    saveLista(lista)
    res.json(prod)

})

app.delete('/lista/:id', (req, res) => {
    const id = Number(req.params.id)
    let lista = getLista()
    lista = lista.filter(prod => prod.id !== id)
    saveLista(lista)
    res.status(204).send(null).end()
})

const port = 3001
app.listen(port)

console.log(`Server  runing on port: ${port}`)
