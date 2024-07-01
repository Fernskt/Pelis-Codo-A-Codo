//const options = {method: 'GET', headers: {accept: 'application/json'}};
document.addEventListener("DOMContentLoaded", function () {
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "f5a09a058db7dc2f36999cfad6668b60";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";

  const fetchGenre = async () =>{
    const response = await fetch(`${API_URL}/genre/movie/list?api_key=${API_KEY}&language=es-MX`);
    const data = await response.json();
    const generos = data.genres;
    
  displayGenres(generos);
    
  }
fetchGenre();
  const displayGenres = (generos) =>{
    const excludeGenres = ["Aventura", "Familia", "Fantasía","Romance","Película de TV"];
    const filteredGeneros = generos.filter(genero => !excludeGenres.includes(genero.name));
    filteredGeneros.forEach((genero)=>{
    document.getElementById('genres').innerHTML += `<li><a class="dropdown-item bg-dark" href="viewList.html?id=${genero.id}">${genero.name}</a></li>`
     
      //console.log(genero);
     }) 
  }



  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    const response = await fetch(
      `${API_URL}/${type}/movie?api_key=${API_KEY}&query=${searchKey}&language=es-MX`
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
  fetchMovies("");

  document.getElementById("busqueda").addEventListener("submit", function (e) {
    e.preventDefault();

    const busqueda = document.getElementById("pelicula").value;
    if (busqueda) {
      fetchMovies(busqueda);
    }else{
        fetchMovies("");
    }
  });
});

/* fetch(API_URL + '/discover/movie')
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err)); */
