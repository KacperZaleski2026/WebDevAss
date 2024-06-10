var swiper = new Swiper(".home-slider", {
	effect: "coverflow",
	grabCursor: true,
	centeredSlides: true,
	slidesPerView: "auto",
	loop: true,
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	coverflowEffect: {
		rotate: 0,
		stretch: 0,
		depth: 100,
		modifier: 3,
		slideShadows: true,
	},
});

var swiper = new Swiper(".reviews-slider", {
	grabCursor: true,
	loop: true,
	spaceBetween: 10,
	autoplay: {
		delay: 5000,
		disableOnInteraction: false,
	},
	breakpoints: {
		0: {
			slidesPerView: 1,
		},
		700: {
			slidesPerView: 2,
		},
		1050: {
			slidesPerView: 3,
		},
	},
});
