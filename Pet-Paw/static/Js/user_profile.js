document.addEventListener("DOMContentLoaded", function () {
    // Handle form submission
    const profileForm = document.querySelector("#profile-form");

    if (profileForm) {
        profileForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent default form submission

            // Get form values
            const name = document.querySelector('input[name="name"]').value.trim();
            const email = document.querySelector('input[name="email"]').value.trim();
            const mobile = document.querySelector('input[name="mobile"]').value.trim();
            const dob = document.querySelector('input[name="dob"]').value;
            const username = document.querySelector('input[name="username"]').value.trim();

            if (!name || !email || !mobile || !dob || !username) {
                alert("⚠️ All fields are required!");
                return;
            }

            // Submit the form after validation
            profileForm.submit();
        });
    }

    // Add animation to buttons
    const buttons = document.querySelectorAll("button");
    buttons.forEach((btn) => {
        btn.addEventListener("mouseover", () => {
            btn.style.transform = "scale(1.05)";
        });

        btn.addEventListener("mouseout", () => {
            btn.style.transform = "scale(1)";
        });
    });
});
document.getElementById("userProfileForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page refresh

    // Fetch values entered by the user
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const mobile = document.getElementById("mobile").value;
    const dob = document.getElementById("dob").value;
    const username = document.getElementById("username").value;

    // Simulate saving data (You can replace this with an API call)
    console.log("User Profile Saved:", { name, email, mobile, dob, username });

    // Show a confirmation message
    alert("Profile saved successfully!");

    // Clear the form fields after saving
    document.getElementById("userProfileForm").reset();
});
