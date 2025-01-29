// Required modules import
const express = require('express');
const app = express();
const port = process.env.PORT || 3002;
const path = require('path');

// Import JSON data
const users = require('./assets/users.json');
const products = require('./assets/products.json');

// Connect middleware for static files processing
app.use(express.static(path.join(__dirname, 'assets')));

// Route for main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'index.html'));
});

// Route for About page
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'about.html'));
})

// Route for Contact page
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', 'contact.html'));
})

// Route for 404 page (not found)
app.get('/unknown', (req, res) => {
  res.sendFile(path.join(__dirname, 'assets', '404.html'));
})

// API: Get all products
app.get('/products', (req, res) => {
    res.json(products); 
});

// API: Get product by ID
app.get('/products/:productId', (req, res) => {
    const productId = req.params.productId;
    // Search for product by ID
    const product = products.find((p) => p.id === parseInt(productId));
    if (!product) { // If product not found, return 404
        return res.status(404).send('Product not found');
    }
    res.json(product); 
});

// API: Get users with age filtering
// Example usage: http://localhost:3001/users?age=30
app.get('/users', (req, res) => {
  const ageParam = req.query.age;

  if (ageParam) {
      const age = parseInt(ageParam, 10);
      // Check age parameter correctness
      if (isNaN(age)) 
          return res.status(400).json({ error: 'Invalid age parameter' });
      // Filter users by age
      const filteredUsers = users.filter(user => user.age > age);
      // Return filtered users
      return res.json(filteredUsers); 
  }else {
    // If age not specified, return all users
    res.json(users);
  }
});

// Handle 404 error for non-existent routes
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, 'assets', '404.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});