# import statements
import pandas as pd
import numpy as np
import json


# load file
df = pd.read_csv("tmdb_5000_movies.csv")
df = df[['title','popularity']]


# remove null values
df=df.dropna()


# convert to lower case
df['title'] = df['title'].apply(lambda x:x.lower())


# find the values and sort them in descending ans convert them to list
array_list = df.sort_values(by="popularity", ascending=False).head(100)["title"].values.tolist()


# open a json file and append the values
with open('popularity.json', 'w') as file:
    json.dump(array_list, file, indent=4)