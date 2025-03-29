function updateMobile() {
    let newMobile = document.getElementById("newMobile").value;
    if (newMobile.trim() === "") {
        alert("Please enter a new mobile number.");
        return;
    }
    fetch('/update_mobile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newMobile: newMobile })
    }).then(response => response.json())
      .then(data => alert(data.message));
}

function updatePassword() {
    let newPassword = document.getElementById("newPassword").value;
    if (newPassword.trim() === "") {
        alert("Please enter a new password.");
        return;
    }
    fetch('/update_password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword: newPassword })
    }).then(response => response.json())
      .then(data => alert(data.message));
}

function updateEmail() {
    let newEmail = document.getElementById("newEmail").value;
    if (newEmail.trim() === "") {
        alert("Please enter a new email.");
        return;
    }
    fetch('/update_email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newEmail: newEmail })
    }).then(response => response.json())
      .then(data => alert(data.message));
}

function confirmDelete() {
    document.getElementById("deleteModal").style.display = "flex";
}

function closeModal() {
    document.getElementById("deleteModal").style.display = "none";
}

function deleteAccount() {
    fetch('/delete_account', {
        method: 'POST'
    }).then(() => {
        window.location.href = "/login";
    });
}
document.querySelector(".settings-button").addEventListener("click", function () {
    window.location.href = "account-center.html";  // Redirect to the Account Center page
});
