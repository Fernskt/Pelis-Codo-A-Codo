document.addEventListener("DOMContentLoaded", function () {
    const API_URL = "https://api.themoviedb.org/3";
    const API_KEY = "f5a09a058db7dc2f36999cfad6668b60";
    const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
    const spinnerContainer = document.querySelector('.spinner-container');
    
    // Mostrar el spinner antes de hacer la solicitud
    spinnerContainer.style.display = 'flex';

    //Obtener parámetro de la URL
    const getQueryParam = (param) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
      };
    //Guardar parametro de la URL en la variable genreID
      const genreId = getQueryParam("id");
      
    //Función para traer la lista de géneros de las pelis
      const fetchGenre = async () =>{
        const response = await fetch(`${API_URL}/genre/movie/list?api_key=${API_KEY}&language=es-MX`);
        const data = await response.json();
        const generos = data.genres;
        
        displayGenres(generos);//Se llama a la funcion displayGenres
      
      }
    fetchGenre();//se llama a la api

    //Función para recorrer los Géneros y mostrarlos en el NavBar
      const displayGenres = (generos) =>{

        //Se filtran algunos géneros innecesarios
      const excludeGenres = ["Aventura", "Familia", "Fantasía","Romance","Película de TV"];
      const filteredGeneros = generos.filter(genero => !excludeGenres.includes(genero.name));

      //Se comprueba si se clickeo en Tendencias, que el título sea Tendencias
        if(genreId == 'tendencias'){
          document.getElementById('genreTitle').innerText = "Tendencias";
        }

        //se recorren los géneros ya filtrados y se los muestra
        filteredGeneros.forEach((genero)=>{
       
        if(genero.id == genreId){
            if(genero.name == 'Documental'){
                document.getElementById('genreTitle').innerText = "Documentales";
            }else{
            document.getElementById('genreTitle').innerText = `Películas de ${genero.name}`;}
        }
        document.getElementById('genres').innerHTML += `<li><a class="dropdown-item bg-dark" href="viewList.html?id=${genero.id}">${genero.name}</a></li>`
         
          //console.log(genero);
         });
         //Se oculta el Spinner         
          spinnerContainer.style.display = 'none';  
      }

      //Función para traer las películas
const fetchMovies = async () => {
  let withGenres = ``;
   if(genreId !== 'tendencias'){
     withGenres = `&with_genres=${genreId}`
   }
    const response = await fetch(
      `${API_URL}/discover/movie?api_key=${API_KEY}${withGenres}&language=es-MX`
    );
    const data = await response.json();
    const movies = data.results;

    console.log(movies);

    displayMovies(movies);
    
  };

  const displayMovies = (movies) => {
    let listaPelis = document.querySelector(".grid");
    listaPelis.innerHTML = '';
    movies.forEach((movie) => {
      listaPelis.innerHTML += `<div class="movie-item ">
            <a href="detail-movie.html?id=${movie.id}">
                <img src="${IMAGE_PATH + movie.poster_path}" alt="${
        movie.title
      }" class="movie-item-img">
                <div class="movie-item-detail">
                    <p class="movie-item-detail-title">${movie.title}</p>
                    <p class="movie-item-detail-subtitle">${movie.release_date.substring(
                      0,
                      4
                    )} - ⭐${movie.vote_average.toFixed(1)}/10</p>
                   
                </div>
            </a>
        </div>`;
    });
  };
  fetchMovies();

});