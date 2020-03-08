from flask import Flask,request
import requests
from collections import defaultdict
import ssl
import json
context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
context.load_cert_chain('./cert.pem', './key.pem')

app = Flask(__name__)

key = defaultdict(str);
hds = {"authorization": "Basic T3NjYXJTaGktZUJhZS1QUkQtMDY5ZWFiYzg5LTNhMTY1ZThmOlBSRC02OWVhYmM4OTMyMWYtOWI4Zi00Y2MwLTllODUtODhmZg==", "content-type": "application/x-www-form-urlencoded"}
code = defaultdict(str);
cachedvars = defaultdict(str);

@app.route('/get')
def index():
    global key
    global code
    d = {"grant_type":"authorization_code", "code":key[request.remote_addr], "redirect_uri":"Oscar_Shi-OscarShi-eBae-P-pqjdex"}
    rq = requests.post('https://api.ebay.com/identity/v1/oauth2/token', data=d, headers=hds)
    if(rq.status_code == 200):
        print(rq.json()['access_token'])
        code[request.remote_addr] = rq.json()['access_token']
    return code[request.remote_addr];


@app.route('/register/')
def reg():
    global key
    key[request.remote_addr] = request.args['code']
    print(key)
    return "Authenticated, you can close me now"

@app.route('/cachevars', methods = ['POST'])
def cache():
    global cachedvars
    print(request.form)
    print(request.remote_addr)
    cachedvars[request.remote_addr] = request.get_json()
    print("HI")
    return "done"

@app.route('/getcachedvars')
def getcache():
    global cachedvars
    print(cachedvars[request.remote_addr])
    return json.dumps(cachedvars[request.remote_addr])


if __name__ == '__main__':
    app.run(host='0.0.0.0',port=443, ssl_context=context)

