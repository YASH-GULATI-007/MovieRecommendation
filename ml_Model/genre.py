# imports
import json
import numpy as np
import pandas as pd
import dill as pickle
from nltk.stem.porter import PorterStemmer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
df = pd.read_csv("ml_Model\tmdb_5000_movies.csv")
df = df[['title','genres']]


# extract all unique values of genres in list
unique_genres = []


# extracting values from json file
def extract_genre_names(json_string):
    try:
        genres = json.loads(json_string)
        genre_list_unique = set(genre["name"] for genre in genres)
        for i in genre_list_unique:
            if i not in unique_genres:
                unique_genres.append(i)
        return ", ".join(genre_list_unique)

    except (json.JSONDecodeError, TypeError):
        return None 
df['genres'] = df['genres'].apply(extract_genre_names)


# convertiung all the values to lower case
def array_lower_case(obj):
    l=[]
    l.append(obj.lower())
    return l
df['genres'] = df['genres'].apply(array_lower_case)
df['genres'] = df['genres'].apply(lambda x:" ".join(x))
df['title'] = df['title'].apply(lambda x:x.lower())


# stemming the genres to get root words
ps = PorterStemmer()
def stemmer(text):
    y = []
    for i in text.split():
        y.append(ps.stem(i))
    return " ".join(y)
df['genres'] = df['genres'].apply(stemmer)


#applying count vectorizer to form vectors
cv = CountVectorizer(max_features = 4803, stop_words = 'english')
vectors = cv.fit_transform(df['title']).toarray()


# finding similarities
similarity = cosine_similarity(vectors)
sorted(list(enumerate(similarity[0])),reverse=True,key=lambda x:x[1])[1:6]


# recommend function to find the closest values to our passed values
def recommend(movie):
    matching_movies = df[df['genres'].str.contains(movie)]
    if matching_movies.empty:
        print(f"No movies found for the genre '{movie}'. Please try a different genre.")
        return
    movie_index = matching_movies.index[0]
    distances = similarity[movie_index]
    movie_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[1:101]
    answer = [df.iloc[i[0]].title for i in movie_list]
    return answer


# stemming the unique genres 
def stem_list(values):
    # Stem each value in the list
    stemmed_values = [ps.stem(value) for value in values]
    return stemmed_values
unique_genres = stem_list(unique_genres)
unique_genres.append('scienc fict')
print(unique_genres)


# saving all the values in a json file
def save_all_recommendations_to_json():
    all_recommendations = {}
    for genre in unique_genres:
        recommendations = recommend(genre)
        if recommendations:
            all_recommendations[genre] = recommendations
    
    if all_recommendations:
        with open('all_recommendations.json', 'w') as f:
            json.dump(all_recommendations, f, ensure_ascii=False, indent=4)
        print("All recommendations saved to all_recommendations.json")
    else:
        print("No recommendations to save.")
save_all_recommendations_to_json()