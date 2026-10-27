import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

class Recommender:
    def __init__(self, products):
        self.products = products
        self.ids = [p['_id'] for p in products]
        texts = [
            f"{p['name']} {p.get('category','')} {p.get('description','')}"
            for p in products
        ]
        self.vectorizer = TfidfVectorizer(stop_words='english')
        self.matrix = self.vectorizer.fit_transform(texts)

    def recommend(self, product_id, top_k=4):
        if product_id not in self.ids:
            return []
        idx = self.ids.index(product_id)
        scores = cosine_similarity(self.matrix[idx], self.matrix).flatten()
        order = np.argsort(scores)[::-1]
        results = []
        for i in order[1:top_k+1]:
            results.append(self.ids[i])
        return results