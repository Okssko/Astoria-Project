// E-mail Ajax Send
// Documentation & Example: https://github.com/agragregra/uniMail
$("form").submit(function (e) {
	e.preventDefault(); // Prevent default form submission
	var th = $(this);
	$.ajax({
		type: "POST",
		url: "mail.php", // Ensure mail.php is the correct endpoint
		data: th.serialize()
	}).done(function () {
		alert("Thank you!");
		setTimeout(function () {
			th.trigger("reset"); // Reset form after submission
		}, 1000);
	});
	return false;
});

// Chrome Smooth Scroll
try {
	$.browserSelector();
	if ($("html").hasClass("chrome")) {
		$.smoothScroll();
	}
} catch (err) {
	console.error("Error enabling smooth scroll: ", err);
}

// Prevent image dragging
$("img, a").on("dragstart", function (event) {
	event.preventDefault();
});

$(window).on('load', function () {
	$(".loader_inner").fadeOut();
	$(".loader").delay(400).fadeOut("slow");
});

// Cart functionality
let cart = [];
const cartToggle = document.getElementById('cart-toggle');
const cartElement = document.getElementById('cart');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const clearCartButton = document.getElementById('clear-cart');
const checkoutButton = document.getElementById('checkout');

cartToggle.addEventListener('click', () => {
	cartElement.classList.toggle('open');
});

document.querySelectorAll('.add-to-cart').forEach(button => {
	button.addEventListener('click', () => {
		const name = button.getAttribute('data-name');
		const price = parseFloat(button.getAttribute('data-price'));
		addToCart(name, price);
	});
});

function addToCart(name, price) {
	cart.push({ name, price });
	updateCart();
}

function updateCart() {
	cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
        </div>
    `).join('');

	const total = cart.reduce((sum, item) => sum + item.price, 0);
	cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

clearCartButton.addEventListener('click', () => {
	cart = [];
	updateCart();
});

checkoutButton.addEventListener('click', () => {
	const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
	alert(`Thank you for your order! Total: $${total}`);
	cart = [];
	updateCart();
	cartElement.classList.remove('open');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		document.querySelector(this.getAttribute('href')).scrollIntoView({
			behavior: 'smooth'
		});
	});
});

// Form submission handling
document.getElementById('orderForm').addEventListener('submit', function (e) {
	e.preventDefault();
	alert('Thank you for your order! We will confirm shortly.');
	this.reset();
});

document.getElementById('bookingForm').addEventListener('submit', function (e) {
	e.preventDefault();
	alert('Thank you for your reservation! We will confirm shortly.');
	this.reset();
});

document.getElementById('reviewForm').addEventListener('submit', function (e) {
	e.preventDefault();
	alert('Thank you for your review!');
	this.reset();
});

// Form validation for checkout
const form = document.getElementById('checkout-form');
const formInputs = form.querySelectorAll('input');

formInputs.forEach(input => {
	input.addEventListener('input', function () {
		validateInput(this);
	});
});

function validateInput(input) {
	const errorElement = document.getElementById(`${input.id}-error`);
	if (input.validity.valid) {
		errorElement.textContent = '';
	} else {
		showError(input, errorElement);
	}
}

function showError(input, errorElement) {
	if (input.validity.valueMissing) {
		errorElement.textContent = 'This field is required.';
	} else if (input.validity.patternMismatch) {
		switch (input.id) {
			case 'name':
				errorElement.textContent = 'Please enter a valid name (letters and spaces only).';
				break;
			case 'phone':
				errorElement.textContent = 'Please enter a valid 10-digit phone number.';
				break;
			case 'card-number':
				errorElement.textContent = 'Please enter a valid 16-digit card number.';
				break;
			case 'card-expiry':
				errorElement.textContent = 'Please enter a valid expiry date (MM/YY).';
				break;
			case 'card-cvc':
				errorElement.textContent = 'Please enter a valid 3-digit CVC.';
				break;
		}
	} else if (input.validity.typeMismatch) {
		errorElement.textContent = 'Please enter a valid email address.';
	}
}

// Order placement and confirmation
form.addEventListener('submit', (e) => {
	e.preventDefault();
	if (form.checkValidity()) {
		const formData = new FormData(form);
		const orderDetails = Object.fromEntries(formData.entries());

		console.log('Order placed:', { orderDetails, cart });

		showOrderConfirmation(orderDetails);
		cart = [];
		updateCart();
		form.style.display = 'none';
		form.reset();
	} else {
		formInputs.forEach(validateInput);
	}
});

function showOrderConfirmation(orderDetails) {
	const orderConfirmation = document.getElementById('order-confirmation');
	const orderNumber = Math.floor(Math.random() * 10000) + 1000;
	const deliveryTime = new Date(Date.now() + 45 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

	document.getElementById('order-number').textContent = orderNumber;
	document.getElementById('confirm-address').textContent = orderDetails.address;
	document.getElementById('delivery-time').textContent = deliveryTime;

	const orderSummary = document.getElementById('order-summary');
	orderSummary.innerHTML = cart.map(item => `
        <p>${item.name} x ${item.quantity}: $${(item.price * item.quantity).toFixed(2)}</p>
    `).join('');

	const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
	document.getElementById('confirm-total').textContent = total.toFixed(2);

	orderConfirmation.style.display = 'block';
}

// Checkout form and payment handling
document.addEventListener('DOMContentLoaded', () => {
	const checkoutButton = document.getElementById('checkout');
	const checkoutForm = document.getElementById('checkoutForm');
	const paymentForm = document.getElementById('paymentForm');

	checkoutButton.addEventListener('click', () => {
		checkoutForm.style.display = 'block';
		checkoutButton.style.display = 'none';
	});

	paymentForm.addEventListener('submit', (e) => {
		e.preventDefault();
		alert('Payment successful!');
		paymentForm.reset();
		checkoutForm.style.display = 'none';
		checkoutButton.style.display = 'inline-block';
	});
});
//review form
// Get the modal
var modal = document.getElementById("reviewModal");

// Get the button that opens the modal
var btn = document.getElementById("reviewBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
	modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
	modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
}
