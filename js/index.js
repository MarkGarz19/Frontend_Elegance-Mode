const contproductos = document.querySelector('#contproductos')
const Cardnew = ({ id, title, image, description, price }) => { // se creara la card de productos para la pagina detalles con los datos
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

// CODIGO PARA EJECUTAR LA PAGINA DESPLEGADA
const getAll = async () => { // esta funcion asicronica deberia comunicarse con la base de datos para obtener todos los productos
    try {
        const response = await fetch(`https://backend-elegance-mode.onrender.com/api/productos`) // esta peticion es para obtener todos los productos de la base de datos a traves del render
        if (response.status !== 200) throw new Error('error en la peticion') // si la peticion no es exitosa daria un error
        const data = await response.json() // se obtiene el producto y se convierte en un objeto JSON
        renderCards(data) // luego se lo mandara a la funcion para renderizar la card
    } catch (error) {
        console.log(error)
    }
}
const renderCards = (array) => { // esta funcion renderizara la card a traves de un array
    contproductos.innerHTML = '' // esto es para limpiar la pagina
    array.map(item => { // se recorren todos los objetos del array
        contproductos.innerHTML += Cardnew(item)
    })
}

const detallesCard = (id) => { // esta funcion se declarara 
    window.location = `./detalles.html?idproducto=${id}` // este es el link para el detalle del producto que se redireccione a traves de la id
}


const addClickDetalles = () => { // esta funcion es para ver los detalles de los productos
    const caard = document.querySelectorAll('.card-title') // esta variable es para ver los detalles de los productos a traves del titulo si se da click
    caard.forEach((title) => title.addEventListener('click', (event) => { // este evento es para ver los detalles de los productos
        const productID = title.getAttribute('id') // se obtiene el id del producto
        detallesCard(productID) // se mandara a la funcion para ver los detalles de los productos
    }))
}

const EventoBotonCarrito = () => { //esta funcion es para los botones
    const btns = document.querySelectorAll('.btn-add') // esta variable es para agregar los productos al carrito a traves del boton
    for (const btn of btns) { // a traves del for se recorren todos los botones para agregar el producto al carrito
        btn.addEventListener('click', (event) => {
            agregarcarrito(event)
        })
    }
}


const agregarcarrito = (e) => { // esta funcion es para agregar los productos al carrito
    const idproducto = e.target.getAttribute('data-product'); // se obtiene el id del producto a traves del data-product
    fetch(`https://backend-elegance-mode.onrender.com/api/productos/carrito/${idproducto}`) // esta peticion es para agregar el producto al carrito a la base de datos a traves del render
        .then(res => res.json())
        .then(json => {
            let carrito = JSON.parse(localStorage.getItem('carrito')) || []; // se guardara el carrito en el local storage o se inicializa vacio

            const newProduct = { // se crea un nuevo objeto con los datos del producto para agregarlo al carrito
                id: json.id,
                title: json.title,
                image: json.image,
                price: json.price,
                quantity: 1
            };
            carrito.push(newProduct); // se agrega el nuevo producto al carrito
            localStorage.setItem('carrito', JSON.stringify(carrito)); // se almacena el producto del carrito en el local storage
            mostrarCarrito(); // se mostrara en la pagina carrito
        })
        .catch(err => console.error('Error:', err));
};

const mostrarCarrito = () => { // esta funcion es para mostrar el carrito en la pagina carrito
    let carrito = JSON.parse(localStorage.getItem('carrito')) || []; // recuperara el producto del carrito en el local storage
    const carritoContainer = document.querySelector('#carrito-items'); // se obtiene el contenedor del carrito 
    const carritoTotal = document.querySelector('#carrito-total'); // se obtiene el total del carrito

    carritoContainer.innerHTML = ''; // esto es para limpiar la pagina
    let total = 0; // definimos un total para el carrito que sera 0
    if (carrito && carrito.length > 0) {
        carrito.forEach(item => { // se recorren todos los objetos del carrito 
            const itemDiv = document.createElement('div'); // se creara el item del carrito en un div
            itemDiv.classList.add('card'); // se agregar una card al div
            itemDiv.innerHTML = `
                <div class="card-body">
                <h3 class="card-title">${item.title}</h3>
                <img class="card-img" src="${item.image}" alt="">
                <strong class="card-price">$ ${item.price}</strong>
                <button class="btn btn-remove btn-danger" data-id="${item.id}">Eliminar</button>
                </div>
            `;// se creara la card que se mostrara en ese div
            carritoContainer.appendChild(itemDiv); // se insertara el div en el contenedor del carrito
            total += item.price * item.quantity; // se actualiza el total del carrito
        });

        const btneliminar = document.querySelectorAll('.btn-remove'); // se obtienen todos los botones de eliminar del carrito
        btneliminar.forEach(button => {// recorre todos los botones de eliminar del carrito
            button.addEventListener('click', () => { // este evento es para eliminar el producto del carrito
                const producto_id = button.getAttribute('data-id'); // se obtiene el id del producto a traves del data-id
                eliminarProductodelcarrito(producto_id); // se mandara a la funcion para eliminar el producto del carrito
            });
        });

        carritoTotal.innerHTML = `<div class="card-total"><b>Total: $ ${total} <b> <br><button class="btn btn-primary btn-comprar">Comprar</button> <button class="btn btn-danger btn-cancelar">Cancelar</button> </div>`;
    } else {
        carritoContainer.innerHTML = '<div class="card-body"><h2>No hay productos en el carrito</h2></div>';
        carritoTotal.innerHTML = '<div class="card-total"><b>Total: $ 0<b> <br> <button class="btn btn-primary btn-comprar">Comprar</button><button class="btn btn-danger btn-cancelar">Cancelar</button> </div>';
    }
};



const eliminarProductodelcarrito = (producto_id) => { // esta funcion es para eliminar el producto del carrito a traves de la id
    let carrito = JSON.parse(localStorage.getItem('carrito')); // recuperara el producto del carrito en el local storage para eliminarlo

    producto_id = producto_id.toString(); // se convierte el id a string

    const new_carrito = carrito.filter(item => { // se filtra el carrito
        const id_item = item.id.toString();
        return id_item !== producto_id;
    })
    mostrarCarrito(new_carrito);// se mostrara el nuevo carrito
};


const EventComprar = () => { // esta funcion es para el evento de comprar
    const btnComprar = document.querySelector('.btn-comprar'); // se obtiene el botón de comprar
    const metodoDePagoSelect = document.querySelector('#metodo-pago'); // se obtiene el metodo de pago
    const btnCancelar = document.querySelector('.btn-cancelar'); // se obtiene el botón de cancelar

    btnComprar.addEventListener('click', async () => { // este funcion es para el evento de comprar
        // si se da click en el botón de comprar, se hace la petición a la API de Paypal para realizar la compra
        const metodoDePago = metodoDePagoSelect.value; // se obtiene el dato del metodo de pago
        try {
            let carrito = JSON.parse(localStorage.getItem('carrito')) || []; // se obtiene el producto del carrito en el local storage
            let total = carrito.reduce((sum, item) => sum + item.price * item.quantity, 0); // se calcula el total del carrito por el precio y la cantidad

            const compraData = { // se crea el objeto de la compra para enviar a la base de datos
                items: carrito,
                total: total,
                metodoDePago: metodoDePago,
                Fecha: new Date()
            };

            const response = await fetch('https://backend-elegance-mode.onrender.com/api/productos/compra', { // esta peticion es para registrar la compra en la base de datos a traves del render
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(compraData)
            });

            const data = await response.json(); // se obtiene el objecto de la compra y se convierte en un objeto JSON
            if (data.redirectUrl) { // si la url de redireccion es verdadera
                window.location.href = data.redirectUrl; // se redirige a la pagina de paypal para realizar la compra
            } else { // en caso de que la url de redireccion sea falsa
                alert('Hubo un problema al procesar su compra. Por favor, intente de nuevo.'); // mostrara un alerta
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


// CODIGO PARA EJECUTAR EN LA BASE DE DATOS LOCAL

/* const getAll = async () => { // esta funcion asicronica deberia comunicarse con la base de datos para obtener todos los productos
    try {
        const response = await fetch(`http://localhost:3007/api/productos`)
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

const EventoBotonCarrito = () => {
    const btns = document.querySelectorAll('.btn-add')
    for (const btn of btns) {
        btn.addEventListener('click', (event) => {
            agregarcarrito(event)
        })
    }
}


const agregarcarrito = (e) => {
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


const EventComprar = () => {
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
}; */




document.addEventListener('DOMContentLoaded', async () => {
    await getAll()
    addClickDetalles()
    EventoBotonCarrito()
    mostrarCarrito()
    EventComprar()
})

