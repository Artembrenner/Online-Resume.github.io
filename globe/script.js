function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if(username === 'nittani' && password === 'a') {
        window.location.href = 'http://www.example.com';
    } else {
        alert('Incorrect username or password!');
    }
}
