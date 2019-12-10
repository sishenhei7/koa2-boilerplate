import app from './app';
import settings from './config/settings';

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

const { port } = settings;

app.listen(port, () => console.log(`✅  The server is running at http://localhost:${port}/`));
