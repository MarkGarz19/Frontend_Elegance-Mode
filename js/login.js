document.getElementById('login_Form').addEventListener('submit', async function (event) { // esta funcion asicronica deberia comunicarse con la base de datos para iniciar sesion
    event.preventDefault();

    const formData = { // estos son los datos que seran enviados a la base de datos del formulario
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };
    // CODIGO PARA EJECUTAR LA PAGINA DESPLEGADA
    try {
        const response = await fetch('https://backend-elegance-mode.onrender.com/api/productos/login', { // esta peticion es para iniciar sesion en la base de datos a traves del render
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (!response.ok) { // si peticion para iniciar sesion no es exitosa dara un error
            throw new Error(result.message || 'Error en la solicitud de inicio de sesión');
        }
        // en caso contrario iniciar sesion, dara un alerta y luego redirigira a la pagina principal
        localStorage.setItem('logueado', true);
        alert('Inicio de sesión exitoso');
        window.location.href = 'index.html';
    } catch (error) { // si hay un error en la hora de iniciar sesion daria un alerta
        console.error('Error al iniciar sesión:', error);
        alert('Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.');
    }

    // CODIGO PARA EJECUTAR EN LA BASE DE DATOS LOCAL/* 
    /* try {
         const response = await fetch('http://localhost:3007/api/productos/login', { // esta peticion es para iniciar sesion en la base de datos local
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json'
             },
             body: JSON.stringify(formData)
         });
    
         const result = await response.json();
    
         if (!response.ok) { // si peticion para iniciar sesion no es exitosa dara un error
             throw new Error(result.message || 'Error en la solicitud de inicio de sesión');
         }
    
         localStorage.setItem('logueado', email.value); // se almacena el email del usuario en el local storage, cuando se inicie sesion
         alert('Inicio de sesión exitoso');
         window.location.href = 'index.html';
     } catch (error) {
         console.error('Error al iniciar sesión:', error);
         alert('Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.');
     } */
});
