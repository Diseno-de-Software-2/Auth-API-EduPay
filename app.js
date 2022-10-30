const express = require('express')
const app = express()
const port = 3001 || process.env.PORT

app.use(express.json())

app.get('/auth', (req, res, next) => {
    res.send('Hello from the auth server!')
})

app.listen(port, () => {
    console.log('Auth server listening on port 3001')
}) 