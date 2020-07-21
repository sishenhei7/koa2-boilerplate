const app = require('./app')
const { port } = require('./config/settings')

app.listen(port, () => console.log(`✅  The server is running at http://localhost:${port}/`))
