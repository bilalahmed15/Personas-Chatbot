"""Frontend API for the chatbot deployment service"""
import subprocess
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/deploy', methods=['POST'])
def deploy():
    """Deploy a chatbot to a GCP Rloud Run service"""
    data = request.json

    appvars = 'data[0]["projectID"] data[0]["appName"] data[0]["appRegion"] os.environ("OPENAI_KEY")'
    print(subprocess.call(['bash', '../deploy.sh', appvars], shell=True))

    response = {
        'message': 'Deployment successful'
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
