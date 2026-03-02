import type { LoginData, SubmitHandler } from "./types";

export function renderLoginForm( 
    container: HTMLElement,
    onSubmit: SubmitHandler
) {
    container.innerHTML = '';

    const form = document.createElement('form');
    form.className = 'login-form';

    const emailGroup = document.createElement('div');
    emailGroup.className = 'form-group';

    const emailLabel = document.createElement('label');
    emailLabel.className = 'email';
    emailLabel.textContent = 'Email:';

    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.id = 'email';
    emailInput.name = 'email';
    emailInput.required = true;
    emailInput.placeholder = 'your@email.com';

    emailGroup.appendChild(emailLabel);
    emailGroup.appendChild(emailInput);
    form.appendChild(emailGroup);

    // for password 
    const passwordGroup = document.createElement('div');
    passwordGroup.className = 'form-group';

    const passwordLabel = document.createElement('label');
    passwordLabel.htmlFor = 'password';
    passwordLabel.textContent = 'Пароль:';

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.id = 'password';
    passwordInput.name = 'password';
    passwordInput.required = true;
    passwordInput.placeholder = '••••••••';

    passwordGroup.appendChild(passwordLabel);
    passwordGroup.appendChild(passwordInput);
    form.appendChild(passwordGroup);

    //submit btn
    const submitBtn = document.createElement('button');
    submitBtn.type = 'submit';
    submitBtn.textContent = 'Войти';
    form.appendChild(submitBtn);

    //form submit handler
    form.onsubmit = (e) => {
        e.preventDefault();

        //data from form
        const data: LoginData = {
            email: emailInput.value,
            password: passwordInput.value
        };
        
        onSubmit(data);
    };

    container.appendChild(form);
}