require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3002;
const router = require('./routers/index');
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

app.listen(PORT, () => {
  console.log(`This app running at port:${PORT}`);
});
