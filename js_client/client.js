const loginForm = document.getElementById('login-form')
const baseEndpoint = "http://localhost:8000/api"
const responseDiv = document.getElementById('response')
const loginBtn = document.getElementById('login-btn')

// Configure Axios defaults
axios.defaults.baseURL = baseEndpoint
axios.defaults.headers.post['Content-Type'] = 'application/json'

// Axios interceptor to automatically add token to requests
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('access_token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// Axios interceptor to handle token refresh on 401 errors
axios.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config
        
        // If 401 error and we haven't tried to refresh yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true
            
            const refreshToken = localStorage.getItem('refresh_token')
            if (refreshToken) {
                try {
                    const response = await axios.post('/token/refresh/', {
                        refresh: refreshToken
                    })
                    
                    // Save new access token
                    localStorage.setItem('access_token', response.data.access)
                    
                    // Retry original request with new token
                    originalRequest.headers.Authorization = `Bearer ${response.data.access}`
                    return axios(originalRequest)
                } catch (refreshError) {
                    // Refresh failed, clear tokens and redirect to login
                    localStorage.removeItem('access_token')
                    localStorage.removeItem('refresh_token')
                    console.log('Token refresh failed, please login again')
                }
            }
        }
        
        return Promise.reject(error)
    }
)

if (loginForm) {
    // handle this login form
    loginForm.addEventListener('submit', handleLogin)
}

function showResponse(message, isSuccess, data = null) {
    responseDiv.style.display = 'block'
    responseDiv.className = isSuccess ? 'success' : 'error'
    
    let html = `<h3>${message}</h3>`
    if (data) {
        html += `<pre>${JSON.stringify(data, null, 2)}</pre>`
    }
    responseDiv.innerHTML = html
}

function showLoading() {
    responseDiv.style.display = 'block'
    responseDiv.className = ''
    responseDiv.innerHTML = '<div class="loading">⏳ Logging in...</div>'
    loginBtn.disabled = true
    loginBtn.value = 'Loading...'
}

function resetButton() {
    loginBtn.disabled = false
    loginBtn.value = 'Login'
}

function handleLogin(event) {
    console.log(event)
    event.preventDefault()
    
    showLoading()
    
    const loginEndpoint = `${baseEndpoint}/token/`
    let loginFormData = new FormData(loginForm)
    let loginObjectData = Object.fromEntries(loginFormData)
    
    // Using Axios instead of fetch
    axios.post(loginEndpoint, loginObjectData, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        // Axios automatically parses JSON and puts it in response.data
        console.log('Response status:', response.status)
        console.log('Response data:', response.data)
        resetButton()
        
        showResponse('✅ Login Successful!', true, response.data)
        
        // Store tokens (in real app, use more secure storage)
        if (response.data.access) {
            localStorage.setItem('access_token', response.data.access)
            localStorage.setItem('refresh_token', response.data.refresh)
            console.log('Tokens saved to localStorage')
        }
    })
    .catch(error => {
        console.error('Error:', error)
        resetButton()
        
        // Axios puts server response in error.response
        if (error.response) {
            // Server responded with error status (4xx, 5xx)
            console.log('Error response:', error.response.data)
            showResponse('❌ Login Failed', false, error.response.data)
        } else if (error.request) {
            // Request was made but no response received
            showResponse('❌ Connection Error', false, {
                error: 'No response from server',
                note: 'Make sure the Django server is running on localhost:8000'
            })
        } else {
            // Something else happened
            showResponse('❌ Error', false, {
                error: error.message
            })
        }
    })
}

// Example: Get all products (authenticated request)
async function getProducts() {
    try {
        const response = await axios.get('/products/')
        console.log('Products:', response.data)
        return response.data
    } catch (error) {
        console.error('Error fetching products:', error)
        throw error
    }
}

// Example: Create a new product (authenticated request)
async function createProduct(productData) {
    try {
        const response = await axios.post('/products/', productData)
        console.log('Product created:', response.data)
        return response.data
    } catch (error) {
        console.error('Error creating product:', error)
        throw error
    }
}

// Example: Update a product (authenticated request)
async function updateProduct(productId, productData) {
    try {
        const response = await axios.put(`/products/${productId}/`, productData)
        console.log('Product updated:', response.data)
        return response.data
    } catch (error) {
        console.error('Error updating product:', error)
        throw error
    }
}

// Example: Delete a product (authenticated request)
async function deleteProduct(productId) {
    try {
        const response = await axios.delete(`/products/${productId}/`)
        console.log('Product deleted')
        return response.data
    } catch (error) {
        console.error('Error deleting product:', error)
        throw error
    }
}

// Expose functions to window for testing in console
window.api = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
}