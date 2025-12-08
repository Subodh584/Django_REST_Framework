import requests
endpoint = "http://localhost:8000/api/products/1/"
response = requests.get(endpoint)
try:
    print(response.json())
except requests.exceptions.JSONDecodeError:
    print("Response is not valid JSON")