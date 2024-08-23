const Story = require("../modeles/story")
const Choice = require('../modeles/choice')
const Scenario = require('../modeles/scenario')
const Unicorn = require("../modeles/unicorn")
const User = require('../modeles/user')
require('dotenv').config()


const launch = async()=>{

    await Story.sync({force: true})
    await Scenario.sync({force: true})
    await Choice.sync({force: true})
    await Unicorn.sync({force: true})
    await User.sync({force: true})
    await User.create({
        username: process.env.USER_USERNAME,
        password: process.env.USER_PASSWORD,
        email: process.env.USER_EMAIL,
    })
  
}


launch()