from utils.data_preprocessing import *

# case 1: cold start
def recommend_top_products(data_file_path):
    products = preprocess_data(data_file_path)
    most_popular = products.sort_values('rating_count', ascending=False)
    top10 = most_popular[:10]

    #return top 10 most popular products
    return top10.to_dict('records')


def collaborative_filtering():
    return 
