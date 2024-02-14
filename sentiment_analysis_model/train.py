from sklearn.feature_extraction.text import CountVectorizer, TfidfTransformer
from sklearn.linear_model import SGDClassifier
from sklearn.pipeline import Pipeline
import joblib
import os
import pandas as pd
import numpy as np

def imdb_data_preprocess(inpath, outpath="./", name="imdb_tr.csv", mix=False):
    stopwords = open("stopwords.en.txt", 'r', encoding="ISO-8859-1").read()
    stopwords = stopwords.split("\n")

    indices = []
    text = []
    rating = []

    i = 0

    for sentiment in ["pos", "neg"]:
        for filename in os.listdir(os.path.join(inpath, sentiment)):
            data = open(os.path.join(inpath, sentiment, filename), 'r', encoding="ISO-8859-1").read()
            data = remove_stopwords(data, stopwords)
            indices.append(i)
            text.append(data)
            rating.append("1" if sentiment == "pos" else "0")
            i += 1

    dataset = list(zip(indices, text, rating))

    if mix:
        np.random.shuffle(dataset)

    df = pd.DataFrame(data = dataset, columns=['row_Number', 'text', 'polarity'])
    df.to_csv(outpath+name, index=False, header=True)

def remove_stopwords(sentence, stopwords):
    sentencewords = sentence.split()
    resultwords  = [word for word in sentencewords if word.lower() not in stopwords]
    result = ' '.join(resultwords)
    return result

def retrieve_data(name="imdb_tr.csv"):
    data = pd.read_csv(name,header=0, encoding = 'ISO-8859-1')
    X = data['text']
    Y = data['polarity']
    return X, Y

def train_model(Xtrain, Ytrain):
    text_clf = Pipeline([
        ('vect', CountVectorizer()),
        ('tfidf', TfidfTransformer()),
        ('clf', SGDClassifier(loss="hinge", penalty="l1", max_iter=20, tol=None)),
    ])
    text_clf.fit(Xtrain, Ytrain)
    return text_clf

if __name__ == "__main__":
    imdb_data_preprocess(inpath="aclImdb/train/", mix=True)
    print("Retrieving data...")
    Xtrain, Ytrain = retrieve_data()
    print("Data retrieved.")
    print("Training model...")
    model = train_model(Xtrain, Ytrain)
    print("Model trained.")
    joblib.dump(model, 'model.joblib')