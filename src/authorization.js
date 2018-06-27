const login = document.getElementById('login');

login.addEventListener('click', () => {
    fetch("/api/login", {
        credentials: "include",
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(res => console.log(res));
});


const logout = document.getElementById('logout');

logout.addEventListener('click', () => {
    fetch("/api/logout", {
        credentials: "include",
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(console.log('приветы'));
});