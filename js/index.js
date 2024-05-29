const $ = document;
const contproductos = $.querySelector('#contproductos')

const Cardnew = ({ title, image, description, price }) => {
    return `
    <div class="card">
    <h3 class="card-title">${title}</h3>
    <img class="card-img" src=${image} alt="">
    <p class="card-desc">${description}</p>
    <strong class="card-price">$ ${price}</strong>
    <button class="btn btn-primary">Agregar al Carrito</button>
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

getAll()