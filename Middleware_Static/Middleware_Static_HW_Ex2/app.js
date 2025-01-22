/*
מגיש: 
יבגני נמצ'נקו 
כיתה 48-5
*/

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/css', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', '/css/main.css'));
  })
  
app.get('/js', (req, res) => {
res.sendFile(path.join(__dirname, 'public', '/js/js.js'));
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
