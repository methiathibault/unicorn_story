const express = require('express');
const app = express();
const cors = require('cors');
const unicornRoute = require('./routes/unicornRoute');
const userRoute = require('./routes/userRoute')

app.use(express.json());
app.use(cors());

app.use('/api/unicorn/', unicornRoute);
app.use('/api/user/', userRoute);

app.listen(8000, () => {
    console.log('Server is running on port 8000');
})