const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5432;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Servir tu frontend (HTML, JS, etc.)

// Estructura en memoria para simular las zonas
let zonas = [
  { id: 1, estado: 'ocupada', hora_ocupacion: new Date() },
  { id: 2, estado: 'libre', hora_ocupacion: new Date() },
  { id: 3, estado: 'ocupada', hora_ocupacion: new Date() },
  { id: 4, estado: 'libre', hora_ocupacion: new Date() },
  { id: 5, estado: 'ocupada', hora_ocupacion: new Date() },
  { id: 6, estado: 'libre', hora_ocupacion: new Date() }
];

// Ruta para recibir datos y simular actualización en memoria (sin guardar en la base de datos)
app.post('/api/zonas', async (req, res) => {
  const { id, estado } = req.body;

  if (!id || !estado) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }

  try {
    // Buscar la zona y actualizar su estado en la memoria
    const zona = zonas.find(z => z.id === id);
    if (zona) {
      zona.estado = estado;
      zona.hora_ocupacion = new Date(); // Actualizamos la hora de ocupación
      res.json({ mensaje: 'Zona actualizada en memoria', zona });
    } else {
      res.status(404).json({ error: 'Zona no encontrada' });
    }
  } catch (error) {
    console.error('Error al actualizar los datos en memoria:', error);
    res.status(500).json({ error: 'Error al actualizar los datos en memoria' });
  }
});

// Ruta para obtener los estados de las zonas
app.get('/api/zonas', async (req, res) => {
  try {
    // Devolver el estado actual de las zonas desde la memoria
    res.json(zonas);
  } catch (error) {
    console.error('Error al consultar zonas en memoria:', error);
    res.status(500).json({ error: 'Error al consultar zonas en memoria' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
