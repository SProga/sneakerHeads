(function () {
	const $btn_minus = document.querySelector(".btn_minus");
	const $btn_add = document.querySelector(".btn_plus");
	const $product_amount = document.querySelector(".item__amount");

	$btn_minus.addEventListener("click", function (e) {
		let amount = parseInt($product_amount.textContent);
		$product_amount.textContent = amount > 0 ? amount - 1 : 0;
	});
	$btn_add.addEventListener("click", function (e) {
		let amount = parseInt($product_amount.textContent);
		$product_amount.textContent = amount + 1;
	});
})();
