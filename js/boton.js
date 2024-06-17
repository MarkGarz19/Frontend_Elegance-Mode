document.addEventListener('DOMContentLoaded', function () { // esta funcion es para mostrar el botón de "Iniciar Sesión" y el botón de "Carrito" dependiendo de si el usuario ha iniciado sesión o no
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn) {
        document.getElementById('loginLink').style.display = 'none'; // Si el usuario  ha iniciado sesión, no mostrara el botón de "Iniciar Sesión"
        document.getElementById('logoutButton').style.display = 'inline-block'; // Si el usuario ha iniciado sesión, mostrar el botón de "Cerrar Sesión"
        document.getElementById('carrito').style.display = 'inline-block';// Si el usuario ha iniciado sesión, mostrar el botón de "Carrito"
    } else {

        document.getElementById('loginLink').style.display = 'inline-block';// Si el usuario no ha iniciado sesión, mostrara el botón de "Iniciar Sesión"
        document.getElementById('logoutButton').style.display = 'none';// Si el usuario no ha iniciado sesión, no mostrara el botón de "Cerrar Sesión"
        document.getElementById('carrito').style.display = 'none';// Si el usuario no ha iniciado sesión, no mostrara el botón de "Carrito"
    }
});

document.getElementById('logoutButton').addEventListener('click', function () { // esta funcion es para cerrar la sesión del usuario
    localStorage.removeItem('isLoggedIn'); // se elimina la sesion del usuario en el local storage

    window.location.href = '../src/index.html'; // se redirige a la pagina principal si el usuario ha cerrado la sesion
});
