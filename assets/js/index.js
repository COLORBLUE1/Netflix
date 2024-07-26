// let slideIndex = 0;
// const slides = document.querySelectorAll('.portada');
// const totalSlides = slides.length;

// // Clonamos las primeras y últimas imágenes para hacer la transición infinita
// const carousel = document.querySelector('.carrucel');
// carousel.appendChild(slides[0].cloneNode(true));
// carousel.insertBefore(slides[totalSlides - 1].cloneNode(true), slides[0]);

// function showSlide(index) {
//   const slides = document.querySelectorAll('.portada');
//   const totalSlides = slides.length;
  
//   if (index >= totalSlides) {
//     slideIndex = 0;
//     carousel.style.transition = 'none'; // Desactiva la transición durante el salto
//     const offset = -slideIndex * 100;
//     carousel.style.transform = `translateX(${offset}%)`;
//     setTimeout(() => {
//       slideIndex++;
//       carousel.style.transition = 'transform 0.5s ease'; // Reactiva la transición
//       showSlide(slideIndex);
//     }, 20); // Delay para que la transición se reinicie correctamente
//     return;
//   }

//   if (index < 0) {
//     slideIndex = totalSlides - 1;
//     carousel.style.transition = 'none';
//     const offset = -slideIndex * 100;
//     carousel.style.transform = `translateX(${offset}%)`;
//     setTimeout(() => {
//       slideIndex--;
//       carousel.style.transition = 'transform 0.5s ease';
//       showSlide(slideIndex);
//     }, 20);
//     return;
//   }

//   const offset = -slideIndex * 20;
//   carousel.style.transform = `translateX(${offset}%)`;
// }

// function nextSlide() {
//   slideIndex++;
//   showSlide(slideIndex);
// }

// function prevSlide() {
//   slideIndex--;
//   showSlide(slideIndex);
// }
