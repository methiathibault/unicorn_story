const express = require('express');
const app = express();
const cors = require('cors');
const unicornRoute = require('./routes/unicornRoute');
const userRoute = require('./routes/userRoute')
const scenarioRoute = require('./routes/scenarioRoute')
const storyRoute = require('./routes/storyRoute')
const scenarioRoute = require('./routes/scenarioRoute')
const choiceRoute = require('./routes/choiceRoute')

app.use(express.json());
app.use(cors());

app.use('/api/unicorn/', unicornRoute);
app.use('/api/user/', userRoute);
app.use('/api/scenario/', scenarioRoute);
app.use('/api/story/', storyRoute)
app.use('/api/choice/', choiceRoute)

app.listen(8000, () => {
    console.log('Server is running on port 8000');
})