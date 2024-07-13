document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form');
    form.addEventListener('submit', (event) => {
        if (!validateForm()) {
            console.log('El formulario no es válido. Por favor, corrige los errores.');
            event.preventDefault();
        } else {
            console.log('El formulario es válido. Enviar datos...');
            // Aquí puedes enviar los datos del formulario o realizar otras acciones
        }
    });

    const validateForm = () => {
        let isValid = true;

        isValid = validateField('name', 'El nombre es obligatorio') && isValid;
        isValid = validateField('lastname', 'El apellido es obligatorio') && isValid;
        isValid = validateEmailField('email', 'El correo electrónico no es válido') && isValid;
        isValid = validateField('password', 'La contraseña es obligatoria') && isValid;
        isValid = validateField('date', 'La fecha de nacimiento es obligatoria') && isValid;
        isValid = validateField('country', 'El país es obligatorio') && isValid;

        const termsCheckbox = document.getElementById('check');
        if (!termsCheckbox.checked) {
            isValid = false;
            setErrorFor(termsCheckbox, 'Debes aceptar los términos y condiciones');
        } else {
            setSuccessFor(termsCheckbox);
        }

        return isValid;
    };

    const validateField = (fieldId, errorMessage) => {
        const field = document.getElementById(fieldId);
        const value = field.value.trim();
        if (value === '') {
            setErrorFor(field, errorMessage);
            return false;
        } else {
            setSuccessFor(field);
            return true;
        }
    };

    const validateEmailField = (fieldId, errorMessage) => {
        const field = document.getElementById(fieldId);
        const email = field.value.trim();
        if (email === '') {
            setErrorFor(field, 'El correo electrónico es obligatorio');
            return false;
        } else if (!isEmail(email)) {
            setErrorFor(field, errorMessage);
            return false;
        } else {
            setSuccessFor(field);
            return true;
        }
    };

    const setErrorFor = (input, message) => {
        const errorSpan = input.nextElementSibling;
        errorSpan.innerText = message;
        input.classList.add('error');
    };

    const setSuccessFor = (input) => {
        const errorSpan = input.nextElementSibling;
        errorSpan.innerText = '';
        input.classList.remove('error');
    };

    const isEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    form.querySelectorAll('.form-input').forEach(input => {
        input.addEventListener('input', () => {
            const value = input.value.trim();
            if (value !== '') {
                setSuccessFor(input);
            }
        });
    });

    form.querySelectorAll('.form-select-country').forEach(select => {
        select.addEventListener('change', () => {
            const value = select.value;
            if (value !== '') {
                setSuccessFor(select);
            }
        });
    });
});
