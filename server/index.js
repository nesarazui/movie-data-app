const express = require('express')
const cors = require('cors');
// const bodyParser = require('body-parser')
const app = express()
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(cors())
const PORT = 8080
const movieData = require('./Routes/movieData')

app.get('/', (req, res) => {
    res.send('Welcome to the server')
})

app.use('/movieData', movieData)

// app.use(function (err, req, res, next) {
//     console.error(err)
//     res.status(500).send('Something broke!')
//   })

app.listen(PORT, () => {
    console.log(`Server is running at: http://localhost:${PORT}/`)
})