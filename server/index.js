const express = require('express');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());


app.use("/users", require("./routes-user"));
app.use("/recipes", require("./routes-recipes"));

app.listen(1000, console.log('SERVER CONNECTED :)'))