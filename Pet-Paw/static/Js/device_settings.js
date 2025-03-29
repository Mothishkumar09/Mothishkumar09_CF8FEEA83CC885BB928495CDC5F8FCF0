document.addEventListener("DOMContentLoaded", function() {
    // Load saved settings from local storage
    const toggles = ["gpsToggle", "heartRateToggle", "tempToggle", "stepToggle", "bluetoothToggle", "wifiToggle"];
    
    toggles.forEach(id => {
        const toggle = document.getElementById(id);
        if (localStorage.getItem(id) === "true") {
            toggle.checked = true;
        }
        
        toggle.addEventListener("change", function() {
            localStorage.setItem(id, this.checked);
        });
    });

    // Save Button Click Event
    document.querySelector(".save-btn").addEventListener("click", function() {
        alert("✅ Settings Saved Successfully!");
    });
});
