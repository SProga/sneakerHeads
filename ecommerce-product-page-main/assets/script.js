(function () {
	//

	const PRODUCT = {
		id: 3,
		title: "Autumn Limited Edition",
		price: 125,
		quantity: 0,
		src: "image-product-1-thumbnail.jpg",
	};

	const $btn_minus = document.querySelector(".btn_minus");
	const $btn_add = document.querySelector(".btn_plus");
	const $product_amount = document.querySelector(".item__amount");
	const $btn_cart = document.querySelector(".navigation__cart");
	const $btn_add_cart = document.querySelector(".btn_add_cart");
	const $product_display = document.querySelector(".product__display");
	const $modal = document.querySelector(".product_modal");
	const $dismiss_modal = document.querySelector(".btn_dismiss_modal");
	const $product_main_image = document.querySelector(".product_main_image");
	const $thumbnail_images = document.querySelectorAll(".product_thumbnail_image");

	// Event Handlers
	$btn_minus.addEventListener("click", function (e) {
		let amount = parseInt($product_amount.textContent);
		$product_amount.textContent = amount > 0 ? amount - 1 : 0;
	});
	$btn_add.addEventListener("click", function (e) {
		let amount = parseInt($product_amount.textContent);
		if (amount === 10) return;
		$product_amount.textContent = amount + 1;
	});
	$btn_cart.addEventListener("click", cartHandler);

	$btn_add_cart.addEventListener("click", function (e) {});

	$thumbnail_images.forEach(($image) => {
		$image.addEventListener(
			"click",
			thumbnailHandler.bind(null, $thumbnail_images, $image, $product_main_image)
		);
	});
	$dismiss_modal.addEventListener("click", toggleModal);
	$product_main_image.addEventListener("click", toggleModal);
	// Event Handlers

	// FUNCTIONS
	function cartHandler(e) {
		let $cart = document.querySelector(".cart");
		$cart.classList.toggle("active");
	}
	function thumbnailHandler($allThumbnails, $thumbnail, $main_container) {
		$allThumbnails.forEach((el) => el.classList.remove("active"));
		$thumbnail.classList.add("active");
		$main_container.src = $thumbnail.childNodes[1].src.replace("-thumbnail", "");
	}

	function toggleModal() {
		$modal.classList.toggle("active");
		const $modal_content = document.querySelector(".modal_content");
		const $product_els = Array.from($modal_content.children);
		const $product_shown = $product_els.filter((el) =>
			el.classList.contains("product__display")
		);
		$product_shown.length && $product_shown[0].remove();
		if ($modal.classList.contains("active")) {
			const $modal_product_display = $product_display.cloneNode(true);
			$modal_content.append($modal_product_display);
			const $modal_product_controls = document.querySelector(
				".modal_content  .product__controls"
			);
			$modal_product_controls.classList.add("modal_open");
			const $modal_thumbnail_images = document.querySelectorAll(
				".modal_content .product_thumbnail_image"
			);
			var $main_modal_image = document.querySelector(
				".modal_content .product_main_image"
			);
			$modal_thumbnail_images.forEach(($image, idx) => {
				$image.addEventListener(
					"click",
					thumbnailHandler.bind(null, $modal_thumbnail_images, $image, $main_modal_image)
				);
				$image.dataset.id = idx;
			});
			const btn_previous = document.querySelector(
				".product_modal > .modal_content .product_previous_image"
			);
			const btn_next = document.querySelector(
				".product_modal > .modal_content .product_next_image"
			);
			btn_previous.addEventListener("click", function (e) {
				let $currentImage = findActiveModalImage($modal_thumbnail_images);
				if (parseInt($currentImage.dataset.id) == 0) return;
				changeModalImage(
					"backward",
					$modal_thumbnail_images,
					$currentImage,
					$main_modal_image
				);
			});
			btn_next.addEventListener("click", function (e) {
				let $currentImage = findActiveModalImage($modal_thumbnail_images);
				if (parseInt($currentImage.dataset.id) === $modal_thumbnail_images.length - 1)
					return;

				changeModalImage(
					"forward",
					$modal_thumbnail_images,
					$currentImage,
					$main_modal_image
				);
			});
		}
	}

	function findActiveModalImage($modal_thumbnail_images) {
		return [...$modal_thumbnail_images].find(($el) => $el.classList.contains("active"));
	}
	function changeModalImage(
		direction,
		$modal_thumbnail_images,
		$currentImage,
		$main_modal_image
	) {
		let $loadImage;
		let $thumbnail_images = [...$modal_thumbnail_images];
		switch (direction) {
			case "forward":
				$loadImage = $thumbnail_images.find(
					($el) => parseInt($el.dataset.id) == parseInt($currentImage.dataset.id) + 1
				);
				break;
			case "backward":
				$loadImage = $thumbnail_images.find(
					($el) => parseInt($el.dataset.id) == parseInt($currentImage.dataset.id) - 1
				);
				break;
		}
		thumbnailHandler($modal_thumbnail_images, $loadImage, $main_modal_image);
	}
	function emptyCart(e) {}

	function addCartHandler() {}
})();
