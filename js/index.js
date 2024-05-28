const $ = document;
const contproductos = $.querySelector('#contproductos')

const Cardnew = ({ title, image, description, price }) => {
    return `
                <div class="card">
                    <h3 class="card-title">${title}</h3>
                    <img class="card-img" src="${image}" alt="">
                    <p class="card-desc">${description}</p>
                    <strong class="card-price">$ ${price}</strong>
                    <button class="btn btn-primary">agregar al carrito</button>
                </div>
        `
}

const renderCards = (array) => {
    contproductos.innerHTML = ''
    array.map(item => {
        contproductos.innerHTML += Cardnew(item)
    })
}

fetch('http://localhost:3007/api/productos')
    .then(res => res.json())
    .then((data) => console.log(data))
    .catch(err => console.log(err))
