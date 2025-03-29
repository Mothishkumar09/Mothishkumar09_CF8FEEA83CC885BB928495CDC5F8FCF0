document.addEventListener("DOMContentLoaded", function () {
    const heartRateDisplay = document.getElementById("heart-rate");
    const statusDisplay = document.getElementById("status");

    function updateHeartRate() {
        let heartRate = Math.floor(Math.random() * (100 - 60) + 60); // Simulate heart rate between 60-100 bpm
        heartRateDisplay.innerText = heartRate;

        if (heartRate < 70) {
            statusDisplay.innerText = "Normal";
            statusDisplay.style.color = "green";
        } else if (heartRate < 90) {
            statusDisplay.innerText = "Slightly High";
            statusDisplay.style.color = "orange";
        } else {
            statusDisplay.innerText = "High Alert!";
            statusDisplay.style.color = "red";
        }
    }

    setInterval(updateHeartRate, 3000); // Update heart rate every 3 seconds

    // Live Chart.js Graph
    const ctx = document.getElementById("heartChart").getContext("2d");
    let heartRateData = [72, 75, 78, 80, 76, 74, 73, 77, 79, 81];
    let labels = Array.from({ length: heartRateData.length }, (_, i) => i + 1);

    const heartChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Heart Rate (bpm)",
                    data: heartRateData,
                    borderColor: "red",
                    borderWidth: 2,
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: false, suggestedMin: 60, suggestedMax: 120 },
            },
        },
    });

    setInterval(() => {
        let newHeartRate = Math.floor(Math.random() * (100 - 60) + 60);
        if (heartRateData.length > 10) heartRateData.shift();
        heartRateData.push(newHeartRate);
        heartChart.update();
    }, 3000);
});
