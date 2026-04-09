import type { RegisterData, RegisterSubmitHandler } from './types';

export function renderRegisterForm(
  container: HTMLElement,
  onSubmit: RegisterSubmitHandler
) {
  container.innerHTML = '';

  const form = document.createElement('form');
  form.className = 'register-form';

  // for name
  const nameGroup = document.createElement('div');
  nameGroup.className = 'form-group';

  const nameLabel = document.createElement('label');
  nameLabel.htmlFor = 'name';
  nameLabel.textContent = 'Имя:';

  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.id = 'name';
  nameInput.name = 'name';
  nameInput.required = true;
  nameInput.placeholder = 'Ваше имя';

  nameGroup.appendChild(nameLabel);
  nameGroup.appendChild(nameInput);
  form.appendChild(nameGroup);

  //for email
  const emailGroup = document.createElement('div');
  emailGroup.className = 'form-group';

  const emailLabel = document.createElement('label');
  emailLabel.htmlFor = 'email';
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
  passwordLabel.textContent = 'Password:';

  const passwordInput = document.createElement('input');
  passwordInput.type = 'password';
  passwordInput.id = 'password';
  passwordInput.name = 'password';
  passwordInput.required = true;
  passwordInput.placeholder = '••••••••';
  passwordInput.minLength = 3; // min length of password

  passwordGroup.appendChild(passwordLabel);
  passwordGroup.appendChild(passwordInput);
  form.appendChild(passwordGroup);

  // submit btn
  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Зарегистрироваться';
  form.appendChild(submitButton);

  form.onsubmit = (e) => {
    e.preventDefault();

    const data: RegisterData = {
      name: nameInput.value,
      email: emailInput.value,
      password: passwordInput.value
    };

    onSubmit(data);
  };

  container.appendChild(form);
}