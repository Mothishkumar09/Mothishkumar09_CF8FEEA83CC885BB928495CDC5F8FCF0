document.addEventListener("DOMContentLoaded", function () {
    console.log("Metrics Page Loaded!");

    // Simulating Real-Time Updates (Replace with actual API data in the future)
    function updateMetric(metricId, min, max, unit) {
        document.getElementById(metricId).innerText = (Math.random() * (max - min) + min).toFixed(1) + unit;
    }

    function refreshMetrics() {
        updateMetric("gps-location", 12.9716, 12.9816, " (Live GPS)");
        updateMetric("heart-rate", 60, 120, " bpm");
        updateMetric("temperature", 36, 39, "°C");
        updateMetric("steps-count", 1000, 10000, " steps");
    }

    setInterval(refreshMetrics, 3000);
    refreshMetrics();
});
