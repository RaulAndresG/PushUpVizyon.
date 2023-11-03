const express = require('express');
const app = express();

require('dotenv').config();

const routerbase = require('./routes/enpos.routes.js');

app.use('/PushUpVizyon', routerbase);

const port = process.env.PORT;

app.use(express.json());

app.listen(port, () => {
    console.log(`Almenos en este puerto: ${port} mira ese numerin.`);
})