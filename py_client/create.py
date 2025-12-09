import requests
endpoint = "http://localhost:8000/api/products/"
data = {
    'title': 'Desk Lamp',
    'price': '15.99'
}
response = requests.post(endpoint, data=data)
try:
    print(response.json())
except requests.exceptions.JSONDecodeError:   
    print("Response is not valid JSON")
