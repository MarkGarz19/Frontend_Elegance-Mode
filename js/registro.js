document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const formData = {
        nombre: document.getElementById('nombre').value,
        apellidos: document.getElementById('apellidos').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };
    // CODIGO PARA EJECUTAR LA PAGINA DESPLEGADA
    try {
        const response = await fetch('https://backend-elegance-mode.onrender.com/api/productos/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (data.error) {
            alert(data.message);
        } else if (data.message == "El usuario ya existe") {
            alert("El usuario ya esta registrado. Por favor intentelo de otra manera.");
        } else {
            alert('Usuario registrado exitosamente');
            window.location.href = '../src/login.html';
        }
    } catch (error) {
        console.log('Error al registrar usuario:', error);
    }

    // CODIGO PARA EJECUTAR LA PAGINA EN LA BASE DE DATOS LOCAL
 /*    try {
        const response = await fetch('http://localhost:3007/api/productos/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (data.error) {
            alert(data.message);
        } else if (data.message == "El usuario ya existe") {
            alert("El usuario ya esta registrado. Por favor intentelo de otra manera.");
        } else {
            alert('Usuario registrado exitosamente');
            window.location.href = '../src/login.html';
        }
    } catch (error) {
        console.log('Error al registrar usuario:', error);
    } */
});