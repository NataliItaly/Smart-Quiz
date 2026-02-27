import { Router } from "../../services/router";

export function renderLogin(router: Router, setAuth: (value: boolean) => void) {
    const root = document.getElementById("app")!;
    root.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'login-page';

    root.appendChild(container);

    let currentMode: 'login' | 'register' = 'login';

    // const userData: { name?: string; email?: string; password?: string } = {}; - use it in future
    console.log('router and setAuth will be using in future', router, setAuth);

    const title = document.createElement('h1');
    title.textContent = 'Добро пожаловать в Smart Quiz!';
    container.appendChild(title);

    const subtitle = document.createElement('h2');
    subtitle.textContent = currentMode === 'login' ? 'Вход' : 'Регистрация';
    container.appendChild(subtitle);

    const switchContainer = document.createElement('div');
    switchContainer.className = 'auth-switch';

    const loginSwitchBtn = document.createElement('button');
    loginSwitchBtn.textContent = 'Вход';

    const registerSwitchBtn = document.createElement('button');
    registerSwitchBtn.textContent = 'Регистрация';

    switchContainer.appendChild(loginSwitchBtn);
    switchContainer.appendChild(registerSwitchBtn);
    container.appendChild(switchContainer);

    const formContainer = document.createElement('div');
    formContainer.className = 'form-container';
    container.appendChild(formContainer);

    const renderForm = () => {
        formContainer.innerHTML = '';
        subtitle.textContent = currentMode === 'login' ? 'Вход' : 'Регистрация';
        loginSwitchBtn.className = currentMode === 'login' ? 'active' : '';
        registerSwitchBtn.className = currentMode === 'register' ? 'active' : '';

        if (currentMode === 'login') {
            formContainer.innerHTML = `
            <div class="login-form">
            <input type="email" id="email" placeholder="Email" />
            <input type="password" id="password" placeholder="Пароль" />
            <button id="submitLogin">Войти</button>
            </div>
            `;

            const submitBtn = document.getElementById('submitLogin');
            if (submitBtn) {
                submitBtn.onclick = () => {
                    console.log('Вход:', currentMode);
                };
            }

        } else {
            formContainer.innerHTML = `
             <div class="register-form">
             <input type="text" id="name" placeholder="Имя" />
             <input type="email" id="email" placeholder="Email" />
             <input type="password" id="password" placeholder="Пароль" />
             <button id="submitRegister">Зарегистрироваться</button>
             </div>
             `;

             const submitBtn = document.getElementById('submitRegister');
             if (submitBtn) {
                submitBtn.onclick = () => {
                    console.log('Регистрация:', currentMode);
                };
             }
        }
    };

    loginSwitchBtn.onclick = () => {
        if (currentMode === 'login') return;

        currentMode = 'login';
        renderForm();

    };

    registerSwitchBtn.onclick = () => {
        if (currentMode === 'register') return;
        currentMode = 'register';
        renderForm();
    };

    renderForm();
}