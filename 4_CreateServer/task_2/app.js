const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Устанавливаем папку с шаблонами
app.use(express.static(path.join(__dirname, 'templates')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'templates', 'page.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});