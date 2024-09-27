
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        document.getElementById('cart-count').innerText = cart.length;

        function displayCart() {
            const cartItems = document.getElementById('cart-items');
            cartItems.innerHTML = '';
            let subtotal = 0;
            let deliveryCharges = 50; // Example delivery charge
            let taxGST = 0;
            cart.forEach((item, index) => {
                subtotal += item.price;
                const cartItem = document.createElement('div');
                cartItem.classList.add('bg-white', 'rounded-lg', 'shadow-md', 'p-4', 'flex', 'items-center', 'space-x-4');
                cartItem.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded">
                    <div class="flex-1">
                        <h3 class="font-semibold text-lg">${item.name}</h3>
                        <p class="text-gray-600"><i class="fas fa-rupee-sign"></i> ${item.price}</p>
                    </div>
                    <button class="bg-red-500 text-white px-4 py-2 rounded" onclick="removeFromCart(${index})">Remove</button>
                `;
                cartItems.appendChild(cartItem);
            });
            taxGST = subtotal * 0.18; // Example GST rate of 18%
            const totalCost = subtotal + deliveryCharges + taxGST;
            document.getElementById('subtotal').innerText = `₹${subtotal.toFixed(2)}`;
            document.getElementById('delivery-charges').innerText = `₹${deliveryCharges.toFixed(2)}`;
            document.getElementById('tax-gst').innerText = `₹${taxGST.toFixed(2)}`;
            document.getElementById('total-cost').innerText = `₹${totalCost.toFixed(2)}`;
        }

        function removeFromCart(index) {
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            document.getElementById('cart-count').innerText = cart.length;
            displayCart();
        }

        function checkout() {
            alert('Proceeding to checkout...');
            // Add your checkout logic here
        }

        displayCart();

        document.addEventListener('DOMContentLoaded', () => {
            const addonButtons = document.querySelectorAll('.add-addon-btn');
            addonButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const name = button.getAttribute('data-name');
                    const price = parseInt(button.getAttribute('data-price'), 10);
                    const image = button.getAttribute('data-image');
                    addToCart({ name, price, image });
                });
            });
        });

        function addToCart(item) {
            cart.push(item);
            localStorage.setItem('cart', JSON.stringify(cart));
            document.getElementById('cart-count').innerText = cart.length;
            displayCart();
        }

