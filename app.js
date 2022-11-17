const express = require('express')
const app = express()
const axios = require('axios')
const HOST = 'localhost'
const cors = require('cors')
const mysql = require('mysql2')
const jwt = require('jsonwebtoken')
const morgan = require('morgan')
var portfinder = require('portfinder');
portfinder.setBasePort(3050);
portfinder.setHighestPort(3099);
var setTerminalTitle = require('set-terminal-title');
setTerminalTitle('Autorization service', { verbose: true });
var PORT;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'sistemainstitucional'
})

connection.connect(function (err) {
    if (err) throw err
    console.log('Connected!')
})

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.post('/login', (req, res, next) => {
    const { email, password } = req.body
    const query = `SELECT * FROM personas WHERE email = '${email}' AND contraseña = '${password}'`
    console.log(query)
    connection.query(query, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } else {
            if (result.length > 0) {

                const envio = {
                    user: {
                        nombre: result[0].nombre,
                        apellidos: result[0].apellidos,
                        email: result[0].email,
                        id: result[0].id,
                        tipo: result[0].tipo,
                        fecha_nacimiento: result[0].fecha_nacimiento,
                        contraseña: result[0].contraseña
                    },
                    token: generateToken(result[0].id)
                }
                res.send(envio)
            } else {
                res.status(400).send('Email o contraseña incorrectos')
            }
        }
    })
})

portfinder.getPort(function (err, port) {
    PORT = port
    app.listen(PORT, async () => {
        const response = await axios({
            method: 'post',
            url: 'http://localhost:3000/register',
            headers: { 'Content-Type': 'application/json' },
            data: {
                apiName: "auth",
                protocol: "http",
                host: HOST,
                port: PORT,
            }
        })
        await axios.post('http://localhost:3000/switch/auth', {
            "url": "http://localhost:" + PORT,
            "enabled": true
        })
        console.log(response.data)
        console.log(`Auth server listening on port ${PORT}`)
    })
})

function generateToken(user) {
    return jwt.sign({ data: user }, 'secret', { expiresIn: '10h' })
}
