document.addEventListener("DOMContentLoaded", async function () {
  const API_URL = "https://api.themoviedb.org/3";
  const API_KEY = "f5a09a058db7dc2f36999cfad6668b60";
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
  const IMAGE_PATH_O = "https://image.tmdb.org/t/p/original";
  const spinnerContainer = document.querySelector('.spinner-container');
  const spinner = document.querySelector('.spinner');

  //función para convertir de minutos a horas.
  const duracion = (min)=>{
    let cantHoras = Math.floor(min / 60); // Calcula el número de horas completas
    let minutosRestantes = min % 60; // Calcula los minutos restantes
    if (cantHoras > 0) {
        return cantHoras + "h " + minutosRestantes + "min";
    } else {
        return minutosRestantes + " min";
    }
  };
  
  // Mostrar el spinner antes de hacer la solicitud
  spinnerContainer.style.display = 'flex';
  // Función para obtener el valor de un parámetro en la URL
  const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  };

  const movieId = getQueryParam("id");

  const displayMovieDetails = (movie) => {
    
    const imgs = document.querySelectorAll(".peli-img, .peli-img-mobile");
    imgs.forEach((img) => {
      img.src = `${IMAGE_PATH + movie.poster_path}`;
    });

    const banner = document.getElementById('detail-movie');
    banner.style.backgroundImage = `url(${IMAGE_PATH_O + movie.backdrop_path})`;

    document.getElementById("sitio-link").href = movie.homepage;

    document.getElementById("titulo").textContent = movie.title;

    document.getElementById("subtitulo").textContent = movie.tagline;
    const runtime = duracion(movie.runtime);
    document.getElementById("vote_avg").textContent = `⭐ ${movie.vote_average}`;
    document.getElementById("duracion").textContent = runtime;

    // document.getElementById('fecha').textContent = movie.release_date;

    document.getElementById("descripcion").textContent = movie.overview;

    document.getElementById("info").innerHTML = `<p><span class="enfasis">Género: </span> ${movie.genres.map((genr) => genr.name).join(', ')}</p>
    <p id="pais"><span class="enfasis">País: </span>${movie.production_countries[0].name}</p><p id="director"><span class="enfasis">Compañía: </span>${movie.production_companies[0].name}</p>
    <p id="director"><span class="enfasis">Fecha de estreno: </span>${movie.release_date}</p>`;
  };

  const displayTrailers = (videosData) => {
    // el primer trailer disponible
const trailer = videosData.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');

// Obtener la clave del video de YouTube
if (trailer) {
    const trailerKey = trailer.key;
    const trailerUrl = `https://www.youtube.com/embed/${trailerKey}`;
    const iframe = document.getElementById('iframe');
    iframe.src = trailerUrl;
} else {
    console.log('No se encontró trailer para la película.');
}
};

  if (movieId) {
    const response = await fetch(
      `${API_URL}/movie/${movieId}?api_key=${API_KEY}&language=es-MX`
    );
    const movie = await response.json();

    const responseVideos = await fetch(`${API_URL}/movie/${movieId}/videos?api_key=${API_KEY}&language=es-ES`);
const videosData = await responseVideos.json();

    spinnerContainer.style.display = 'none';
    console.log(movie);
    displayMovieDetails(movie);
    displayTrailers(videosData);
  }
});
