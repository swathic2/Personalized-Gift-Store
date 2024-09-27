<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Combos Logos Page</title>
<style>
    body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #f7f7f7;
}

.wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.container {
    display: flex;
    width: 800px;
    margin: 40px auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    overflow: hidden;
    background-color: white;
}

.left-section {
    background-color: pink;
    padding: 40px;
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
}

.illustration {
    width: 80%;
    margin-bottom: 20px;
}

.left-section ul {
    list-style-type: none;
    padding: 0;
}

.left-section ul li {
    margin: 10px 0;
    font-weight: bold;
    color: #8B4513;
}

.right-section {
    padding: 40px;
    width: 60%;
}

h2 {
    margin: 0 0 20px 0;
    font-size: 24px;
}

form {
    display: flex;
    flex-direction: column;
}

label {
    margin-bottom: 5px;
    font-weight: bold;
}

input {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
}

button {
    padding: 10px;
    background-color: deeppink;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    margin-bottom: 20px;
}

button:hover {
    background-color: #d38a56;
}

p {
    font-size: 14px;
    color: #888;
    text-align: center;
}

p a {
    color: #8B4513;
    text-decoration: none;
}

.or {
    text-align: center;
    margin: 20px 0;
    color: #888;
    font-size: 14px;
}

.google-login {
    background-color: white;
    color: #444;
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
}

.google-login img {
    width: 20px;
    margin-right: 10px;
}


.popup {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
}

.popup-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 400px;
}

.popup-content h2 {
    margin-top: 0;
}

.popup-content form {
    display: flex;
    flex-direction: column;
}

.popup-content form label,
.popup-content form input,
.popup-content form button {
    margin-bottom: 10px;
}

.popup-content form button {
    background-color: #8B4513;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px;
    cursor: pointer;
}

.popup-content form button:hover {
    background-color: #d38a56;
}

.popup-close {
    background-color: pink;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px;
    cursor: pointer;
    margin-top: 10px;
}

.popup-close:hover {
    background-color: #d38a56;
}
</style>
</head>
<body>
<div class="wrapper">
        <div class="container">
            <div class="left-section">
                <img src="https://cdn-icons-png.flaticon.com/512/1966/1966279.png" alt="Illustration" class="illustration">
                <ul>
                    <li>Instant Checkout</li>
                    <li>Manage Your Orders</li>
                    <li>Exclusive Offers</li>
                </ul>
            </div>
            <div class="right-section">
                <h2>Combos Login</h2>
                <form action="ConnectionServlet" method="post">
                <input type="hidden" name="action" value="login">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required>
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" required>
                    <label for="mobile">Mobile No.</label>
                    <input type="text" id="mobile" name="mobile" pattern="\d{10}" title="Please enter exactly 10 digits" required>
                    <button type="submit">Login</button>
                    <p>If you don't have an account <a href="#" id="createAccountLink">create an account</a>.</p>
                    <div class="or">Or</div>
                    <button class="google-login" type="button">Login with Google</button>
                </form>
            </div>
        </div>
        
    </div>

<div class="popup" id="registrationPopup">
    <div class="popup-content">
        <h2>Create Account</h2>
        <form action="ConnectionServlet" method="post">
        <input type="hidden" name="action" value="register">
            <label for="reg-email">Email</label>
            <input type="email" id="reg-email" name="reg-email" required>
            <label for="reg-password">Password</label>
            <input type="password" id="reg-password" name="reg-password" required>
            <label for="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" name="confirm-password" required>
            <label for="reg-mobile">Mobile No.</label>
            <input type="text" id="reg-mobile" name="reg-mobile" required>
            <button type="submit">Register</button>
        </form>
        <button class="popup-close" id="closePopup">Close</button>
    </div>
</div>

<script>
    document.getElementById('createAccountLink').addEventListener('click', function() {
        document.getElementById('registrationPopup').style.display = 'flex';
    });

    document.getElementById('closePopup').addEventListener('click', function() {
        document.getElementById('registrationPopup').style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target == document.getElementById('registrationPopup')) {
            document.getElementById('registrationPopup').style.display = 'none';
        }
    });
</script>
</body>
</html>