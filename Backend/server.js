const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const cors = require('cors')

const getLista = () =>{
    try {
    const contets = fs.readFileSync('./db.json', 'utf8')
  
  if(!contets){
    return []
  }
   return JSON.parse(contets).lista
  } catch(error) {
    console.error(error)
    return []
    }
}

const saveLista = (newLista) => fs.writeFileSync('./db.json', JSON.stringify({lista: newLista}, null, 2))

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
    const lista = getLista()
    const prod = lista.find(prod => prod.id === id)
    if (prod) {
        res.json(prod)
    } else {
        res.status(404).end()
    }
})

app.post('/lista/',(req, res) => {
    let lista = getLista()
    const generateID = () =>{
        let listLenght;
        if(lista.length < 1){
            listLenght = 0
        } else {
            listLenght = lista.map(n => n.id).sort((a,b)=> a - b).reverse()[0]
        }
        return listLenght + 1
    }
    const product = {
        product: req.body.product,
        id : generateID(lista)
    }
    lista = lista.concat(product)
    saveLista(lista)
    res.json(product)
})

app.put('/lista/:id', (req, res) => {
    const id = Number(req.params.id)
    let lista = getLista()
    const prodToChange = lista.find(prod => prod.id === id)
    if (!prodToChange) {
        res.status(404).end()
        return
    }
    Object.assign(prodToChange, req.body)
    saveLista(lista)
    res.json(prodToChange)

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
