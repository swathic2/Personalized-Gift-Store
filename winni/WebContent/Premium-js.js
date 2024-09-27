document.addEventListener('DOMContentLoaded', () => {

    // Products array with isFavorite property
    const products = [
        {
            name: 'Cossy Bunch Of Love',
            id: 'cosbunid',
            price: 999,
            originalPrice: 1179,
            discount: 19,
            rating: 4.6,
            reviews: 31,
            image: 'https://assets.winni.in/product/primary/2021/10/55154.jpeg?dpr=1&w=400',
            isFavorite: false,
            
        },
        {
            name: 'Charming Pink Pendant With Ferrero Rocher',
            id: 'charmpinkid',
            price: 1349,
            originalPrice: 1599,
            discount: 19,
            rating: 4.6,
            reviews: 21,
            image: 'https://assets.winni.in/product/primary/2024/1/92933.jpeg?dpr=1&w=400',
            isFavorite: false,
            
        },
        {
            name: 'Two Layers Lucky Bamboo For Wife With Teddy',
            id: 'twoluckyid',
            price: 999,
            originalPrice: 1229,
            discount: 17,
            rating: 4.7,
            reviews: 35,
            image: 'https://assets.winni.in/product/primary/2024/1/92836.jpeg?dpr=1&w=400',
            isFavorite: false,
           
        },
        {
            name: 'Lovely Personalized Photo Teddy Bear',
            id: 'lovelypersid',
            price: 849,
            originalPrice: 0, // Please specify the original price if available
            discount: 0, // Please specify the discount if available
            rating: 4.8,
            reviews: 40,
            image: 'https://assets.winni.in/product/primary/2024/2/93901.jpeg?dpr=1&w=400',
            isFavorite: false,
            
        },
        {
            name: 'Premium Customized Office Accessories Combo',
            id: 'customofficeid',
            price: 1549,
            originalPrice: 1849,
            discount: 16,
            rating: 5.0,
            reviews: 13,
            image: 'https://assets.winni.in/product/primary/2023/8/88980.jpeg?dpr=1&w=400',
            isFavorite: false,
            
        },
        {
            name: 'Personalised Teddy With Photo Frame And Chocolates',
            id: 'personteddyid',
            price: 1079,
            originalPrice: 0, // Please specify the original price if available
            discount: 0, // Please specify the discount if available
            rating: 4.3,
            reviews: 6,
            image: 'https://assets.winni.in/product/primary/2024/1/92955.jpeg?dpr=1&w=400',
            isFavorite: false,
            description: 'A beautiful bouquet of red roses complemented by a delicious chocolate cake.',
           
        },
        {
            name: '6 Red Roses With Mug And Chocolate',
            id: 'sixredid',
            price: 1049,
            originalPrice: 0, // Please specify the original price if available
            discount: 0, // Please specify the discount if available
            rating: 4.5,
            reviews: 2,
            image: 'https://assets.winni.in/product/primary/2023/1/81586.jpeg?dpr=1&w=400',
            isFavorite: false,
           
        },
        {
            name: 'Divineful Ferrero Rocher Bunch',
            id: 'divineferroid',
            price: 2149,
            originalPrice: 2549,
            discount: 28,
            rating: 4.7,
            reviews: 55,
            image: 'https://assets.winni.in/product/primary/2022/6/61827.jpeg?dpr=1&w=400',
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
                <button class="favorite-btn">${product.isFavorite ? '🖤' : '❤'}</button>
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
        window.location.href = `Premiumproduct-details.html?product=${productId}`;
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