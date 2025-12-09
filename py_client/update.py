import requests
endpoint = "http://localhost:8000/api/products/1/update/"
data = {
    'title': 'Better table',
    'price': '49.99'
}
response = requests.put(endpoint, json=data)

try:
    print(response.json())
except requests.exceptions.JSONDecodeError:
    print("Response is not valid JSON")