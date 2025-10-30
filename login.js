document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('errorMessage');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent the form from submitting normally

            const username = usernameInput.value;
            const password = passwordInput.value;

            // Check the credentials
            if (username === 'trydannmit' && password === 'trydan123123') {
                // Correct credentials
                errorMessage.style.display = 'none';
                
                // Redirect to the URL where your Node.js server is running.
                // Your server.js file shows it runs on port 3000.
                window.location.href = 'https://trydandashboard-2.onrender.com';

            } else {
                // Incorrect credentials
                errorMessage.textContent = 'Invalid username or password.';
                errorMessage.style.display = 'block';
            }
        });
    }
});

