import express from 'express';
import routeCanciones from './routes/repertorio.routes.js';

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

app.use('/', routeCanciones);


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> { console.log(`http://localhost:${PORT}/`)});