
document.addEventListener('DOMContentLoaded', async () => {
    
    formNuevaPelicula = document.getElementById('formNuevaPelicula');

    formNuevaPelicula.addEventListener('submit', async (event) => {

        
        // Esto evita que el formulario se envíe de la manera tradicional y recargue la página.
        event.preventDefault();

        // Aquí, usamos FormData para extraer los valores de los campos del formulario.
        const formData = new FormData(formNuevaPelicula);

        //obtengo los valores de los inputs
        const titulo = formData.get('titulo');
        const genero = formData.get('genero');
        const duracion = formData.get('duracion');
        const imagen = formData.get('imagen');

        // Validar los datos del formulario:
        // Verificamos que todos los campos obligatorios tienen un valor.
        // Si alguno está vacío, mostramos una alerta y detenemos el procesamiento.
        if (titulo === '' || genero === '' || duracion === '' || imagen === '') {
            alert('Todos los campos son obligatorios');
            return;
        }

        // Preparar los datos para el envío:
        // levanto solo el nombre del file para enviarlo a la api
        // Esta línea simplemente extrae el nombre del archivo seleccionado por el usuario 
        // en el campo de tipo file del formulario y lo guarda en la variable 
        // imageName para su uso posterior en la solicitud HTTP.
        const imageName = imagen.name;
      
        //configuracion de options, que contiene los detalles de la solicitud POST,
        // incluyendo el método, las cabeceras y el cuerpo. 
        // El cuerpo es un objeto JSON que se convierte en una cadena con JSON.stringify.
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                titulo: titulo,
                genero: genero,
                duracion: duracion,
                imagen: imageName
            })
        };

        // Realizo la peticion fetch a la api para agregar una pelicula
        const response = await fetch('http://localhost:8080/apimovies/peliculas', options);
        // Utilizamos fetch para enviar la solicitud al servidor y esperamos la respuesta. 
        // Luego, convertimos la respuesta a JSON.
        //obtengo la respuesta
        const data = await response.json();


        // Manejar la respuesta del servidor:
        // si la respuesta es correcta, muestro un mensaje de exito y limpio los inputs del formulario
        // si el codigo es 201, la pelicula se agrego correctamente
        if (response.status === 201) {
            alert('Pelicula agregada correctamente');
            formNuevaPelicula.reset();
            // que se recargue la pagina para ver la pelicula agregada
            location.reload();
        } else {
            alert('Error al agregar la pelicula');
        }
       
    });

});
  