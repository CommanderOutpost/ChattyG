# ChattyG App

ChattyG is a real-time chat application with sentiment analysis. It is built using Node.js, Express, and Socket.io on the app backend, and Vanilla JS on the frontend. The sentiment analysis app is built using Django and the model was trained using Sklearn.
'
## Usage

To use ChattyG, follow these steps:

### MacOS and Linux

1. Clone repo
```
git clone https://github.com/CommanderOutpost/ChattyG.git
```

2. Install dependencies
In ChattyG directory:
```
pip install -r requirements.txt
npm --prefix chatapp/ install
```

3. Set up .env file
```
echo "SENTIMENT_API_URL=http://127.0.0.1:8000/sentiment/" >> chatapp/.env
```

3. Start servers
- Django Server:
```
python3 sentiment_analysis_app/manage.py runserver &
```
- Express Server:
```
npm --prefix chatapp/ start
```

3. Go to localhost:3000 in browser
