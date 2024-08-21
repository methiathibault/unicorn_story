const History = require("../modeles/history")
const Choice = require('../modeles/choice')
const Scenario = require('../modeles/scenario')
const Unicorn = require("../modeles/unicorn")
const User = require('../modeles/user')


const launch = async()=>{

    await History.sync({force: true})
    await Scenario.sync({force: true})
    await Choice.sync({force: true})
    await Unicorn.sync({force: true})
    await User.sync({force: true})
  
}


launch()