import requests
# endpoint1 = "https://httpbin.org/"
# response = requests.get(endpoint1)
# #print(response.text)

# endpoint2 = "https://httpbin.org/anything"
# response2 = requests.get(endpoint2)
# #print(response2.json())

# endpoint3 = "https://httpbin.org/anything"
# response3 = requests.get(endpoint3, json={'Subodh': 'is great'})
# #print(response3.json())

# endpoint4 = "https://httpbin.org/anything"
# response4 = requests.post(endpoint4, data={'Subodh': 'is great'})
# #print(response4.json())

# endpoint5 = "https://httpbin.org/anything"
# response5 = requests.post(endpoint5)
# #print(response5.status_code)

# endpoint6 = "http://localhost:8000"
# response6 = requests.get(endpoint6)
# #print(response6.text)
# #print(response6.status_code)

# endpoint7 = "http://localhost:8000/api/"
# response7 = requests.get(endpoint7)
# print(response7.json())


endpoint8 = "http://localhost:8000/api/post-example/"
response8 = requests.post(endpoint8, json={
    'title': 'Fan',
    'content': 'A nice ceiling fan',
    'price': '29.99'
})

if response8.text:
    try:
        print(f"JSON Response: {response8.json()}")
    except requests.exceptions.JSONDecodeError:
        print("Response is not valid JSON")
else:
    print("Response is empty")