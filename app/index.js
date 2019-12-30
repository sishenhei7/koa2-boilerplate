import app from './app';
import settings from './config/settings';

const { port } = settings;

app.listen(port, () => console.log(`✅  The server is running at http://localhost:${port}/`));
