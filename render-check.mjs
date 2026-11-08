import fs from 'node:fs';
import ejs from 'ejs';

const template = fs.readFileSync('./views/auth/patientDash.ejs', 'utf8');
const html = ejs.render(template);

if (!html.includes('Patient dashboard')) {
  throw new Error('Dashboard template did not render the expected content.');
}

console.log('dashboard rendered successfully');
