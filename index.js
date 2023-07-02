
require('dotenv').config()

const express = require('express')
const cors = require('cors');


const app = express()

const baseUrl = process.env.BASE_URL



app.use(express.json())

app.use(cors())



const midleHandler = async (req, res) => {

    console.log("url", req.url)
    console.log("method", req.method)

    try {

        const options = {
            method: req.method,
            headers: {
                "Content-type": "application/json"
            }
        }

        if(req.method !== 'GET'){
            options.body = JSON.stringify(req.body)
        }

        let response = await fetch(`${baseUrl}${req.url}`, options)
        console.log(response);

        let data = await response.json()

        console.log(data);

        res.status(response.status).send(data)

    } catch (error) {

        console.log(error.message);
        
        res.status(500).send({
            error: error.message
        })

    }

}




app.get('/*', midleHandler)

app.post('/*', midleHandler)

app.put('/*', midleHandler)

app.patch('/*', midleHandler)

app.delete('/*', midleHandler)




app.listen(8080, () => {
    console.log('Server is runnning on port 8080');
})