import joblib
import pandas as pd

def retrieve_data(name="imdb_test.csv"):
    data = pd.read_csv(name,header=0, encoding = 'ISO-8859-1')
    X = data['text']
    return X

def predict(model, Xtest):
    predictions = model.predict([Xtest])
    return predictions

if __name__ == "__main__":
    model = joblib.load('model.joblib')
    text = "that's a lie I hate it!!."
    prediction = predict(model, text)
    print(prediction)