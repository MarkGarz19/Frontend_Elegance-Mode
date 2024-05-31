const contdetalles = document.querySelector('#contdetalles')
const getProducto = async () => {
    const url = new URLSearchParams(window.location.search);
    const id = url.get('idproducto');
    try {
        const response = await fetch(`http://localhost:3007/api/productos/${id}`)
        const products = await response.json()
        if (products) {
            return products
        }
    } catch (error) {
        console.log("No se encuentra el producto" + error)
    }
}

const renderProduct = (products) => {
    const { title, image, description, price, category } = products
    contdetalles.innerHTML = `
            <div>
                <div>
                    <h2>${title}</h2>
                    <small>${category}</small>
                    <img src="${image}" alt="${title}">
                </div>
                <div>
                    <p>${description}</p>
                    <strong>${price} $</strong>
                </div>
            </div>
    `
}

document.addEventListener('DOMContentLoaded', async () => {
    const products = await getProducto()
    console.log(products)
    renderProduct(products)
})

