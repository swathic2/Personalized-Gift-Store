document.addEventListener('DOMContentLoaded', () => {

    // Products array with isFavorite property
    const products = [
        {
            name: 'Red Roses And Chocolate Cake',
            id: 'redrosesid',
            price: 1179,
            originalPrice: 1309,
            discount: 19,
            rating: 4.6,
            reviews: 31,
            image: 'https://assets.winni.in/product/primary/2024/3/94426.jpeg?dpr=1&w=400',
            isFavorite: false,
            
        },
        {
            name: 'Premium Personalized Pen Keychain And Temperature Bottle',
            id: 'ppkeyid',
            price: 999,
            originalPrice: 1299,
            discount: 19,
            rating: 4.6,
            reviews: 21,
            image: 'https://assets.winni.in/product/primary/2023/10/91380.jpeg?dpr=1&w=400',
            isFavorite: false,
            
        },
        {
            name: 'Glittery Roses And Pineapple Cake Combo',
            id: 'glitroseid',
            price: 1299,
            originalPrice: 1429,
            discount: 17,
            rating: 4.7,
            reviews: 35,
            image: 'https://assets.winni.in/product/primary/2023/3/83202.jpeg?dpr=1&w=400',
            isFavorite: false,
           
        },
        {
            name: 'Personalized Birthday Greeting With Temptation',
            id: 'pbgtempid',
            price: 549,
            originalPrice: 0, // Please specify the original price if available
            discount: 0, // Please specify the discount if available
            rating: 4.8,
            reviews: 40,
            image: 'https://assets.winni.in/product/primary/2024/3/94408.jpeg?dpr=1&w=400',
            isFavorite: false,
            
        },
        {
            name: 'Alluring Personalized Diary And Chocolate Combo',
            id: 'apdiaryid',
            price: 1099,
            originalPrice: 1309,
            discount: 16,
            rating: 5.0,
            reviews: 13,
            image: 'https://assets.winni.in/product/primary/2023/3/83256.jpeg?dpr=1&w=400',
            isFavorite: false,
            
        },
        {
            name: 'Black Forest Cake With Red Roses',
            id: 'blackforestid',
            price: 1179,
            originalPrice: 0, // Please specify the original price if available
            discount: 0, // Please specify the discount if available
            rating: 4.3,
            reviews: 6,
            image: 'https://assets.winni.in/product/primary/2024/3/94423.jpeg?dpr=1&w=400',
            isFavorite: false,
            description: 'A beautiful bouquet of red roses complemented by a delicious chocolate cake.',
           
        },
        {
            name: 'Cadbury Love With Adorable Teddy',
            id: 'cadloveid',
            price: 579,
            originalPrice: 0, // Please specify the original price if available
            discount: 0, // Please specify the discount if available
            rating: 4.5,
            reviews: 2,
            image: 'https://assets.winni.in/product/primary/2024/1/92848.jpeg?dpr=1&w=400',
            isFavorite: false,
           
        },
        {
            name: 'Blooming Butterscotch',
            id: 'bloomid',
            price: 1269,
            originalPrice: 1629,
            discount: 28,
            rating: 4.7,
            reviews: 55,
            image: 'https://assets.winni.in/product/primary/2024/3/94556.jpeg?dpr=1&w=400',
            isFavorite: false,
            
        }
    ];


    // Function to display products in the product grid
    const productGrid = document.querySelector('.product-grid');

    function displayProducts(productList) {
        productGrid.innerHTML = '';
        productList.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'product';
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>₹ ${product.price} ${product.originalPrice ? `<span class="original-price">₹ ${product.originalPrice}</span> <span class="discount">${product.discount}% Off</span>` : ''}</p>
                <p class="rating">${product.rating} ★ (${product.reviews} Reviews)</p>
                <button class="favorite-btn">${product.isFavorite ? '❤' : '🖤'}</button>
            `;

            productDiv.addEventListener('click', () => {
                viewProduct(product.id);
            });
            const favoriteButton = productDiv.querySelector('.favorite-btn');
            favoriteButton.addEventListener('click', (event) => {
                event.stopPropagation();
                toggleFavorite(product);
            });

            productGrid.appendChild(productDiv);
        });
    }

 // Function to view product details
    function viewProduct(productId) {
        window.location.href =`all-combosproduct-details.html?product=${encodeURIComponent(productId)}`;
    }


    // Function to toggle favorite status
    function toggleFavorite(product) {
        product.isFavorite = !product.isFavorite;
        displayProducts(products); // Refresh the display
        updateLocalStorage(); // Update local storage with updated products
    }

    // Function to update local storage with products data
    function updateLocalStorage() {
        localStorage.setItem('products', JSON.stringify(products));
    }

    // Function to initialize from local storage or default products
    function initializeProducts() {
        const storedProducts = JSON.parse(localStorage.getItem('products'));
        if (storedProducts) {
            products.forEach((product, index) => {
                product.isFavorite = storedProducts[index].isFavorite;
            });
        }
    }

    // Sorting products function
    function sortProducts(sortBy) {
        let sortedProducts = [...products];
        if (sortBy === 'popularity') {
            sortedProducts.sort((a, b) => b.reviews - a.reviews);
        } else if (sortBy === 'rating') {
            sortedProducts.sort((a, b) => b.rating - a.rating);
        } else if (sortBy === 'newest') {
            // Assuming the products array is already sorted by newest
            sortedProducts = products;
        }
        displayProducts(sortedProducts);
    }

    // Filtering products function
    function filterProducts(filterPrice) {
        let filteredProducts = [...products];
        if (filterPrice === 'low-to-high') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (filterPrice === 'high-to-low') {
            filteredProducts.sort((a, b) => b.price - a.price);
        }
        displayProducts(filteredProducts);
    }

    // Initialize products from local storage or default
    initializeProducts();
    displayProducts(products);

    // Add event listeners for sort, filter, and search functionalities
    document.getElementById('sort-by').addEventListener('change', function() {
        const sortBy = this.value;
        sortProducts(sortBy);
    });

    document.getElementById('filter-price').addEventListener('change', function() {
        const filterPrice = this.value;
        filterProducts(filterPrice);
    });

    document.getElementById('search-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const query = document.getElementById('search-input').value.trim().toLowerCase();
        searchProducts(query);
    });

});