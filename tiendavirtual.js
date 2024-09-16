const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'tiendavirtual.html')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'tiendavirtual.html'));
  });

let productos = [
  { id: 1, nombre: 'Laptop', precio: 1200 },
  { id: 2, nombre: 'Teléfono', precio: 800 },
  { id: 3, nombre: 'Tablet', precio: 500 }
];

app.get('/api/productos', (req, res) => {
  res.json(productos);
});

app.post('/api/productos', (req, res) => {
  const { nombre, precio } = req.body;
  const nuevoProducto = { id: productos.length + 1, nombre, precio };
  productos.push(nuevoProducto);
  res.json({ message: 'Producto agregado correctamente', producto: nuevoProducto });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
