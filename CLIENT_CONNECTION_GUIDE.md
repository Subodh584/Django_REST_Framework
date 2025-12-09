# Client Connection Guide

## ✅ Setup Complete!

Your Django backend and clients are now connected and ready to use!

## 🚀 Running Servers

### Backend Server (Django)
**Status:** ✅ Running on http://localhost:8000

To start manually:
```bash
cd backend
python manage.py runserver
```

### JavaScript Client
**Status:** ✅ Running on http://localhost:8111

To start manually:
```bash
cd js_client
python -m http.server 8111
```

## 👤 Test User Credentials

You can now login with:
- **Username:** `testuser`
- **Password:** `testpass123`

## 🌐 Access Points

### JavaScript Client
Open your browser and go to:
- **URL:** http://localhost:8111
- This will show the login form
- Open browser console (F12) to see API responses

### Python Client
Run any of the Python client scripts:
```bash
cd py_client
python jwt.py          # JWT authentication example
python create.py       # Create products
python list.py         # List products
python detail.py       # Get product details
python update.py       # Update products
python delete.py       # Delete products
```

## 📡 API Endpoints

The Django backend provides these endpoints:

### Authentication
- `POST /api/token/` - Get JWT access & refresh tokens
- `POST /api/token/refresh/` - Refresh access token
- `POST /api/token/verify/` - Verify token

### Products
- `GET /api/products/` - List all products
- `POST /api/products/` - Create product
- `GET /api/products/{id}/` - Get product detail
- `PUT /api/products/{id}/` - Update product
- `DELETE /api/products/{id}/` - Delete product

### Articles
- `GET /api/articles/` - List articles
- `POST /api/articles/` - Create article
- `GET /api/articles/{id}/` - Get article detail

### Search
- `GET /api/search/` - Search products and articles

## 🔧 CORS Configuration

CORS is configured to allow requests from:
- http://localhost:8111 (JavaScript client)
- https://localhost:8111

## 🧪 Testing the Connection

### Test 1: JavaScript Client Login
1. Open http://localhost:8111 in your browser
2. Enter credentials:
   - Username: `testuser`
   - Password: `testpass123`
3. Click "Login"
4. Open browser console (F12) to see the JWT tokens response

### Test 2: Python Client
```bash
cd py_client
python basic.py
```

This will make a request to the Django API and print the response.

## 🐛 Troubleshooting

### Django Server Not Running?
```bash
cd backend
python manage.py runserver
```

### JS Client Not Loading?
```bash
cd js_client
python -m http.server 8111
```

### CORS Errors?
Make sure:
1. Django server is running on port 8000
2. JS client is served from port 8111
3. CORS settings in `backend/cfehome/settings.py` include `http://localhost:8111`

### Module Not Found Errors?
Install requirements:
```bash
pip install -r requirements.txt
```

## 📝 Next Steps

1. **Create more users:** 
   ```bash
   cd backend
   python manage.py createsuperuser
   ```

2. **Access Django Admin:**
   - URL: http://localhost:8000/admin
   - Create products, articles, etc. via admin panel

3. **Customize the JS Client:**
   - Edit `js_client/client.js` to add more API calls
   - Edit `js_client/index.html` to improve the UI

4. **Test Python Client:**
   - Check out all scripts in `py_client/` directory
   - Modify them to test different API endpoints

## 📚 Documentation

- Django REST Framework: https://www.django-rest-framework.org/
- JWT Authentication: https://django-rest-framework-simplejwt.readthedocs.io/
- CORS Headers: https://github.com/adamchainz/django-cors-headers

---

**Need help?** Check the console logs in your browser or terminal for detailed error messages.
