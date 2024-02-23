class Validator {
    constructor(data) {
        this.allElements = data.allElements;
        this.type = data.inputType;
        this.value = data.value;
        this.element = data.currentElement;
        this.errorElement = data.errorElement;
        this.errorMessage = data.errorMessage;
        this.password = data.password;
    }

    validate() {
        if (this.type == 'first-name') {
            return this.isFirstName();
        } else if (this.type == 'last-name') {
            return this.isLastName();
        } else if (this.type == 'email') {
            return this.isEmail();
        } else if (this.type == 'password') {
            return this.isPasword();
        } else if (this.type == 'confirm-password') {
            return this.isConfirmPasword();
        }
    }

    isFirstName() {
        this.value.length < 3 || this.value.includes(' ')
            ? this.showError(this.errorMessage = 'First name must be at least 3 characters and cannot contain spaces')
            : this.hideError(this.errorMessage = '');
    }

    isLastName() {
        this.value.length < 3 ?
            this.showError(this.errorMessage = 'Last name must be at least 3 characters')
            : this.hideError(this.errorMessage = '');
    }

    isEmail() {
        this.value.length > 3 && this.value.includes('@')
            ? this.hideError(this.errorMessage = '')
            : this.showError(this.errorMessage = 'Enter correct your email');
    }

    isPasword() {
        this.value.length < 6 || this.value.includes(' ')
            ? this.showError(this.errorMessage = 'Password must be at least 6 characters and cannot contain spaces')
            : this.hideError(this.errorMessage = '');
    }

    isConfirmPasword() {
        this.element.value !== this.password
            ? this.showError(this.errorMessage = 'Passwords do NOT match')
            : this.hideError(this.errorMessage = '');
    }

    showError() {
        this.errorElement.classList.add('error-text');
        this.errorElement.textContent = this.errorMessage;
        this.element.style.borderColor = '#EB5757';
    }

    hideError() {
        this.errorElement.classList.remove('error-text');
        this.element.style.borderColor = '#009745';
        this.errorElement !== null ? this.errorElement.textContent = '' : '';
    }

    validateForm() {
        let isValid = true;
        this.allElements.forEach((element => {
            if (element.value == '' || this.errorElement.classList.contains('error-text')) {
                isValid = false;
            }
        }))
        return isValid;
    }
}

document.querySelectorAll('input[data-input]').forEach(input => {
    let errorElement = document.createElement('span');
    input.after(errorElement);
    input.addEventListener('input', (() => {
        const validateField = new Validator({
            allElements: document.querySelectorAll('input[data-input]'),
            currentElement: input,
            inputType: input.getAttribute('data-input'),
            password: document.querySelector('input[data-input="password"]').value,
            value: input.value,
            errorElement: errorElement,
            errorMessage: ''
        });
        validateField.validate();
        document.querySelector('form').addEventListener('submit', ((e) => {
            if (!validateField.validateForm()) {
                e.preventDefault();
            }
        }))
    }));
});

