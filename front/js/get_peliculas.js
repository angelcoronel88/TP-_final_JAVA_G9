


document.addEventListener('DOMContentLoaded', async() => {

    const options = {
        method: 'GET',
         Headers: {
             'Content-Type': 'application/json'
         }
    };

    const response = await fetch('http://localhost:8080/apimovies/peliculas', options);

    const data = await response.json();

    console.log(data);

    const movies = data;



    const tbody = document.getElementById('bodyTablePeliculas');

    movies.forEach(movie => {
        
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
        <td>${movie.titulo}</td>
        <td>${movie.genero}</td>
        <td>${movie.duracion}</td>
        <td><img width="150px" src="../assets/img/${movie.imagen}" alt="${movie.titulo}"></td>
        </tr>
        `
        tbody.appendChild(tr);
    });

})