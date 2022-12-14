const express = require('express')
const app = express()
const port = 8080


app.get('/', (req, res) => {
  // serve the index.html file from the public folder
  res.sendFile(__dirname + '/public/index.html');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})