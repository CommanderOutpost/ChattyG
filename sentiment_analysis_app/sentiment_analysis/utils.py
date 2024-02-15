def predict(model, text):
    predictions = model.predict_proba([text])
    return predictions[0][1]
