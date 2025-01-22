const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

const users = require('./public/users');
const products = require('./public/products');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'about.html'));
})

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
})

app.get('/unknown', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', '404.html'));
})

app.get('/products', (req, res) => {
    res.json(products); 
});

app.get('/products/:productId', (req, res) => {
    const productId = req.params.productId;
    const product = products.find((p) => p.id === parseInt(productId));
    if (!product) {
        return res.status(404).send('Product not found');
    }
    res.json(product); 
});

// FOR TEST http://localhost:3000/users?age=30
app.get('/users', (req, res) => {
  const ageParam = req.query.age;

  if (ageParam) {
      const age = parseInt(ageParam, 10);

      if (isNaN(age)) 
          return res.status(400).json({ error: 'Invalid age parameter' });
      
      const filteredUsers = users.filter(user => user.age > age);

      return res.json(filteredUsers); 
  }

  res.json(users);
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
