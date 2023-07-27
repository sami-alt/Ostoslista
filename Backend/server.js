const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const crypto = require('node:crypto')

const knex = require('knex')({
    client: 'better-sqlite3',
    connection: {
        filename: "./list.db"
    }
});

const allowedOrigins = ['localhost', 'http://localhost:3000', 'http://localhost:3001'];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};


app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(cookieParser())

const getProducts = (id) => {
    return knex.select('*').from('items').where('listId', id)
}

const getLists = (id) => {
    return knex.select('*').from('lists').where('owner', id).orWhereExists(knex.select('*').from('sharedList').where('sharedListId', id).andWhere('sharedToUserId', id))
}

const getUser = async (username) => {
    const [user] = await knex.select('passwordHash', 'username', 'id').from('users').where('username', username)
    if (!user) {
        throw new Error(`Cannot find user with username "${username}"`)
    }
    return user
}

const getSession = (id) => {
    return knex.select('token').from('sessions').where('userId', id)
}


app.get('/', (req, res) => {
    res.send('Ostoslista')
})


async function getAuthenticatedUser(req) {
    const cookies = req.cookies
    console.log('cookies', cookies);
    const sessionToken = cookies.session_token
    if (!sessionToken) {
        throw new Error('Not logged in')
    }
    const [user] = await knex('users').whereExists(function () {
        this.from('sessions').where('token', sessionToken)
            .andWhereColumn('userId', 'users.id')
    })
    if (!user) {
        throw new Error('Invalid session token');
    }
    return user
}


//tästä käsittelee käyttäjän lisäykset.

app.post('/user', async (req, res) => {
    const user = {
        username: req.body.username,
        passwordHash: req.body.password
    }
    console.log(user)
    const createdUser = await knex('users').insert(user).returning('id')
    user.id = createdUser[0].id
    //console.log(user)
    res.json(user)

})


//login

app.post('/login', async (req, res) => {

    const user = {
        username: req.body.username,
        password: req.body.password
    }
    console.log(user)
    if (!user.username) {
        res.status(401).end()
        return
    }
    const dbUser = (await getUser(user.username))
    console.log(dbUser)
    const expPassword = dbUser.passwordHash
    if (!expPassword || expPassword !== user.password) {
        res.status(401).end()
    }

    const sessionToken = crypto.randomUUID()

    const session = {
        token: sessionToken,
        userId: dbUser.id,
    }

    await knex('sessions').insert(session).returning('created_at')

    res.cookie('session_token', sessionToken)
    res.end()
})

app.use(function (req, res, next) {
    getAuthenticatedUser(req)
        .then(user => {
            req.user = user;
            console.log('waaa', user)
            next(null, req);
        }, err => {
            console.error('fail', err)
            res.status(401).send('Unauthorized').end()
        })
})

//Tästä käsittelee erillisten tuotteiden lisäykset, muokkaukset ja poistot.

app.get('/tuotteet/:listId', async (req, res) => {
    try {
        const values = await getProducts(req.params.listId)
        res.json(values)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: String(err) })
    }
})

app.post('/tuote/', async (req, res) => {
    const product = {
        product: req.body.product,
        listId: req.body.listId,
        done: false
    }
    const createdProducts = await knex('items').insert(product).returning('id')
    product.id = createdProducts[0].id
    res.json(product)
})

app.put('/tuote/:id', async (req, res) => {
    const id = Number(req.params.id)
    let lista = await getProducts()
    const prodToChange = lista.find(prod => prod.id === id)
    if (!prodToChange) {
        res.status(404).end()
        return
    }

    await knex('items').update(req.body).where('id', id)
    Object.assign(prodToChange, req.body)
    res.json(prodToChange)
})

app.delete('/tuote/:id', async (req, res) => {
    const id = Number(req.params.id)
    await knex('items').where('id', id).del()
    res.json({ id })
})

//Tästä käsittelee listojen lisäykset ja poistot.

app.get('/listat', async (req, res) => {
    const user = req.user;
    console.log('user:', user);
    try {
        const lists = await getLists(user.id)
        res.json(lists)
        console.log('aaaa', lists)
    } catch (err) {
        console.log('err', err)
        res.status(500).json({ error: String(err) })
    }

})

app.post('/lista', async (req, res) => {
    const list = {
        name: req.body.name,
        owner: req.user.id
    }
    //console.log(list)
    const createdList = await knex('lists').insert(list).returning('id')
    list.id = createdList[0].id
    //console.log(list)
    res.json(list)
})

app.delete('/lista/:id', async (req, res) => {
    const id = Number(req.params.id)
    await knex('items').where('listId', id).del()
    await knex('lists').where('id', id).del()

    res.json({ id })
})



app.get('/auth', (req, res) => {
    if (!req.cookies) {
        res.status(401).end()
        return
    }

    const sessionToken = req.cookies['session_token']
    if (!sessionToken) {
        res.status(401).end()
        return
    }

    userSession = getSession(req.params.id)
    if (!userSession) {
        res.status(401).end()
        return

    }
})

app.get('/logout', async (req, res) => {
    if (!req.cookies) {
        res.status(401).end()
        return
    }

    const sessionToken = req.cookies['session_token']
    if (!sessionToken) {
        res.status(401).end()
        return
    }

    await knex('sessions').where('token', sessionToken).del()
    res.end()

})

const port = 3001
app.listen(port)

console.log(`Server  runing on port: ${port}`)
