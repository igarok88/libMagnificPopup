window.addEventListener("DOMContentLoaded", () => {
	const gallery = document.querySelector(".gallery");

	const createItem = (item) => {
		return `
		<a
					href="${item}.jpg"
					data-source="${item}.jpg"
					title="Into The Blue"
					style="width: 193px; height: 125px"
				>
					<img src="${item}.jpg" width="193" height="125" />
				</a>
		`;
	};

	for (let i = 1; i <= 12; i++) {
		gallery.innerHTML += createItem(`img/${i}`);
	}

	$(".popup-with-form").magnificPopup({
		closeBtnInside: false,
		type: "inline",
		preloader: false,
		focus: "#name",

		// When elemened is focused, some mobile browsers in some cases zoom in
		// It looks not nice, so we disable it:
		callbacks: {
			beforeOpen: function () {
				if ($(window).width() < 700) {
					this.st.focus = false;
				} else {
					this.st.focus = "#name";
				}
			},
		},
	});

	$(".gallery").magnificPopup({
		delegate: "a",
		type: "image",
		closeOnContentClick: false,
		closeBtnInside: false,
		mainClass: "mfp-with-zoom mfp-img-mobile",
		image: {
			verticalFit: true,
			titleSrc: function (item) {
				return (
					item.el.attr("title") +
					' &middot; <a class="image-source-link" href="' +
					item.el.attr("data-source") +
					'" target="_blank">image source</a>'
				);
			},
		},
		gallery: {
			enabled: true,
		},
		zoom: {
			enabled: true,
			duration: 300, // don't foget to change the duration also in CSS
			opener: function (element) {
				return element.find("img");
			},
		},
	});

	const inputPopup = document.querySelectorAll(".form-popup input");

	inputPopup.forEach((item) => {
		item.addEventListener("click", (e) => {
			const target = e.target;
			const placeholderDefault = item.getAttribute("placeholder");
			console.log(target);
			console.log(placeholderDefault);

			if (target.closest("[placeholder]")) {
				item.removeAttribute("placeholder");
			} else {
				item.setAttribute("placeholder", placeholderDefault);
			}
		});
	});
});
