const contdetalles = document.querySelector('#contdetalles');

const getProducto = async () => {
    const url = new URLSearchParams(window.location.search);
    const id = url.get('idproducto');
    try {
        const response = await fetch(`${backendUrl}/api/productos/${id}`);
        const products = await response.json();
        if (products) {
            return products;
        }
    } catch (error) {
        console.log("No se encuentra el producto: " + error);
    }
};

const renderProduct = (products) => {
    const { title, image, description, price, category, id } = products;
    contdetalles.innerHTML = `
        <div class="ContImagen">
            <div> 
                <h2>${title}</h2>
            </div>
            <small>${category}</small>
            <img src="${image}" alt="${title}">
        </div>
        <div class="ContDetalles">
            <p>${description}</p>
            <strong>${price} $</strong>
            <button class="btn btn-primary btn-add" data-product='${id}'>Agregar al Carrito</button>
        </div>
    `;

    // Agregamos el boton de agregar al carrito al event listener
    const addButton = document.querySelector('.btn-add');
    addButton.addEventListener('click', addtocart);
};

const addtocart = (e) => {
    const idproducto = e.target.getAttribute('data-product');
    fetch(`http://localhost:3007/api/productos/carrito/${idproducto}`)
        .then(res => res.json())
        .then(json => {
            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            const producto_icono = carrito.findIndex(product => product.id === json.id);

            if (producto_icono !== -1) { // si el producto existe en el carrito se aumenta la cantidad
                carrito[producto_icono].quantity += 1;
            } else { // en caso de que el producto no exista en el carrito se agrega al carrito
                const newProduct = {
                    id: json.id,
                    title: json.title,
                    image: json.image,
                    price: json.price,
                    quantity: 1
                };
                carrito.push(newProduct);
            }
            localStorage.setItem('carrito', JSON.stringify(carrito));
            mostrarCarrito();
        })
        .catch(err => console.error('Error:', err));
};


const EventoComprar = () => {
    const btnComprar = document.querySelector('.btn-comprar');
    const metodoDePagoSelect = document.querySelector('#metodo-pago');
    const btnCancelar = document.querySelector('.btn-cancelar');

    btnComprar.addEventListener('click', async () => {
        // si se da click en el botón de comprar, se hace la petición a la API de Paypal para realizar la compra
        const metodoDePago = metodoDePagoSelect.value;
        try {
            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
            let total = carrito.reduce((sum, item) => sum + item.price * item.quantity, 0);

            const compraData = {
                items: carrito,
                total: total,
                metodoDePago: metodoDePago
            };

            const response = await fetch('http://localhost:3007/api/productos/compra', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(compraData)
            });

            const data = await response.json();
            if (data.redirectUrl) {
                window.location.href = data.redirectUrl;
            }
        } catch (error) {
            console.log('Error al realizar la compra:', error);
        }
    });

    btnCancelar.addEventListener('click', () => {
        alert('Se ha cancelado la compra');
        window.location.href = 'http://localhost:3007/frontend/index.html';
    });
};


// Se inicializa el producto y carga el producto al carrito
document.addEventListener('DOMContentLoaded', async () => {
    const product = await getProducto();
    renderProduct(product);
    mostrarCarrito();
    EventoComprar();
});
