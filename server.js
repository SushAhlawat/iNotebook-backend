const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors');


connectToMongo();
const app = express()
const port = 8080

app.use(cors());
app.use(express.json());
app.use('/auth', require('./routes/auth'));
app.use('/notes', require('./routes/notes'));
app.use('/hello', require('./routes/hello'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})