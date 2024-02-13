from flask import Flask, jsonify, request
from flask_cors import CORS
import pyodbc

app = Flask(__name__)
CORS(app)

con = pyodbc.connect('DRIVER={SQL Server};Server=LAPTOP-BA0NQS8I\SQLEXPRESS;Database=toDoDB;Port=myport;Trusted_Connection=yes;')

cursor = con.cursor()

NOT_CHECKED = 0

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
            return jsonify({"error": "User with the provided credentials was not found."}), 404 

    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/api/addUser', methods=['POST'])
def add_user():
    try:
        gmail = request.json['gmail']
        password = request.json['password']

        cursor.execute("INSERT INTO [user] (gmail, password) VALUES (?, ?)", (gmail, password))
        con.commit()

        cursor.execute("SELECT userID FROM [user] WHERE gmail = ? AND password = ?", (gmail, password))
        user_id = cursor.fetchone()[0]

        return jsonify({"message": "The user has been successfully registered.", "user_id": user_id})
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    

@app.route('/api/data/task', methods=['GET'])
def get_data():
    try:
        user_id = request.args.get('userId')

        cursor.execute("SELECT * FROM task WHERE userID = ?", (user_id,))
        data = cursor.fetchall()

        formatted_data = [
            {'_id': row[0], 'text': row[1], 'isChecked': bool(row[2])} for row in data
        ]

        response_data = {"data": formatted_data}
        return jsonify(response_data)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/addTask', methods=['POST'])
def add_task():
    try:
        text = request.json['text']
        isChecked = NOT_CHECKED
        user_id = request.json['user_id']

        cursor.execute("INSERT INTO [task] (text, isChecked, userID) VALUES (?,?,?)", (text, isChecked, user_id))
        con.commit()

        return jsonify({"message": "The task has been successfully added.", "ok": True})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/api/deleteTask', methods=['POST'])
def delete_task():
    try:
        fieldId = request.json['fieldId']

        cursor.execute("DELETE FROM [task] WHERE toDoID = ?", (fieldId,))
        con.commit()

        return jsonify({"message": "The task has been successfully deleted.", "ok": True})
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
@app.route('/api/updateTask/text', methods=['POST'])
def update_task_text():
    try:
        fieldId = request.json['fieldId']
        newText = request.json['newText']

        cursor.execute("UPDATE [task] SET text = ? WHERE toDoID = ?", (newText, fieldId))
        con.commit()

        return jsonify({"message": "The task has been successfully updated.", "ok": True})
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
@app.route('/api/updateTask/checkbox', methods=['POST'])
def update_task_checkbox():
    try:
        fieldId = request.json['fieldId']
        checkboxValue = request.json['checkboxValue']

        cursor.execute("UPDATE [task] SET isChecked = ? WHERE toDoID = ?", (checkboxValue, fieldId))
        con.commit()

        return jsonify({"message": "The task has been successfully updated.", "ok": True})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)