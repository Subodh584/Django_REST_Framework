const loginForm = document.getElementById('login-form')
const baseEndpoint = "http://localhost:8000/api"
const responseDiv = document.getElementById('response')
const loginBtn = document.getElementById('login-btn')

if (loginForm) {
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
    responseDiv.innerHTML = '<div class="loading">Logging in...</div>'
    loginBtn.disabled = true
    loginBtn.value = 'Loading...'
}

function resetButton() {
    loginBtn.disabled = false
    loginBtn.value = 'Login'
}

function handleLogin(event) {
    event.preventDefault()
    showLoading()
    
    const username = loginForm.querySelector('input[name="username"]').value
    const password = loginForm.querySelector('input[name="password"]').value
    
    axios.post(`${baseEndpoint}/token/`, {
        username: username,
        password: password
    })
    .then(response => {
        resetButton()
        console.log('Login successful:', response.data)
        
        localStorage.setItem('access_token', response.data.access)
        localStorage.setItem('refresh_token', response.data.refresh)
        
        showResponse('Login Successful!', true, response.data)
    })
    .catch(error => {
        resetButton()
        console.error('Login failed:', error)
        
        if (error.response) {
            showResponse('Login Failed', false, error.response.data)
        } else {
            showResponse('Connection Error', false, {
                error: 'Cannot connect to server',
                note: 'Make sure Django is running on localhost:8000'
            })
        }
    })
}

function getAuthHeaders() {
    const token = localStorage.getItem('access_token')
    return {
        'Authorization': `Bearer ${token}`
    }
}

function getProducts() {
    axios.get(`${baseEndpoint}/products/`, {
        headers: getAuthHeaders()
    })
    .then(response => {
        console.log('Products:', response.data)
    })
    .catch(error => {
        console.error('Error:', error)
    })
}

function createProduct(title, content, price) {
    axios.post(`${baseEndpoint}/products/`, {
        title: title,
        content: content,
        price: price
    }, {
        headers: getAuthHeaders()
    })
    .then(response => {
        console.log('Product created:', response.data)
    })
    .catch(error => {
        console.error('Error:', error)
    })
}

function updateProduct(productId, title, content, price) {
    axios.put(`${baseEndpoint}/products/${productId}/`, {
        title: title,
        content: content,
        price: price
    }, {
        headers: getAuthHeaders()
    })
    .then(response => {
        console.log('Product updated:', response.data)
    })
    .catch(error => {
        console.error('Error:', error)
    })
}

function deleteProduct(productId) {
    axios.delete(`${baseEndpoint}/products/${productId}/`, {
        headers: getAuthHeaders()
    })
    .then(response => {
        console.log('Product deleted')
    })
    .catch(error => {
        console.error('Error:', error)
    })
}