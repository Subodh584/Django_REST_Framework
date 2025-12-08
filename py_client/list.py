import requests
endpoint = "http://localhost:8000/api/products/list/"

response1 = requests.get(endpoint)
try:
    print(response1.json())
except requests.exceptions.JSONDecodeError:
    print("Response is not valid JSON")

response2 = requests.post(endpoint, json={
    'title': 'Dining Table',
    'content': 'A wooden dining table',
    'price': '199.99'
})
try:
    print(response2.json())
except requests.exceptions.JSONDecodeError:
    print("Response is not valid JSON")