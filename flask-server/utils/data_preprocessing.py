import pandas as pd
from nltk.corpus import stopwords
import re

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
    
    df['category'] = df['category'].apply(lambda x: x.split('|') if pd.notnull(x) else x)

    return df
