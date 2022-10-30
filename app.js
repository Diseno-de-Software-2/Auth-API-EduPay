const express = require('express')
const app = express()
const axios = require('axios')
const HOST = 'localhost'
const PORT = 3001 || process.env.PORT

app.use(express.json())

app.get('/login', (req, res, next) => {
    res.send('Hello from the auth server!')
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
    console.log(response.data)
    console.log(`Auth server listening on port ${PORT}`)
}) 
