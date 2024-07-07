from utils.data_preprocessing import *
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer
from sklearn.neighbors import NearestNeighbors
from sklearn.cluster import KMeans
from sklearn.metrics import adjusted_rand_score

'''
CASE 1: cold start
'''
def recommend_top_products(products):
    most_popular = products.sort_values('rating_count', ascending=False)
    
    # get most popular product from each category
    top10 = most_popular.groupby('parent_category').first()

    #return top 10 most popular products
    return top10.to_dict('records')

'''
CASE 2: hybrid filtering if there is likes data

- content based filtering - find objects that are similar to recent likes & searches
- collaborative filtering - use similar user ratings data

product_id will be based on user's likes
'''

def content_based_filtering(cosine_sim, idx, top_n):
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    content_recommendations_idx = [i[0] for i in sim_scores[1:top_n+1]]

    return content_recommendations_idx

def hybrid_recommendation(data, product_id, cosine_sim, product_user_matrix, top_n=5):
    idx = data.index[data['product_id'] == product_id][0]
    print('finding recommendations for product:', product_id)

    # Content-based filtering
    content_recommendations_idx = content_based_filtering(cosine_sim, idx, top_n)

    # Collaborative Filtering
    if product_id in product_user_matrix.index:
        current_product_rating = product_user_matrix.loc[product_id].values[0]
        similar_rating_products = product_user_matrix.iloc[(product_user_matrix['rating']-current_product_rating).abs().argsort()[:top_n]]

        # Combine recommendations   
        collaborative_recommendations_idx = similar_rating_products.index
        collaborative_recommendations_idx = [data.index[data['product_id'] == pid].tolist()[0] for pid in collaborative_recommendations_idx]
        combined_indices = list(set(content_recommendations_idx + collaborative_recommendations_idx))

        recommended_products = data.iloc[combined_indices].copy()
        print(len(recommended_products))

        return recommended_products.to_dict('records')
    
'''
CASE 3: search engine based recommendations if no likes data but there is search data
K means clustering 
'''
def search_recommendation(data, search_term, vectorizer, model, order_centroids, terms):
    recommended_cluster = show_recommendations(search_term, vectorizer, model, order_centroids, terms)
    print_cluster(recommended_cluster, order_centroids, terms)

    product_in_same_cluster = data[data['cluster'] == recommended_cluster]
    # most_popular_in_cluster = product_in_same_cluster.sort_values('rating_count', ascending=False)

    return product_in_same_cluster.sample(n=10).to_dict('records')











