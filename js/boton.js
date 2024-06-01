document.addEventListener('DOMContentLoaded', function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn) {
        // Si el usuario ha iniciado sesión, mostrar el botón de "Cerrar Sesión"
        document.getElementById('loginLink').style.display = 'none';
        document.getElementById('logoutButton').style.display = 'inline-block';
        document.getElementById('carrito').style.display = 'inline-block';
    } else {
        // Si el usuario no ha iniciado sesión, mostrar el botón de "Iniciar Sesión"
        document.getElementById('loginLink').style.display = 'inline-block';
        document.getElementById('logoutButton').style.display = 'none';
        document.getElementById('carrito').style.display = 'none';
    }
});

document.getElementById('logoutButton').addEventListener('click', function () {
    localStorage.removeItem('isLoggedIn');

    window.location.href = '../src/index.html';
});
