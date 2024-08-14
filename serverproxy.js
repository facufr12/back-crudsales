import express from 'express';
import fetch from 'node-fetch'; // Usar la sintaxis de importación de ES Modules

const app = express();
const port = process.env.PORT || 3000; // Usa el puerto proporcionado por Render o 3000 localmente

// URL de tu Google Apps Script (reemplaza con la URL de tu script)
const apiUrl = "https://script.google.com/macros/s/AKfycby3orhI-nzJps1yfkDe45bz6Le5VU5bdDxAKdbK-bwRIu2E8uprlbgW1hHtFZ3WdzoZig/exec";

// Configurar CORS para permitir acceso desde cualquier origen
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get("/data", async (req, res) => {
  try {
    // Realizar la solicitud a la API del Google Apps Script
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error(`Error fetching data: ${response.status} ${response.statusText}`);
      res.status(500).send("Error al obtener datos");
      return;
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error al obtener datos");
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
