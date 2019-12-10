import app from './app';
import settings from './config/settings';
import logUtil from './core/logger';

// error-handling
app.on('error', (err, ctx) => {
  if (process.env.NODE_ENV !== 'production') {
    console.error('server error', err, ctx);
  } else {
    logUtil.logError(ctx, err, 0);
  }
});

const { port } = settings;

app.listen(port, () => console.log(`✅  The server is running at http://localhost:${port}/`));
