const express = require('express')
const cors = require('cors');

const app = express()

app.use(express.json())

app.use(cors())

app.get('/*', async (req, res) => {

    console.log("url", req.url)
    console.log("method", req.method)
   

    try {

        let response = await fetch(`http://144.24.137.155:3000${req.url}`)

        console.log(response);

        let data = await response.json()

        console.log(data);

        res.send({
            'isError': false,
            data
        })

    } catch (error) {

        res.send({
            'isError': true,
            error: error.message
        })


    }


})

app.listen(8080, () => {
    console.log('Server is runnning on port 8080');
})