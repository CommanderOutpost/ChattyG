from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

import joblib
import pandas as pd
import os

from sentiment_analysis import utils


@csrf_exempt
def sentiment_analysis_view(request):
    dir = os.path.dirname(os.path.abspath(__file__))
    if request.method == 'POST':
        text = request.POST.get('text')
        if text:
            model = joblib.load(dir + '/model.joblib')
            prediction = utils.predict(model, text)
            context = {'prediction': str(prediction)}
            return JsonResponse(context)
        else:
            return JsonResponse({'error': 'Text is missing'}, status=400)

