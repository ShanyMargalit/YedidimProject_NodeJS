import express from 'express';
import volunteerRouter from './1-Routers/volunteers.router.js';
import requestRouter from './1-Routers/request.router.js';
import district from './1-Routers/district.router.js';

const app = express();

app.use(express.json());

app.use('/api/volunteers',volunteerRouter);
app.use('/api/Requests',requestRouter);
app.use('/api/district',district);

app.listen(3000, '127.0.0.1', () => {
    console.log(`listening on port http://127.0.0.1:3000`);
});


// import express from 'express';
// import mongoose from 'mongoose';

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Connect to MongoDB
// mongoose.connect('your_mongodb_connection_string', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log('Connected to MongoDB');
// }).catch((err) => {
//   console.error('Error connecting to MongoDB', err);
// });

// // Middleware
// app.use(express.json());

// // Routes
// app.get('/', (req, res) => {
//   res.send('Hello World!');
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
