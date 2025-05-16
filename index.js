const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5432;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Servir tu frontend

// Todas las zonas inician en estado "libre"
let zonas = [
  { id: 1, estado: 'libre', hora_ocupacion: null },
  { id: 2, estado: 'libre', hora_ocupacion: null },
  { id: 3, estado: 'libre', hora_ocupacion: null },
  { id: 4, estado: 'libre', hora_ocupacion: null },
  { id: 5, estado: 'libre', hora_ocupacion: null },
  { id: 6, estado: 'libre', hora_ocupacion: null }
];

// Ruta para actualizar el estado de una zona
app.post('/api/zonas', (req, res) => {
  const { id, estado } = req.body;

  if (!id || !estado) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  const zona = zonas.find(z => z.id === id);
  if (zona) {
    zona.estado = estado;
    zona.hora_ocupacion = new Date();
    return res.json({ mensaje: 'Zona actualizada', zona });
  } else {
    return res.status(404).json({ error: 'Zona no encontrada' });
  }
});

// Ruta para consultar el estado de todas las zonas
app.get('/api/zonas', (req, res) => {
  res.json(zonas);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
