import pandas as pd
from nltk.corpus import stopwords
import re
from sklearn.cluster import KMeans
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
from textblob import TextBlob

def convert_to_float(price):
    return float(price.replace('₹', '').replace(',', ''))

def clean_text(text):
    text = text.lower()
    text = re.sub(r'[^a-zA-Z0-9\s]', ' ', text)
    stop_words = set(stopwords.words('english'))
    text = ' '.join([word for word in text.split() if word not in stop_words])
    return text

def analyze_sentiment(text):
    analysis = TextBlob(text)
    if analysis.sentiment.polarity > 0.1:
        return 'Positive'
    elif analysis.sentiment.polarity < -0.1:
        return 'Negative'
    else:
        return 'Neutral'

def feature_engineering(data):
    data['combined_text'] = data['product_name'] + ' ' + data['category_text'] + ' ' + data['about_product'] + ' ' + data['review_content']
    vectorizer = TfidfVectorizer(stop_words='english', max_df=0.95, min_df=2, ngram_range=(1, 1))
    tfidf_matrix = vectorizer.fit_transform(data['combined_text'])

    label_encoder = LabelEncoder()
    data['encoded_sentiment'] = label_encoder.fit_transform(data['sentiment'])

    cosine_sim = cosine_similarity(tfidf_matrix)
    product_user_matrix = data.pivot_table(index='product_id', values='rating', aggfunc='mean').fillna(data['rating'].mean())

    return cosine_sim, product_user_matrix, tfidf_matrix, vectorizer

def preprocess_data(data_file_path):
    df = pd.read_csv(data_file_path)
    df = df.dropna()
    df = df.drop_duplicates()

    df['discounted_price'] = df['discounted_price'].apply(convert_to_float)
    df['actual_price'] = df['actual_price'].apply(convert_to_float)
    df['discount_percentage'] = df['discount_percentage'].str.replace('%', '').astype(float)
    df['rating'] = pd.to_numeric(df['rating'].astype(str).str.replace('|', ''), errors='coerce')
    df['rating_count'] = df['rating_count'].str.replace(',', '').astype(int)
    
    df['product_name'] = df['product_name'].apply(clean_text)
    df['about_product'] = df['about_product'].apply(clean_text)
    df['review_content'] = df['review_content'].apply(clean_text)
    df['category_text'] = df['category'].apply(clean_text)
    
    df['category'] = df['category'].apply(lambda x: x.split('|') if pd.notnull(x) else x)
    df['sentiment'] = df['review_content'].apply(analyze_sentiment)
    df['parent_category'] = df['category'].apply(lambda x: x[0])

    cosine_sim, product_user_matrix, tfidf_matrix, vectorizer = feature_engineering(df)
    model, order_centroids, terms = cluster_products(df, tfidf_matrix, vectorizer)

    return df, cosine_sim, product_user_matrix, vectorizer, model, order_centroids, terms

def print_cluster(i, order_centroids, terms):
    print("Cluster %d:" % i),
    for ind in order_centroids[i, :10]:
        print(' %s' % terms[ind])

def show_recommendations(product, vectorizer, model, order_centroids, terms):
    Y = vectorizer.transform([product])
    prediction = model.predict(Y)
    return prediction[0] #return cluster number

def cluster_products(data, tfidf_matrix, vectorizer, num_k=10):
    model = KMeans(n_clusters=num_k, init='k-means++', max_iter=100, n_init=1)
    model.fit(tfidf_matrix)

    order_centroids = model.cluster_centers_.argsort()[:, ::-1]
    terms = vectorizer.get_feature_names_out()

    # print("Top terms per cluster:")
    # for i in range(num_k):
    #     print_cluster(i, order_centroids, terms)

    data['cluster'] = data['product_name'].apply((lambda name: show_recommendations(name, vectorizer, model, order_centroids, terms)))

    return model, order_centroids, terms
