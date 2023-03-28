const form = document.querySelector('form');
const usernameIn = document.querySelector('#username');
const passwordIn = document.querySelector('#password');
const loginBtn = document.querySelector('#login')
const registerBtn = document.querySelector('#register')
const h2Res = document.querySelector('#responsH2')

registerBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    const username = usernameIn.value;
    const password = passwordIn.value;

    const respons = await fetch('http://localhost:5050/auth/register', {
        method: 'POST',
        body: JSON.stringify({username, password}),
        credentials: "include",
        headers: {
            "content-type": "application/json"
        }
    })
    const data = await respons.text()
    h2Res.textContent = await data
        
    
})

loginBtn.addEventListener('click', async (event) => {
    event.preventDefault()
    const username = usernameIn.value;
    const password = passwordIn.value;

    const respons = await fetch('http://localhost:5050/auth/login', {
        method: 'POST',
        body: JSON.stringify({username, password}),
        credentials: "include",
        headers: {
            "content-type": "application/json"
        }
    })
    const data = await respons.text()

    if (respons.status !== 200) {
        h2Res.textContent = data
    } else {
        localStorage.setItem('username', data)
        window.location.href="../todos/todo.html"
    }
})