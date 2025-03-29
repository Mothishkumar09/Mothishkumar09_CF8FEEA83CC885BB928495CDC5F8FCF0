document.addEventListener("DOMContentLoaded", function() {
    const stars = document.querySelectorAll(".star");
    const feedbackForm = document.getElementById("feedbackForm");
    const toast = document.getElementById("toast");

    // Star Rating Selection
    stars.forEach(star => {
        star.addEventListener("click", function() {
            stars.forEach(s => s.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // Submit Feedback
    feedbackForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Show toast message
        toast.style.opacity = "1";
        setTimeout(() => {
            toast.style.opacity = "0";
        }, 3000);

        // Reset Form
        feedbackForm.reset();
        stars.forEach(star => star.classList.remove("active"));
    });
});

// Go Back Function
function goBack() {
    window.location.href = "settings.html";
}
