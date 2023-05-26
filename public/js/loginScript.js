(function() {
    const formLogin = document.getElementById('form-login');
    const inputEmail = document.getElementById('email');
    const inputPassword = document.getElementById('password');
    formLogin.addEventListener('submit', async (event) => {
      event.preventDefault();
      const data = {
        email: inputEmail.value,
        password: inputPassword.value,
      };
  
      fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('data:', data);
          if (data.success) {
            alert('Login successfully. Redirecting to private page...')
            window.location.href = '/private.html'
          } else {
            alert(data.message);
          }
        }
        )
        .catch((error) => {
          console.error('Error:', error);
        });
    });
  
})();