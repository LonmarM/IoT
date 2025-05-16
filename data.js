const express = require('express');
const pool = require('./db');
const cors = require('cors');

const app = express();
const PORT = 5432;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Servir tu frontend (HTML, JS, etc.)

// Ruta para recibir datos del ESP y guardar en PostgreSQL
app.post('/api/zonas', async (req, res) => {
  const { id, estado } = req.body;

  if (!id || !estado) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  try {
    await pool.query(`
      UPDATE zonas
      SET estado = $1, hora_ocupacion = NOW()
      WHERE id = $2
    `, [estado, id]);

    res.json({ mensaje: 'Zona actualizada' });
  } catch (error) {
    console.error('Error al guardar datos:', error);
    res.status(500).json({ error: 'Error al guardar datos' });
  }
});

// Ruta para obtener estados de las zonas
app.get('/api/zonas', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, estado, hora_ocupacion
      FROM zonas
      ORDER BY id
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al consultar zonas:', error);
    res.status(500).json({ error: 'Error al consultar zonas' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
