document.getElementById("form").addEventListener("submit", function(event) {
    if (!validateForm()) {
        event.preventDefault();
    }});

function validateForm(){ 
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");
    let validForm = true;

    // Verificar si los campos están vacíos

    if (email.value.trim() === '') {
        email.classList.add('error');
        emailError.innerText = 'El correo electrónico es obligatorio.';
        validForm = false;
    } else {
        // Verificar formato de email
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value.trim())) {
            email.classList.add('error');
            emailError.innerText = 'El correo electrónico no es válido';
            validForm = false;
        } else {
            email.classList.remove('error');
            emailError.innerText = '';
        }
    }

    if (password.value.trim() === '') {
        password.classList.add('error');
        passwordError.innerText = 'La contraseña es obligatoria';
        validForm = false;
    } else {
        password.classList.remove('error');
        passwordError.innerText = '';
    }
    return validForm;
}


