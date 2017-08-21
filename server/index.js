const path = require('path');
const request = require('request');
const express = require('express');
const app = express();

const reginfo = require('./register.json');

app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.WEBPORT, () => console.log('Application started'));

setInterval(() => request({method: 'POST', url: process.env.REGURL, json: reginfo}, (err, res) => {
	if (err) console.log(err);
}), 60000);
