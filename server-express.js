import express from 'express';
import volunteerRouter from './1-Routers/volunteers.router.js';
import requestRouter from './1-Routers/requests.router.js';
import district from './1-Routers/districts.router.js';
import priorities from './1-Routers/priorities.router.js';
import statuses from './1-Routers/statuses.router.js'
const app = express();

app.use(express.json());

app.use('/api/volunteers',volunteerRouter);
app.use('/api/Requests',requestRouter);
app.use('/api/district',district);
app.use('/api/priorities',priorities);
app.use('/api/statuses',statuses);

app.listen(3000, '127.0.0.1', () => {
    console.log(`listening on port http://127.0.0.1:3000`);
});
