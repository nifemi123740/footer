// LOGIN
const form = document.getElementById('loginForm');
if (form) {
    const message = document.getElementById('loginMessage');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const users = JSON.parse(localStorage.getItem('users')) || [];

        const user = users.find(u => u.email === email && u.password === password);
        if(user) {
            sessionStorage.setItem('loggedInUser', JSON.stringify({ name: user.name, email: user.email }));
            window.location.href = 'Dashboard.html';
        } else {
            message.textContent = "Invalid email or password.";
        }
    });
}

// SIGNUP
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    const signupMessage = document.getElementById('signupMessage');

    signupForm.addEventListener('submit', function(e) {
        e.preventDefault(); 
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password !== confirmPassword) {
           signupMessage.textContent = "Passwords do not match!";
           signupMessage.style.color = "red";
           return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.email === email);
        if (userExists) {
           signupMessage.textContent = "Email is already registered.";
           signupMessage.style.color = "red";
           return;
        }

        users.push({ name, email, password });
        localStorage.setItem('users', JSON.stringify(users));

        signupMessage.style.color = "green";
        signupMessage.textContent = "Sign-up successful! You can now login.";
        signupForm.reset();
    });
}
