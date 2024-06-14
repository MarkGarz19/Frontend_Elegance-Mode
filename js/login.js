document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
    };
    // CODIGO PARA EJECUTAR LA PAGINA DESPLEGADA
    try {
        const response = await fetch('https://backend-elegance-mode.onrender.com/api/productos/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Error en la solicitud de inicio de sesión');
        }

        localStorage.setItem('isLoggedIn', true);
        alert('Inicio de sesión exitoso');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.');
    }

    // CODIGO PARA EJECUTAR EN LA BASE DE DATOS LOCAL
    /*   try {
          const response = await fetch('http://localhost:3007/api/productos/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
          });
  
          const result = await response.json();
  
          if (!response.ok) {
              throw new Error(result.message || 'Error en la solicitud de inicio de sesión');
          }
  
          localStorage.setItem('isLoggedIn', true);
          alert('Inicio de sesión exitoso');
          window.location.href = 'index.html';
      } catch (error) {
          console.error('Error al iniciar sesión:', error);
          alert('Usuario o contraseña incorrectos. Por favor, inténtalo de nuevo.');
      } */
});
