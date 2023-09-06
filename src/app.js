import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import productsRouter from './routes/productsRouter.js';
import viewsRouter from './routes/viewsRouter.js';


const app = express();
const httpSever = app.listen(8080, () => console.log('oka'));
const socketServer = new Server(httpSever);


app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');
app.use(express.static('./src/public'));

app.use((req, res, next) => {
    req.context = {socketServer};
    next();
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', viewsRouter);
app.use('/api/products/', productsRouter);


