### Conceptual Exercise

Answer the following questions below:

- What are some ways of managing asynchronous code in JavaScript?

  There are two ways JavaScript manages asynchronous code: callbacks and promises. 
  1. Asynchronous callbacks are functions that re specified as arguments when calling a function that will start executing code in the background. When the background code finishes running, it calls the callback function to let you know the work is done, or to let you know something else has happened.
  2. Promises are a newer method of handling asynchronous code in JavaScript. Because JS is a single threaded language, two functions cannot run at the same time; they have to run one after another. Promises use the `async` and `await` keywords to let JS know which processes to run first and last, but only until the first has been run completely.

- What is a Promise?

  A promise represents the eventual completion or failure of an asynchronous operation and its resulting value.

- What are the differences between an async function and a regular function?

  Asynchronous functions allow for the execution of multiple operations; the operations don't have to wait for one another. Synchronous, or regular, functions are executed in a sequence; each operation waits for the previous operation to finish before executing the next.

- What is the difference between Node.js and Express.js?

  Express.js is a framework based on Node.js for which is used in created web apps, wheareas Node.JS is backend runtime environment build on JavaScript.

- What is the error-first callback pattern?

  There are two rules for defining an error-first callback:
  1. **The first argument of the callback is reserved for an error object.**

      If an error occurred, it will be returned in the first `err` argument.
  2. **The second argument of the callback is reserved for any successful response data.** 

      If no error occurred, the `err` argument will be set to null and any successful data will be returned in the second argument.
      

- What is middleware?

  Middleware has access to the `request` and `response` objects of a function, as well as the `next` function. They typically perform tasks such as executing certain code, making changes to the `request` or `response` objects, ending the request-response cycle, or calling the next middleware in the stack.

- What does the `next` function do?

  The `next` function in the Express router which executes the middleware succeeding the current stack's middleware.

- What does `RETURNING` do in SQL? When would you use it?

  The `RETURNING` clause allows you to retrieve values of columns that were modified by an insert, delete, or update. Without `RETURNING`, you would have to run a `SELECT` statement after the DML statement is completed in order to obtain the values of the changed columns.

- What are some issues with the following code? (consider all aspects: performance, structure, naming, etc)

  The performance of this code would suffer due to the multiple await calls, we would have to wait for one API call to be completed before it can move on to the next. Instead of returning an array of the requested values from the API, a `Promise.all()` return value would be quicker. You can also parallel request which would call each request at the same time. You could also rename the first API call to response, deleting the last two, and simply pass a single variable through the function -- something like `name` and pass it into `$.getJSON('https://api.github.com/users/${name}')`.
```js
async function getUsers() {
  const elie = await $.getJSON('https://api.github.com/users/elie');
  const joel = await $.getJSON('https://api.github.com/users/joelburton');
  const matt = await $.getJSON('https://api.github.com/users/mmmaaatttttt');

  return [elie, matt, joel];
}
```