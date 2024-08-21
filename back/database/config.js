const History = require("../modeles/history")
const Choice = require('../modeles/choice')
const Scenario = require('../modeles/scenario')


const launch = async()=>{
    await History.sync({force: true})
    await Scenario.sync({force: true})
    await Choice.sync({force: true})
}


launch()