document.addEventListener("DOMContentLoaded", function () {
    const gaugeCover = document.querySelector(".gauge-cover");
    const tempStatus = document.getElementById("temp-status");
    const ctx = document.getElementById("tempChart").getContext("2d");

    let temperature = 25; // Initial Temperature
    let tempData = [25, 26, 27, 28, 29, 30];

    // Function to Update Gauge
    function updateGauge(temp) {
        let percent = (temp - 20) * 5; // Adjust scale
        document.querySelector(".gauge-fill").style.transform = `rotate(${percent}deg)`;
        gaugeCover.innerText = `${temp}°C`;

        if (temp < 20) {
            tempStatus.innerHTML = "Low ❄️";
        } else if (temp > 35) {
            tempStatus.innerHTML = "High 🔥";
        } else {
            tempStatus.innerHTML = "Normal ✅";
        }
    }

    // Chart.js Graph for Temperature Trends
    const tempChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["1 min", "2 min", "3 min", "4 min", "5 min", "6 min"],
            datasets: [{
                label: "Temperature (°C)",
                data: tempData,
                backgroundColor: "rgba(30, 144, 255, 0.2)",
                borderColor: "#1E90FF",
                borderWidth: 2,
                fill: true,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // Simulate Real-Time Temperature Changes
    setInterval(() => {
        temperature = Math.floor(Math.random() * 10) + 25; // Generate random temp
        tempData.shift();
        tempData.push(temperature);
        tempChart.data.datasets[0].data = tempData;
        tempChart.update();
        updateGauge(temperature);
    }, 3000);

    // Back Button Function
    window.goBack = function () {
        window.location.href = "/dashboard";
    };
});
