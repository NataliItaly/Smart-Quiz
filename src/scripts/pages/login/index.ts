import { Router } from "../../services/router";
import { renderLoginForm } from "./LoginForm";
import type { RegisterData } from "./types";
import { LoginData } from "./types";
import { renderRegisterForm } from "./RegisterForm";

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
    
    const handleAuthSuccess = (userName: string) => {
        localStorage.setItem('currentUser', userName);
        
        const users = JSON.parse(localStorage.getItem('quiz_users') || '[]');
        if (!users.includes(userName)) {
            users.push(userName);
            localStorage.setItem('quiz_users', JSON.stringify(users));
        }
        
        const resultsKey = `results_${userName}`;
        if (!localStorage.getItem(resultsKey)) {
            localStorage.setItem(resultsKey, JSON.stringify([]));
        }
        
        setAuth(true);
        router.navigate('/dashboard');
    };


    const renderForm = () => {
        formContainer.innerHTML = '';
        subtitle.textContent = currentMode === 'login' ? 'Вход' : 'Регистрация';
        loginSwitchBtn.className = currentMode === 'login' ? 'active' : '';
        registerSwitchBtn.className = currentMode === 'register' ? 'active' : '';
        
        if (currentMode === 'login') {
            renderLoginForm(formContainer, (data: LoginData) => {
                console.log('Попытка входа:', data);

                const users = JSON.parse(localStorage.getItem('quiz_users') || '[]');

                if (data.email && data.password.length >= 3) {
                    const existingUser = users.find((u: any) => 
                        typeof u === 'string' ? u === data.email : u.email === data.email
                );

                if (existingUser) {
                     handleAuthSuccess(existingUser.name || existingUser);
                } else {
                    alert('Пользователь не найден. Попробуйте зарегистрироваться.'); // change for popup
                } 
            } else {
                alert('Неверный формат email или пароль слишком короткий');
            }
        });
        } else {
            renderRegisterForm(formContainer, (data: RegisterData) => {
                console.log('Регистрация:', data);

                if (data.name && data.email && data.password.length >= 3) {
                    handleAuthSuccess(data.name);
                } else {
                    alert('Заполните все поля (пароль минимум 3 символа)');
                }
            });
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