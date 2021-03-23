const express = require('express');

  
  
const app = express();



app.get('/',  (req, res) => {
    res.send('hello world Thank you for calling me Jhanker Vi is grade')
  })

app.listen(4000, () => console.log('Listening to port 4000'))
