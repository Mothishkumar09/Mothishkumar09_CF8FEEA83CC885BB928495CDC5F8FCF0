document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");
    
    if (registerForm) {
        registerForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent default form submission

            const email = document.getElementById("email").value.trim();
            const mobile = document.getElementById("mobile").value.trim();
            const password = document.getElementById("password").value.trim();
            const confirmPassword = document.getElementById("confirm_password").value.trim();
            const errorMessage = document.getElementById("error-message");

            // Validate Mobile Number (should be 10 digits)
            if (!/^\d{10}$/.test(mobile)) {
                errorMessage.textContent = "Enter a valid 10-digit mobile number.";
                return;
            }

            // Validate Password Match
            if (password !== confirmPassword) {
                errorMessage.textContent = "Passwords do not match.";
                return;
            }

            // Simulate Storing User Data (Fake Backend)
            localStorage.setItem("userEmail", email);
            localStorage.setItem("userMobile", mobile);
            localStorage.setItem("userPassword", password);

            alert("Registration successful! Redirecting to Login...");
            window.location.href = "/login";
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent default form submission

            const emailOrMobile = document.getElementById("email_or_mobile").value.trim();
            const password = document.getElementById("login_password").value.trim();
            const errorMessage = document.getElementById("login-error-message");

            // Retrieve stored user credentials
            const storedEmail = localStorage.getItem("userEmail");
            const storedMobile = localStorage.getItem("userMobile");
            const storedPassword = localStorage.getItem("userPassword");

            // Check if input matches stored credentials
            if (
                (emailOrMobile === storedEmail || emailOrMobile === storedMobile) &&
                password === storedPassword
            ) {
                alert("Login successful! Redirecting to Home...");
                window.location.href = "/home";
            } else {
                errorMessage.textContent = "Invalid email, mobile, or password.";
            }
        });
    }
});
