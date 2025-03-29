document.addEventListener("DOMContentLoaded", function() {
    let steps = 0;
    const stepsCount = document.querySelector(".steps-count");
    const activityStatus = document.getElementById("status");

    function updateActivity() {
        steps += Math.floor(Math.random() * 10) + 1;
        stepsCount.textContent = steps;

        if (steps < 1000) {
            activityStatus.textContent = "Idle";
            activityStatus.style.color = "orange";
        } else if (steps < 5000) {
            activityStatus.textContent = "Active";
            activityStatus.style.color = "green";
        } else {
            activityStatus.textContent = "Highly Active";
            activityStatus.style.color = "blue";
        }
    }

    setInterval(updateActivity, 2000);

    const ctx = document.getElementById("activityChart").getContext("2d");
    const activityChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: ["1 min", "2 min", "3 min", "4 min", "5 min"],
            datasets: [{
                label: "Steps",
                data: [0, 10, 20, 30, 50],
                borderColor: "#4facfe",
                borderWidth: 2,
                fill: false
            }]
        }
    });

    setInterval(() => {
        const newStep = steps;
        activityChart.data.datasets[0].data.push(newStep);
        activityChart.data.labels.push(`${activityChart.data.labels.length + 1} min`);
        activityChart.update();
    }, 5000);
});
