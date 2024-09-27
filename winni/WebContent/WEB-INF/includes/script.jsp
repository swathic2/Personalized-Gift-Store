document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded');
});

document.getElementById('location-select').addEventListener('change', function(event) {
    var selectedLocation = event.target.value;
    document.getElementById('current-location').textContent = selectedLocation;
});


// Handle form submission (redirect based on search query)
document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the default way
    var searchQuery = document.getElementById('search-input').value.toLowerCase().trim();

    // Define keywords and their respective redirection URLs
    var redirections = {
        'combos': 'cake-combos.html',
        'cakes': 'express-combo.html',
        'flowers': 'flowers.html',
        'personalized gifts': 'personalized-gifts.html',
        // Add more keywords and URLs as needed
    };

    // Check if the search query matches any defined keywords
    if (redirections.hasOwnProperty(searchQuery)) {
        window.location.href = redirections[searchQuery];
    } else {
        alert('No results found for your search.');
    }
});


/script for login/
document.addEventListener('DOMContentLoaded', () => {
    console.log('Page loaded');
});

var modal = document.getElementById('login-modal');
var span = document.getElementsByClassName('close-btn')[0];

span.onclick = function() {
    modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

document.getElementById('login-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default link behavior
    modal.style.display = 'flex';
    showSection('login'); // Default to login section when modal opens
});

function showSection(sectionId) {
    document.getElementById('login').style.display = 'none';
    document.getElementById('register').style.display = 'none';
    document.getElementById('forgot-password').style.display = 'none';
    document.getElementById(sectionId).style.display = 'block';
}


        function validateForm(event) {
            event.preventDefault();
            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;
            const errorMessage = document.getElementById("login-error-message");

            const users = JSON.parse(localStorage.getItem("users")) || [];
            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                localStorage.setItem("currentUser", JSON.stringify(user));
                window.location.href = 'home.html';
            } else {
                alert("Invalid email or password.");
                errorMessage.style.display = "block";
            }
        }

        function register(event) {
            event.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("mail").value;
            const phone = document.getElementById("phone").value;
            const password1 = document.getElementById("pass1").value;
            const password2 = document.getElementById("pass2").value;
            const errorMessage = document.getElementById("register-error-message");

            if (password1.length < 6) {
                alert( "Password should be more than 6 characters.");
                errorMessage.style.display = "block";
                return;
            }

            if (password1 !== password2) {
                alert( "Password does not match the confirmation.");
                errorMessage.style.display = "block";
                return;
            }

            if (!/^\d{10}$/.test(phone)) {
                alert("Phone number should be exactly 10 digits.");
                errorMessage.style.display = "block";
                return;
            }

            const users = JSON.parse(localStorage.getItem("users")) || [];
            const userExists = users.some(user => user.email === email);

            if (userExists) {
                alert("User already exists with this email.");
                errorMessage.style.display = "block";
                return;
            }

            users.push({ name, email, phone, password: password1 });
            localStorage.setItem("users", JSON.stringify(users));
            localStorage.setItem("currentUser", JSON.stringify({ name, email }));

            window.location.href = 'home.html';
        }

        function forgotPassword(event) {
            event.preventDefault();
            const email = document.getElementById("forgot-email").value;
            const phone = document.getElementById("forgot-phone").value;
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const user = users.find(user => user.email === email || user.phone === phone);

            if (user) {
                // Mock sending an email or SMS
                alert(`Password reset instructions have been sent to ${email || phone}.`);
            } else {
                alert("No account found with this email or phone number.");
            }
        }