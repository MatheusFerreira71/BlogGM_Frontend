import express from 'express';
import { join } from 'path'
const app = express();

app.use(express.static(`${__dirname}/dist/frontend`));

app.get('/*', (req, res) => {
    res.sendFile(join(`${__dirname}/dist/frontend/index.html`));
});

app.listen(process.env.PORT || 8080);