function login() {
    // Obtener valores de usuario y contraseña
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Realizar la solicitud al back-end 
    fetch('https://movies-bdybbhbt8-enrique-herranz-mate-projects.vercel.app/users/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
    })
    .then(response => response.json())
    .then(data => {
      // Manejar la respuesta del servidor aquí
      console.log(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  