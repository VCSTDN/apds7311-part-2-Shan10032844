let csrfToken = '';

// Fetch CSRF token on page load
async function fetchCsrfToken() {
    const response = await fetch('http://localhost:3000/auth/csrf-token');
    const data = await response.json();
    csrfToken = data.csrfToken;
}

// Call this function when the page loads
fetchCsrfToken();

// Handle user registration
document.getElementById('register-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'CSRF-Token': csrfToken,
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    alert(data.message);
});

// Handle user login
document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'CSRF-Token': csrfToken,
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.status === 200) {
        alert('Login successful');
    } else {
        alert(data.message);
    }
});
