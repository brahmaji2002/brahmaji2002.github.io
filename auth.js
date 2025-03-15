// Signup function
document.getElementById("signup-form")?.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Check if the username already exists
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find(user => user.username === username);

    if (existingUser) {
        alert("Username already exists. Please choose another one.");
    } else {
        // Save new user to localStorage
        users.push({ username, password });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Signup successful!");
        window.location.href = "login.html"; // Redirect to login page
    }
});

// Login function
document.getElementById("login-form")?.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    // Retrieve users from localStorage
    let users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        alert("Login successful!");
        window.location.href = "employees.html"; // Redirect to employees page
    } else {
        alert("Invalid username or password.");
    }
});
