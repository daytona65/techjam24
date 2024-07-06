from utils.data_preprocessing import *

# case 1: cold start
def recommend_top_products(products):
    most_popular = products.sort_values('rating_count', ascending=False)
    top10 = most_popular[:10]

    #return top 10 most popular products
    return top10.to_dict('records')

#recommend items to users based on purchase history & similarity of ratings provided by other users who bought items 
# basically compare similar users and recommend
def collaborative_filtering():
    return 


def hybrid_recommendation(data, product_id, top_n=10):
    idx = data.index[data['product_id'] == product_id][0]

    print(idx)
    cosine_sim, product_user_matrix = feature_engineering(data)

    # Content-based filtering
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    content_recommendations_idx = [i[0] for i in sim_scores[1:top_n+1]]

    # Collaborative Filtering
    if product_id in product_user_matrix.index:
        current_product_rating = product_user_matrix.loc[product_id].values[0]
        similar_rating_products = product_user_matrix.iloc[(product_user_matrix['rating']-current_product_rating).abs().argsort()[:top_n]]

        # Combine recommendations
        collaborative_recommendations_idx = similar_rating_products.index
        collaborative_recommendations_idx = [data.index[data['product_id'] == pid].tolist()[0] for pid in collaborative_recommendations_idx]
        combined_indices = list(set(content_recommendations_idx + collaborative_recommendations_idx))

        recommended_products = data.iloc[combined_indices].copy()
        recommended_products = recommended_products[['product_id', 'product_name', 'rating']]

        return recommended_products