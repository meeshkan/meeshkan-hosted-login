from flask import Flask
from flask_talisman import Talisman

app = Flask(__name__)

csp = {
    "default-src": [
        "'unsafe-inline' 'self'",
        "*.gstatic.com",
        "*.googleapis.com",
        "*.google.com",
        "*.meeshkan.io",
    ]
}
Talisman(app, content_security_policy=csp)


LOGIN_HTML = open("login.html").read()
DEBUG_HTML = open("debug.html").read()
CLIENT_JS = open("client.js").read()


@app.route("/login")
def login():
    return LOGIN_HTML


@app.route("/login/debug")
def debug():
    return DEBUG_HTML


@app.route("/login/client.js")
def client_js():
    return CLIENT_JS, 200, {"content-type": "text/javascript"}


@app.route("/_ah/warmup")
def warmup():
    return "OK"


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=9092,
        debug=True,
        extra_files=["login.html", "debug.html", "client.js"],
    )
