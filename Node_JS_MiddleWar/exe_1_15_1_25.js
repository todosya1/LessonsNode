const express = require('express');

const app = express();
const port = process.env.PORT || 3000;


/**
 * Logs a message to the console containing the string "Hello 1"
 * and then calls the next middleware function in the stack.
 */
const customMiddleware1 = (req, res, next) => {
    console.log(`Hello 1`);
    next();
   };
/**
 * Logs a message to the console containing the string "Hello 2"
 * and then calls the next middleware function in the stack.
 */

const customMiddleware2 = (req, res, next) => {
    console.log(`Hello 2`);
    next();
   };

app.use(customMiddleware1, customMiddleware2);

app.get('/users', (req, res) => {
    res.send('<h1> Example user page ❤️ </h1>');
  })

app.get('/users*', (req, res) => {
    res.send('<h1> Some other user page 😐 </h1>');
  })



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});