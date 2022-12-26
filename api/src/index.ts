import * as dotnev from 'dotenv';
import config from './config';
import app from './server';

dotnev.config();

app.listen(config.port, () => {
    console.log(`Server is listening on http://localhost:${config.port}`);
});