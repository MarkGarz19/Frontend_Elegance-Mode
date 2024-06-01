const contproductos = document.querySelector('#contproductos')

const Cardnew = ({ id, title, image, description, price }) => {
    return `
    <div class="card" >
    <h3 class="card-title" id=${id}>${title}</h3>
    <img class="card-img" src=${image} alt="">
    <p class="card-desc">${description}</p>
    <strong class="card-price">$ ${price}</strong>
    <button class="btn btn-primary btn-add" data-product='product-${id}'>Agregar al Carrito</button>
    </div>
        `
}

const getAll = async () => {
    try {
        const response = await fetch('http://localhost:3007/api/productos')
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

const detallesCard = (id) => {
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
    let idproducto = e.target.attributes['data-product'].value
    idproducto.slice(8)
    fetch(`http://localhost:3007/api/productos/${idproducto}`)
        .then(res => res.json())
        .then(json => {
            let carrito = JSON.parse(localStorage.getItem('carrito'))
            carrito.push(json)
            localStorage.setItem('carrito', JSON.stringify(carrito))
        })
        .catch(err => console.log(err))
}



document.addEventListener('DOMContentLoaded', async () => {
    await getAll()
    addClickDetalles()
    EventButtonCarrito()
})

