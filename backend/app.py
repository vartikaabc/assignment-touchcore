from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

subtitles = []

@app.route('/api/subtitles', methods=['POST'])
def add_subtitle():
    data = request.form
    subtitles.append(data)
    return jsonify({'message': 'Subtitle added successfully'})

@app.route('/api/subtitles', methods=['GET'])
def get_subtitles():
    return jsonify(subtitles)

if __name__ == '__main__':
    app.run(debug=True)

