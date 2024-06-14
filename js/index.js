import { backendUrl } from '../js/config';
const contproductos = document.querySelector('#contproductos')

const Cardnew = ({ id, title, image, description, price }) => { // se creara la card de productos para la pagina detalles
    return `
    <div class="card" >
    <h3 class="card-title" id=${id}>${title}</h3>
    <img class="card-img" src=${image} alt="">
    <p class="card-desc">${description}</p>
    <strong class="card-price">$ ${price}</strong>
    <button class="btn btn-primary btn-add" data-product='${id}'>Agregar al Carrito</button>
    </div>
        `
}

const getAll = async () => { // esta funcion asicronica deberia comunicarse con la base de datos para obtener todos los productos
    try {
        const response = await fetch(`${backendUrl}/api/productos`)
        if (response.status !== 200) throw new Error('error en la peticion')
        const data = await response.json()
        renderCards(data)
    } catch (error) {
        console.log(error)
    }
}
const renderCards = (array) => {
    contproductos.innerHTML = ''
    array.map(item => {
        contproductos.innerHTML += Cardnew(item)
    })
}

const detallesCard = (id) => { // esta funcion se declarara 
    window.location = `./detalles.html?idproducto=${id}`
}


const addClickDetalles = () => {
    const caard = document.querySelectorAll('.card-title')
    console.log(caard)
    caard.forEach((title) => title.addEventListener('click', (event) => {
        const productID = title.getAttribute('id')
        detallesCard(productID)
    }))
}

const EventButtonCarrito = () => {
    const btns = document.querySelectorAll('.btn-add')
    for (const btn of btns) {
        btn.addEventListener('click', (event) => {
            addtocart(event)
        })
    }
}


const addtocart = (e) => {
    const idproducto = e.target.getAttribute('data-product');
    fetch(`http://localhost:3007/api/productos/carrito/${idproducto}`)
        .then(res => res.json())
        .then(json => {
            let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

            const newProduct = {
                id: json.id,
                title: json.title,
                image: json.image,
                price: json.price,
                quantity: 1
            };
            carrito.push(newProduct);
            localStorage.setItem('carrito', JSON.stringify(carrito));
            mostrarCarrito();
        })
        .catch(err => console.error('Error:', err));
};

const mostrarCarrito = () => {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const carritoContainer = document.querySelector('#carrito-items');
    const carritoTotal = document.querySelector('#carrito-total');

    carritoContainer.innerHTML = '';
    let total = 0;
    if (carrito && carrito.length > 0) {
        carrito.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('card');
            itemDiv.innerHTML = `
                <div class="card-body">
                <h3 class="card-title">${item.title}</h3>
                <img class="card-img" src="${item.image}" alt="">
                <strong class="card-price">$ ${item.price}</strong>
                <button class="btn btn-remove btn-danger" data-id="${item.id}">Eliminar</button>
                </div>
            `;
            carritoContainer.appendChild(itemDiv);
            total += item.price * item.quantity;
        });

        const btneliminar = document.querySelectorAll('.btn-remove');
        btneliminar.forEach(button => {
            button.addEventListener('click', () => {
                const producto_id = button.getAttribute('data-id');
                eliminarProductodelcarrito(producto_id);
            });
        });

        carritoTotal.innerHTML = `<div class="card-total"><b>Total: $ ${total} <b> <br><button class="btn btn-primary btn-comprar">Comprar</button> <button class="btn btn-danger btn-cancelar">Cancelar</button> </div>`;
    } else {
        carritoContainer.innerHTML = '<div class="card-body"><h2>No hay productos en el carrito</h2></div>';
        carritoTotal.innerHTML = '<div class="card-total"><b>Total: $ 0<b> <br> <button class="btn btn-primary btn-comprar">Comprar</button><button class="btn btn-danger btn-cancelar">Cancelar</button> </div>';
    }
};



const eliminarProductodelcarrito = (producto_id) => {
    let delete_carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    producto_id = producto_id.toString();

    delete_carrito = carrito.filter(item => {
        const item_id = item.id.toString();
        if (item_id !== producto_id) {
            return true;
        } else {
            return false;
        }
    });
    localStorage.setItem('carrito', JSON.stringify(delete_carrito));
    mostrarCarrito();
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
            } else {
                alert('Hubo un problema al procesar su compra. Por favor, intente de nuevo.');
            }
        } catch (error) {
            console.error(error);
        }
    });

    btnCancelar.addEventListener('click', () => {
        // Si se da click en cancelar, el producto dentro del carrito se borrará y se redirigirá a la página inicial
        alert('Se ha cancelado la compra');
        localStorage.removeItem('carrito');
        window.location.href = '../src/index.html';
    });
};



document.addEventListener('DOMContentLoaded', async () => {
    await getAll()
    addClickDetalles()
    EventButtonCarrito()
    mostrarCarrito()
    EventoComprar()
})

