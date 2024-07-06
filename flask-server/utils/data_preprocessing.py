import pandas as pd
from nltk.corpus import stopwords
import re
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder

def convert_to_float(price):
    return float(price.replace('₹', '').replace(',', ''))

def clean_text(text):
    text = text.lower()
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)
    stop_words = set(stopwords.words('english'))
    text = ' '.join([word for word in text.split() if word not in stop_words])
    return text

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

    return df

def feature_engineering(data):
    data['combined_text'] = data['product_name'] + ' ' + data['category'] + ' ' + data['about_product'] + ' ' + data['review_content']
    vectorizer = TfidfVectorizer(stop_words='english', max_df=0.95, min_df=2, ngram_range=(1, 1))
    tfidf_matrix = vectorizer.fit_transform(data['combined_text'])

    label_encoder = LabelEncoder()
    data['encoded_sentiment'] = label_encoder.fit_transform(data['sentiment'])

    cosine_sim = cosine_similarity(tfidf_matrix)
    product_user_matrix = data.pivot_table(index='product_id', values='rating', aggfunc='mean').fillna(data['rating'].mean())

    return cosine_sim, product_user_matrix
