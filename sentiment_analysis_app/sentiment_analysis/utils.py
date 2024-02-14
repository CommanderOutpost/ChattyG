def predict(model, text):
    predictions = model.predict([text])
    return predictions[0]
