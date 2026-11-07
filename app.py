from flask import Flask, send_from_directory, request, jsonify
import sqlite3
import os
from datetime import datetime

# Isse python khud aapke folder ka exact rasta dhoond lega safely
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__, static_folder=BASE_DIR, template_folder=BASE_DIR)
DB_PATH = os.path.join(BASE_DIR, 'database.db')

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS waste_logs (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT,
            facility TEXT,
            material TEXT,
            mass_kg REAL,
            cost_usd REAL
        )
    ''')
    conn.commit()
    conn.close()

init_db()

@app.route('/')
def home():
    # Explicitly telling Python to search for index.html in your main folder
    return send_from_directory(BASE_DIR, 'index.html')

@app.route('/<path:filename>')
def serve_static_files(filename):
    # This will dynamically serve style.css and app.js from the same folder
    return send_from_directory(BASE_DIR, filename)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    facility = data.get('facility')
    material = data.get('material')
    mass = float(data.get('mass', 0))

    predicted_cost = round(mass * 1.5, 2)
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO waste_logs (timestamp, facility, material, mass_kg, cost_usd)
        VALUES (?, ?, ?, ?, ?)
    ''', (timestamp, facility, material, mass, predicted_cost))
    conn.commit()
    conn.close()

    return jsonify({
        "status": "Saved to Database Successfully",
        "timestamp": timestamp,
        "cost": predicted_cost
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
