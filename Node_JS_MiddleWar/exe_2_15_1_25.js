const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

// http://localhost:3000/admin/?user=admin

/**
 * Middleware to log the HTTP method, request URL, and the current date and time to the console.
 * The date and time are logged in the format: HH:MM:SS DD-MM-YYYY.
 * After logging, it calls the next middleware in the stack.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const logForResponseURLTime_Middleware = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const hours = new Date().getHours();
    const min = new Date().getMinutes();
    const sec = new Date().getSeconds();
    const year= new Date().getFullYear();
    const month = new Date().getUTCMonth()+1;
    const day= new Date().getUTCDate();
    console.log(`${method} ${url} ${hours}:${min}:${sec} ${day}-${month}-${year}`);
    next();
   };

/**
 * Middleware to check if a user is logged in.
 * If no user is logged in, it sends a 400 Bad Request response.
 * If the user is 'admin', it logs a message to the console and calls the next middleware function.
 * Otherwise, it sends a 403 Forbidden response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 */
const authMiddleware = (req, res, next) => {

    const currentUser = req.query.user;

    if (!currentUser)
        return res.status(400).send({ message: "User not provided" }); 

    
    else {
      if (currentUser === 'admin') 
       console.log({message: "You are admin"});
    
      else 
      res.status(403).send({message: "Access denied"});
      
  }
    next();
  }

app.use(logForResponseURLTime_Middleware);

app.get('/', (req, res) => {
    res.send( "<p>Welcome to the home page</p>" );
});

app.get('/admin', authMiddleware, (req, res) => {
    res.send({ message: "Welcome to the admin page" });
});
app.get('/public',(req, res) => {
    res.send({ message: "This is a public page" });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});