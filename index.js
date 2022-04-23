// config .env
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

const { app } = require('./src/server');
const PORT = process.env.PORT ?? 3000;

app.listen(PORT, err => {
  if (err) console.error(err);
  console.log(`Server works on port: ${PORT}`);
});
