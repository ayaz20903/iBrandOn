// var swiper = new Swiper(".mySwiper", {
//     effect: "cube",
//     grabCursor: true,
//     autoplay: {
//         delay: 2000, // 4 seconds
//         disableOnInteraction: false, // Keeps autoplay running after user interaction
//       },
//     cubeEffect: {
//       shadow: true,
//       slideShadows: true,
//       shadowOffset: 20,
//       shadowScale: 0.94,
//     },
//     pagination: {
//       el: ".swiper-pagination",
//     },
//   });

function initSwiper(selector, initialDelay) {
    setTimeout(() => {
      new Swiper(selector, {
        effect: "cube",
        grabCursor: true,
        loop:true,
        autoplay: {
          delay: 3000, // Every cube rotates every 4 seconds
          disableOnInteraction: false,
        },
        cubeEffect: {
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        },
        pagination: {
          el: ".swiper-pagination",
        },
      });
    }, initialDelay);
  }

  initSwiper(".mySwiper1", 0);     // Start immediately
  initSwiper(".mySwiper2", 1000);  // Start after 1 sec
  initSwiper(".mySwiper3", 2000);  // Start after 2 sec
  initSwiper(".mySwiper4", 3000);  // Start after 3 sec
  initSwiper(".mySwiper5", 4000);  // Start after 4 sec