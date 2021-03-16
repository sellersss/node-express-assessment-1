# Broken App Issues
- No 404 error handler
  - No (Express) error handler in general
- No npm package.json
- Missing `app.use(express.json())`
- Very slow without `Promise.All()` implementation when mapping over `req.body.developers`
- Wrong variable declarations (constant use of `var` and incorrect usage of `let`)
    ```js
    const express = require('express');
    let axios = require('axios'); // let should be a constant variable
    var app = express(); // var should be a constant variable
    ```
    to:

    ```js
    const express = require('express');
    const axios = require('axios');
    const app = express();
    ```
- `server.js` was not necessary but allows for better future updates if said application was standalone