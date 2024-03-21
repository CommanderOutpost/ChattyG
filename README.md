# ChattyG App

ChattyG is a real-time chat application with sentiment analysis. It is built using Node.js, Express, and Socket.io on the app backend, and Vanilla JS on the frontend. The sentiment analysis app is built using Django and the model was trained using Sklearn.

## Usage

Try ChattyG here https://chattyg.onrender.com/

To use ChattyG locally, follow these steps:

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

3. Start servers
```
npm --prefix chatapp/ run all
```


4. Go to localhost:3000 in browser
