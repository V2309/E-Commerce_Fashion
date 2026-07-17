//const express = require('express')
import express from 'express' // IMPORT EXPRESS
import  {approute } from './approute'
import db from './models/index' // IMPORT DB
//require('dotenv').config() // IMPORT THU VIEN DOTENV DE DOC BIEN CONFIG TRONG FILE .ENV
import dotenv from 'dotenv' // IMPORT THU VIEN DOTENV DE DOC BIEN CONFIG TRONG FILE .ENV
dotenv.config() // DOC BIEN CONFIG TRONG FILE .ENV
const os = require('os') // IMPORT THU VIEN OS DE LAY THONG TIN CPU, RAM

const app = express()

app.use(express.json()) // key value json
express.urlencoded({ extended: true }) // key value form ma hoa middleware
app.use(function (req, res, next) {
  // res.header('Access-Control-Allow-Origin', '*')
  // res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next()
})
// http://localhost:3000/ định nghĩa route
app.get('/', (req, res) => {
    // http://localhost:3000/
  res.send('This is the backend server for the E-commerce project')
})
// health check
app.get('/api/healthcheck', async (req, res) => {
  try {
    await db.sequelize.authenticate();

    const cpuLoad = os.loadavg();
    const memoryUsage = process.memoryUsage();
    const cpus = os.cpus();
    const cpuPercentage = (cpuLoad[0] / cpus.length) * 100;

    res.status(200).json({
      status: 'OK',
      database: 'Connected',
      cpuLoad: {
        '1min': cpuLoad[0],
        '5min': cpuLoad[1],
        '15min': cpuLoad[2],
        percentage: cpuPercentage.toFixed(2) + '%',
      },
      memoryUsage: {
        rss: (memoryUsage.rss / (1024 * 1024)).toFixed(2) + ' MB',
        heapTotal: (memoryUsage.heapTotal / (1024 * 1024)).toFixed(2) + ' MB',
        heapUsed: (memoryUsage.heapUsed / (1024 * 1024)).toFixed(2) + ' MB',
        external: (memoryUsage.external / (1024 * 1024)).toFixed(2) + ' MB',
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      message: error.message,
      timestamp: new Date(),
    });
  }
});

// port 3000
const PORT = process?.env?.PORT ?? 3000 // nếu không có thì mặc định là 3000

//app.use('/api/', router) // sử dụng router
approute(app)
app.listen(process.env.PORT, () => { // lắng nghe cổng
  console.log(`Example app listening on port ${process.env.PORT}`)
})
