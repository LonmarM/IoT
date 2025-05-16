const { Pool } = require('pg');

// Cambia estos valores por los de tu base de datos
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'IoTss',
  password: 'postgres',
  port: 5432
});

module.exports = pool;
