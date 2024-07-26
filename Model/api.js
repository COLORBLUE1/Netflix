// URL de la API que deseas consumir
const apiUrl = 'https://api.jsonbin.io/v3/b/66a2d0d1ad19ca34f88cd85e';

// Variable global para almacenar los datos
let apiData = [];

// Función para obtener los datos de la API
function fetchApiData() {
  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      return response.json();
    })
    .then(data => {
      apiData = data.record; // Ajusta según la estructura de los datos
      console.log(apiData); // Para depuración
      return apiData; // Devuelve los datos para uso posterior
    })
    .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
}

// Exporta la función para que pueda ser utilizada en otros scripts
window.fetchApiData = fetchApiData;
