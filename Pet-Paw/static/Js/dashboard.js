document.addEventListener("DOMContentLoaded", function () {
    console.log("Dashboard Loaded!");
    function goToHome() {
        window.location.href = "/"; // Adjust URL if needed
    }    

    // Toggle Sidebar
    function toggleSidebar() {
        let sidebar = document.getElementById("sidebar");
        sidebar.style.left = (sidebar.style.left === "0px") ? "-250px" : "0px";
    }

    document.querySelector(".menu-btn").addEventListener("click", toggleSidebar);
    document.querySelector(".close-btn").addEventListener("click", toggleSidebar);

    // Smooth Button Animation
    const buttons = document.querySelectorAll(".dashboard-btn");
    buttons.forEach((button) => {
        button.addEventListener("mouseover", function () {
            this.style.transform = "scale(1.1)";
        });

        button.addEventListener("mouseout", function () {
            this.style.transform = "scale(1)";
        });
    });
});
