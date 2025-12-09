const loginForm = document.getElementById('login-form')
const baseEndpoint = "http://localhost:8000/api"
const responseDiv = document.getElementById('response')
const loginBtn = document.getElementById('login-btn')

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
    let bodyStr = JSON.stringify(loginObjectData)
    
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: bodyStr
    }
    
    fetch(loginEndpoint, options)
        .then(response => {
            console.log('Response status:', response.status)
            return response.json().then(data => ({
                status: response.status,
                ok: response.ok,
                data: data
            }))
        })
        .then(result => {
            console.log('Response data:', result.data)
            resetButton()
            
            if (result.ok) {
                showResponse('✅ Login Successful!', true, result.data)
                
                // Store tokens (in real app, use more secure storage)
                if (result.data.access) {
                    localStorage.setItem('access_token', result.data.access)
                    localStorage.setItem('refresh_token', result.data.refresh)
                    console.log('Tokens saved to localStorage')
                }
            } else {
                showResponse('❌ Login Failed', false, result.data)
            }
        })
        .catch(err => {
            console.error('Error:', err)
            resetButton()
            showResponse('❌ Connection Error', false, {
                error: err.message,
                note: 'Make sure the Django server is running on localhost:8000'
            })
        })
}