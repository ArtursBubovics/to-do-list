from flask import Flask, jsonify, request
from flask_cors import CORS
import pyodbc

app = Flask(__name__)
CORS(app)

con = pyodbc.connect('DRIVER={SQL Server};Server=LAPTOP-BA0NQS8I\SQLEXPRESS;Database=toDoDB;Port=myport;Trusted_Connection=yes;')

cursor = con.cursor()

@app.route('/api/checkRegistrationUser', methods=['POST'])
def check_registration_user():
    try:
        gmail = request.json['gmail']

        cursor.execute("SELECT COUNT(*) FROM [user] WHERE gmail = ? ", (gmail, ))
        exists = cursor.fetchone()[0] > 0

        return jsonify({"exists": exists})
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route('/api/checkLoginUser', methods=['POST'])
def check_login_user():
    try:
        gmail = request.json['gmail']
        password = request.json['password']

        cursor.execute("SELECT COUNT(*) FROM [user] WHERE gmail = ? AND password = ?", (gmail, password))
        exists = cursor.fetchone()[0] > 0

        return jsonify({"exists": exists})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/api/checkUserID', methods=['POST'])
def check_id_user():
    try:
        gmail = request.json['gmail']
        password = request.json['password']

        cursor.execute("SELECT userID FROM [user] WHERE gmail = ? AND password = ?", (gmail, password))
        
        user_id = cursor.fetchone()

        if user_id:  
            return jsonify({"user_id": user_id[0]})
        else:
            return jsonify({"error": "Пользователь с указанными учетными данными не найден"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/api/addUser', methods=['POST'])
def add_user():
    try:
        gmail = request.json['gmail']
        password = request.json['password']

        # cursor.execute("INSERT INTO [user] (gmail, password) VALUES (?, ?)", (gmail, password))
        con.commit()

        return jsonify({"message": "Пользователь успешно зарегистрирован."})
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
@app.route('/api/data/task', methods=['GET'])
def get_data():
    try:
        user_id = request.args.get('userId')

        cursor.execute("SELECT * FROM task WHERE userID = ?", (user_id,))
        data = cursor.fetchall()

        formatted_data = [
            {'toDoID': row[0], 'text': row[1], 'isChecked': bool(row[2])} for row in data
        ]

        response_data = {"data": formatted_data}
        return jsonify(response_data)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)