// const express = require('express')
import express from 'express'

const app = express()

const hostname = 'localhost'
const port = 8017

app.get('/', function (req, res) {
    res.end('<h1>Hello World NodeJS nDyuDev </h1>')
})

// Lắng nghe yêu cầu
app.listen(port,hostname, () => {
    console.log(`Hello nDyu Dev, I'm running server Trello with MERN Stack at http://${hostname}:${port}/`);
});