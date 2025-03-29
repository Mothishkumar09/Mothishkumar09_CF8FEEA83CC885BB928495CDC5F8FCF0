from flask import Flask, render_template, request, redirect, url_for, session, jsonify
import json
import os
import csv  # ✅ Import CSV module

# Initialize Flask App
app = Flask(__name__)
app.secret_key = "your_secret_key"

# Configure Upload Folder
UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Ensure the upload folder exists

# ------------------ 🌍 LANDING & AUTHENTICATION ------------------

@app.route('/')
def logo():
    """ Landing Page """
    return render_template('logo.html')

@app.route('/login')
def login():
    """ Login Page """
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    """ Register Page """
    return render_template('register.html')

@app.route('/logout')
def logout():
    """ Logout and clear session """
    session.clear()
    return redirect(url_for('login'))

# ------------------ 🏠 HOME & DASHBOARD ------------------

@app.route('/home')
def home():
    """ Home Page - Displays Pet Avatar & Name """
    return render_template('home.html',
                           pet_avatar=session.get('pet_avatar', 'static/images/default-avatar.png'),
                           pet_name=session.get('pet_name', 'Your Pet'))

@app.route('/dashboard')
def dashboard():
    """ Dashboard Page """
    return render_template('dashboard.html')

# ------------------ 📊 INDIVIDUAL FEATURE PAGES ------------------

@app.route('/gps')
def gps_tracking():
    """ GPS Tracking Page """
    return render_template('gps.html')

@app.route('/heart-rate')
def heart_rate():
    """ Heart Rate Monitoring Page """
    return render_template('heart_rate.html')

@app.route('/temperature')
def temperature():
    """ Temperature Monitoring Page """
    return render_template('temperature.html')

@app.route('/activity')
def activity():
    """ Activity Tracking Page """
    return render_template('activity.html')

# ------------------ 🐶 PET PROFILE ------------------

@app.route('/pet-profile', methods=['GET', 'POST'])
def pet_profile():
    """ Pet Profile Page - Allows updating pet details & avatar """
    error = None

    if request.method == 'POST':
        pet_avatar = request.files.get('pet_avatar')
        pet_name = request.form.get('pet_name', '').strip()
        pet_breed = request.form.get('pet_breed', '').strip()
        pet_age = request.form.get('pet_age', '').strip()
        pet_color = request.form.get('pet_color', '').strip()

        if not pet_name or not pet_breed or not pet_age or not pet_color:
            error = "⚠️ All fields are required!"
        else:
            if pet_avatar and pet_avatar.filename:
                avatar_path = os.path.join(app.config['UPLOAD_FOLDER'], pet_avatar.filename)
                pet_avatar.save(avatar_path)
                session['pet_avatar'] = f'/static/uploads/{pet_avatar.filename}'

            session.update({
                "pet_name": pet_name,
                "pet_breed": pet_breed,
                "pet_age": pet_age,
                "pet_color": pet_color
            })

            return redirect(url_for('home'))

    return render_template('pet_profile.html', error=error,
                           pet_name=session.get('pet_name', ''),
                           pet_breed=session.get('pet_breed', ''),
                           pet_age=session.get('pet_age', ''),
                           pet_color=session.get('pet_color', ''))

# ------------------ ⚙️ SETTINGS & ACCOUNT MANAGEMENT ------------------

@app.route('/settings')
def settings():
    """ Settings Page """
    return render_template('settings.html')

@app.route('/user-profile')
def user_profile():
    """ User Profile Page """
    return render_template('user_profile.html')

@app.route('/account-center')
def account_center():
    """ Account Center Page """
    return render_template('account_center.html')

# ------------------ 🔑 ACCOUNT ACTIONS (Update & Delete) ------------------

user_data = {
    "mobile": "8270819350",
    "password": "default123",
    "email": "kaviyajayalakshmi71@gmail.com"
}

@app.route('/update-mobile', methods=['POST'])
def update_mobile():
    """ Update Mobile Number """
    data = request.json
    new_mobile = data.get('mobile')

    if new_mobile:
        user_data["mobile"] = new_mobile
        return jsonify({"status": "success", "message": "Mobile number updated successfully!"})
    return jsonify({"status": "error", "message": "Failed to update mobile number."})

@app.route('/update-password', methods=['POST'])
def update_password():
    """ Update Password """
    data = request.json
    new_password = data.get('password')

    if new_password:
        user_data["password"] = new_password
        return jsonify({"status": "success", "message": "Password updated successfully!"})
    return jsonify({"status": "error", "message": "Failed to update password."})

@app.route('/update-email', methods=['POST'])
def update_email():
    """ Update Email """
    data = request.json
    new_email = data.get('email')

    if new_email:
        user_data["email"] = new_email
        return jsonify({"status": "success", "message": "Email updated successfully!"})
    return jsonify({"status": "error", "message": "Failed to update email."})

@app.route('/delete-account', methods=['POST'])
def delete_account():
    """ Delete User Account """
    user_data.clear()
    return jsonify({"status": "success", "message": "Your account has been deleted."})

# ------------------ 📡 DEVICE SETTINGS ------------------

SETTINGS_FILE = "device_settings.json"

def get_default_settings():
    return {
        "gps_tracking": True,
        "temperature_monitoring": True,
        "activity_tracking": True,
        "heart_rate_monitoring": True,
        "notifications": True
    }

def load_settings():
    if not os.path.exists(SETTINGS_FILE):  
        save_settings(get_default_settings())  

    try:
        with open(SETTINGS_FILE, "r") as f:
            return json.load(f) or get_default_settings()
    except (json.JSONDecodeError, IOError):
        return get_default_settings()

def save_settings(settings):
    with open(SETTINGS_FILE, "w") as f:
        json.dump(settings, f, indent=4)

@app.route('/device-settings', methods=['GET'])
def device_settings():
    settings = load_settings()
    return render_template("device_settings.html", settings=settings)

@app.route('/update-device-settings', methods=['POST'])
def update_device_settings():
    try:
        data = request.json
        if not isinstance(data, dict):
            return jsonify({"error": "Invalid data format"}), 400

        save_settings(data)
        return jsonify({"message": "Settings updated successfully!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ------------------ 📝 FEEDBACK SYSTEM ------------------

FEEDBACK_FILE = "feedback_data.csv"

# ✅ Ensure feedback file is created at the start
if not os.path.exists(FEEDBACK_FILE):
    with open(FEEDBACK_FILE, "w", newline="") as file:
        writer = csv.writer(file)
        writer.writerow(["Name", "Email", "Rating", "Message"])  # CSV Headers

@app.route('/feedback')
def feedback():
    """ Feedback Page """
    return render_template('feedback.html')

@app.route('/submit-feedback', methods=['POST'])
def submit_feedback():
    data = request.json  # Get JSON data from frontend

    if not data or not all(k in data for k in ["name", "email", "rating", "message"]):
        return jsonify({"status": "error", "message": "Incomplete data"}), 400

    # Store data in CSV file
    with open(FEEDBACK_FILE, "a", newline="") as file:
        writer = csv.writer(file)
        writer.writerow([data["name"], data["email"], data["rating"], data["message"]])

    return jsonify({"status": "success", "message": "Feedback submitted successfully!"})

# ------------------ 🚀 RUN FLASK APP ------------------

if __name__ == '__main__':
    app.run(debug=True)
