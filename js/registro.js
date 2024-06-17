document.getElementById('register_Form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const formData = { // estos son los datos que seran enviados a la base de datos del formulario
        nombre: document.getElementById('nombre').value,
        apellidos: document.getElementById('apellidos').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };
    // CODIGO PARA EJECUTAR LA PAGINA DESPLEGADA
    try {
        const response = await fetch('https://backend-elegance-mode.onrender.com/api/productos/register', { // esta peticion es para registrar el usuario en la base de datos a traves del render
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (data.error) {
            alert(data.message);
        } else if (data.message == "El usuario ya registrado") { // esta condicion es para saber si el usuario ya registrado, entonces dara un alerta
            alert("El usuario ya esta registrado. Por favor intentelo de otra manera.");
        } else { // en caso contrario registrar el usuario, dara un alerta y luego redirigira a la pagina de login
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