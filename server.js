const express = require('express');
const app = express();
const server = require('http').Server(app);
const compression = require('compression');

app.use('/assets',
    express.static('build/assets', { maxAge: '1y' })
);
app.use('/',
    compression(),
    express.static('build', { maxAge: '1h' })
);

const port = process.env.PORT || 8000
server.listen(port);
console.log(`http://localhost:${port}`);
