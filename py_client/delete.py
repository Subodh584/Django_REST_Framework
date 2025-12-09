import requests
endpoint8 = "http://localhost:8000/api/products/1/delete/"
response = requests.delete(endpoint8)
try:
    print(response.status_code)  
except requests.exceptions.JSONDecodeError:
    print("Response is not valid JSON")