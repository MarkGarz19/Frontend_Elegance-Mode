document.getElementById('registerForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const formData = {
        nombre: document.getElementById('nombre').value,
        apellidos: document.getElementById('apellidos').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };

    try {
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
        } else {
            alert('Usuario registrado exitosamente');
            window.location.href = '../src/login.html';
        }
    } catch (error) {
        console.log('Error al registrar usuario:', error);
    }
});