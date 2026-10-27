from flask import Flask, request, jsonify
from flask_cors import CORS
import os, json
from recommender import Recommender

app = Flask(__name__)
CORS(app)

# A static catalogue; in production, fetch from MongoDB
with open(os.path.join(os.path.dirname(__file__), 'products.json')) as f:
    PRODUCTS = json.load(f)

rec = Recommender(PRODUCTS)

@app.route('/health')
def health():
    return {'ok': True}

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json() or {}
    pid = data.get('productId')
    ids = rec.recommend(pid, top_k=4)
    return jsonify({'recommendedIds': ids})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)