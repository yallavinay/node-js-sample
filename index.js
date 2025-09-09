var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', function(request, response) {
  response.send('Hello World!')
})

app.get('/login', (req, res) => {
  res.send(`
    <form method="POST" action="/login">
      <input name="email" placeholder="email"/><br/>
      <input name="password" type="password" placeholder="password"/><br/>
      <button type="submit">Login</button>
    </form>`);
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const DEMO_EMAIL = process.env.DEMO_EMAIL;
  const DEMO_PASSWORD = process.env.DEMO_PASSWORD;
  if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
    return res.send('Login successful — welcome!');
  }
  return res.status(401).send('Invalid credentials');
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
