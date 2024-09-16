const carrito = [];

async function obtenerProductos() {
    const res = await fetch('/api/productos');
    const productos = await res.json();
    mostrarProductos(productos);
}


function mostrarProductos(productos) {
    const productosDiv = document.getElementById('productos');
    productosDiv.innerHTML = ''; 
    productos.forEach((producto) => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');
        productoDiv.innerHTML = `
            <p>${producto.nombre} - $${producto.precio}</p>
            <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        `;
        productosDiv.appendChild(productoDiv);
    });
}

function agregarAlCarrito(idProducto) {
    fetch('/api/productos')
        .then(res => res.json())
        .then(productos => {
            const producto = productos.find(p => p.id === idProducto);
            carrito.push(producto);
            mostrarCarrito();
        });
}


function mostrarCarrito() {
    const carritoDiv = document.getElementById('carrito');
    carritoDiv.innerHTML = ''; 
    carrito.forEach((producto) => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto');
        productoDiv.innerHTML = `
            <p>${producto.nombre} - $${producto.precio}</p>
        `;
        carritoDiv.appendChild(productoDiv);
    });
}


document.getElementById('agregarProductoBtn').addEventListener('click', async () => {
    const nombreProducto = document.getElementById('nombreProducto').value;
    const precioProducto = document.getElementById('precioProducto').value;
    
    if (nombreProducto && precioProducto) {
        const producto = {
            nombre: nombreProducto,
            precio: parseFloat(precioProducto)
        };
        
        await fetch('/api/productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });

        obtenerProductos(); 
    }
});


obtenerProductos();
