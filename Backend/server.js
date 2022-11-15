const express = require('express')
const app = express()
const bodyParser = require('body-parser') 
app.use(bodyParser.json())

let lista = [
    {
        product: "Kananmuna",
        id: 1
    },
    {
        product: "Jauhoja",
        id: 2
    },
    {
        product: "Salaattia",
        id: 5
    },
    {
        product: "Jauhoja",
        id: 6
    },
    {
        product: "Makkara",
        id: 7
    }
]


app.get('/', (req, res) => {
    res.send('Ostoslista')
})

app.get('/ostoslista', (req, res) => {
    res.json(lista)
})

app.get('/ostoslista/:id', (req, res) => {
    const id = Number(req.params.id)
    console.log(id)
    const prod = lista.find(prod =>  prod.id === id
    )
    console.log(prod)
    if (prod) {
        res.json(prod)
    } else {
        res.status(404).end()
    }
})

app.delete('/ostoslista/:id', (req, res) => {
    const id = Number(req.params.id)
    console.log(id)
    lista = lista.filter(prod => prod.id !== id)
    console.log(lista)
    res.status(204).send(null).end()
})

const port = 3001
app.listen(port)

console.log(`Server  runing on port: ${port}`)
