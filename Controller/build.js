document.addEventListener("DOMContentLoaded", function () {
    // URL de la API
    const apiUrl = "https://api.jsonbin.io/v3/b/66a2d0d1ad19ca34f88cd85e";

    // Referencias a elementos del DOM
    const addMovieButton = document.querySelector(".opciones--item.palomita");
    const addMovieModal = document.getElementById("add-movie-modal");
    const closeAddMovieModalButton = addMovieModal.querySelector(".close");
    const addMovieForm = document.getElementById("add-movie-form");

    // Mostrar el modal para agregar una película
    addMovieButton.addEventListener("click", () => {
        addMovieModal.style.display = "block";
    });

    // Cerrar el modal cuando se haga clic en el botón de cierre
    closeAddMovieModalButton.addEventListener("click", () => {
        addMovieModal.style.display = "none";
    });

    // Cerrar el modal cuando se haga clic fuera del contenido del modal
    window.addEventListener("click", (event) => {
        if (event.target === addMovieModal) {
            addMovieModal.style.display = "none";
        }
    });

    // Manejar el envío del formulario para agregar una película
    addMovieForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const poster = document.getElementById("poster").value;
        const trailer = document.getElementById("trailer").value;
        const type = document.getElementById("type").value;

        const newMovie = {
            Title: title,
            Description: description,
            Carrusel: poster,
            Trailer: trailer,
            Type: type
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer YOUR_API_KEY' // Reemplaza con tu clave API
                },
                body: JSON.stringify({ movies: [newMovie] })
            });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            alert('Película agregada con éxito');
            addMovieModal.style.display = "none";

            // Recargar las portadas después de agregar una película
            fetchPortadas();

        } catch (error) {
            console.error("Error al agregar la película:", error);
            alert('Error al agregar la película');
        }
    });

    // Función para obtener los datos de la API
    async function fetchPortadas() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const data = await response.json();
          
            const peliculas = data.record.movies; // Ajusta según la estructura de los datos

            // Contenedores para las portadas
            const containerAdulto = document.getElementById("portada-adulto");
            const containerInfantil = document.getElementById("portada-infantil");

            // Limpiar los contenedores
            containerAdulto.innerHTML = "";
            containerInfantil.innerHTML = "";

            // Generar y mostrar portadas
            peliculas.forEach((pelicula) => {
                const div = document.createElement("div");
                div.className = "portada";
                div.dataset.title = pelicula.Title;
                div.dataset.description = pelicula.Description; // Añade una descripción
                div.dataset.trailer = pelicula.Trailer; // Añade un enlace al tráiler
                div.dataset.poster = pelicula.Carrusel; // Añade una imagen del póster
                div.dataset.type = pelicula.Type; // Añade el tipo de película

                const img = document.createElement("img");
                img.src = pelicula.Carrusel; // Ajusta según la estructura de los datos
                img.alt = pelicula.Title; // Ajusta según la estructura de los datos

                div.appendChild(img);

                if (pelicula.Type === "Adulto") {
                    containerAdulto.appendChild(div);
                } else if (pelicula.Type === "Infantil") {
                    containerInfantil.appendChild(div);
                }

                // Añadir evento click al contenedor de la película
                div.addEventListener("click", () => openModal(pelicula, peliculas));
            });

            setupCarruselControls("portada-adulto");
            setupCarruselControls("portada-infantil");
        } catch (error) {
            console.error("Error al obtener las portadas:", error);
        }
    }

    function setupCarruselControls(carruselId) {
        const carrusel = document.getElementById(carruselId).parentElement;
        const content = document.getElementById(carruselId);
        const prevButton = carrusel.querySelector(".prev");
        const nextButton = carrusel.querySelector(".next");

        let scrollAmount = 0;
        const itemWidth = content.querySelector(".portada").offsetWidth + 20; // Incluye margen
        const itemCount = content.children.length;

        function scrollToIndex(index) {
            content.style.transform = `translateX(-${index * itemWidth}px)`;
            scrollAmount = index;
        }

        prevButton.addEventListener("click", () => {
            scrollAmount = (scrollAmount - 1 + itemCount) % itemCount;
            scrollToIndex(scrollAmount);
        });

        nextButton.addEventListener("click", () => {
            scrollAmount = (scrollAmount + 1) % itemCount;
            scrollToIndex(scrollAmount);
        });
    }

    function openModal(pelicula, peliculas) {
        const modal = document.getElementById("movie-modal");
        const modalTitle = document.getElementById("modal-title");
        const modalDescription = document.getElementById("modal-description");
        const modalPoster = document.getElementById("modal-poster");
        const trailerContainer = document.getElementById("trailer-container");
        const trailerVideo = document.getElementById("trailer-video");
        const playTrailerButton = document.getElementById("play-trailer");
        const relatedCarrusel = document.getElementById("related-movies");

        modalTitle.textContent = pelicula.Title;
        modalDescription.textContent = pelicula.Description;
        modalPoster.src = pelicula.Carrusel;
        trailerContainer.style.display = pelicula.Trailer ? 'flex' : 'none';
        trailerVideo.src = pelicula.Trailer ? pelicula.Trailer : '';
        
        playTrailerButton.onclick = () => {
            trailerVideo.style.display = 'flex';
            trailerVideo.src = pelicula.Trailer;
        };

        // Mostrar el carrusel relacionado
        const relatedMovies = peliculas.filter(p => p.Type === pelicula.Type && p.Title !== pelicula.Title);
        relatedCarrusel.innerHTML = "";
        relatedMovies.forEach((relatedMovie) => {
            const div = document.createElement("div");
            div.className = "portada";
            const img = document.createElement("img");
            img.src = relatedMovie.Carrusel;
            img.alt = relatedMovie.Title;

            div.appendChild(img);
            relatedCarrusel.appendChild(div);
        });

        setupCarruselControls("related-movies");

        modal.style.display = "block";

        // Cerrar el modal cuando se haga clic en el botón de cierre
        const closeButton = document.querySelector(".close");
        closeButton.onclick = () => {
            modal.style.display = "none";
            trailerVideo.style.display = 'none';
            trailerVideo.src = ''; // Detiene el vídeo
        };

        // Cerrar el modal cuando se haga clic fuera del contenido del modal
        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
                trailerVideo.style.display = 'none';
                trailerVideo.src = ''; // Detiene el vídeo
            }
        };
    }

    // Llamar a la función para obtener y mostrar las portadas
    fetchPortadas();
});
