const express = require('express')
const app = express()
const axios = require('axios')
const HOST = 'localhost'
const cors = require('cors')
const PORT = 3001 || process.env.PORT

app.use(express.json())
app.use(cors())

app.post('/login', (req, res, next) => {
    // const { username, password } = req.body
    if (true) {
        res.send('Logged in successfully')
    } else {
        res.status(401).send('Unauthorized')
    }
})

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
        "url": "http://localhost:3001",
        "enabled": true
    })
    console.log(response.data)
    console.log(`Auth server listening on port ${PORT}`)
}) 
