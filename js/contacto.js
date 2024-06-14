document.getElementById('contactForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const formData = {
        nombre: document.getElementById('nombre').value,
        apellidos: document.getElementById('apellidos').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('prefijo').value + document.getElementById('telefono').value,
        comentario: document.getElementById('comentario').value,
    };

    try {
        // Enviara el formulario de la pagina desplegada a la base de datos
        const response = await fetch('https://backend-elegance-mode.onrender.com/api/productos/mensajes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        // Enviara el formulario a la base de datos local
        /*         const response = await fetch('http://localhost:3007/api/productos/mensajes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                }); */

        // Enviara el formulario a la api de formspree para que le envie el email predeterminado
        const formspreeResponse = await fetch('https://formspree.io/f/xzbnnpzk', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const db_local = await response.json();
        const forms_preedb = await formspreeResponse.json();

        // Aqui se manejara las respuestas de ambas apis en caso de error o exito
        if (db_local.error && forms_preedb.error) {
            alert(forms_preedb.message);
            alert(db_local.message);
        } else {
            alert('Mensaje enviado exitosamente');
            window.location.href = '../src/contacto.html';
        }
    } catch (error) {
        console.log('Error al enviar el mensaje:', error);
    }
});
