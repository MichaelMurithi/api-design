import * as dotnev from 'dotenv';
import app from './server';

dotnev.config();

app.listen(3001, () => {
    console.log('Server is listening on http://localhost:3001');
});