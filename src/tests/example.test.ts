// Example test to verify Vitest setup.
// Feel free to add your own tests in this folder.

import { describe, it, expect } from 'vitest';
import { renderLoginForm } from '../scripts/pages/login/LoginForm';
import { renderRegisterForm } from '../scripts/pages/login/RegisterForm';

describe('test environment', () => {
  it('vitest works', () => {
    expect(1 + 1).toBe(2);
  });

  it('jsdom environment works', () => {
    const div = document.createElement('div');
    expect(div).toBeInstanceOf(HTMLElement);
  });
});


describe('Login page simple tests', () => {
  // test 1 - form made
  it('creates login form', () => {
    const container = document.createElement('div');
    renderLoginForm(container, () => {});
    
    expect(container.innerHTML).toContain('email');
    expect(container.innerHTML).toContain('password');
  });

  // test 2 - register form created
  it('creates register form', () => {
    const container = document.createElement('div');
    renderRegisterForm(container, () => {});
    
    expect(container.innerHTML).toContain('name');
    expect(container.innerHTML).toContain('email');
    expect(container.innerHTML).toContain('password');
  });

  //test 3 - after btn form clicked smtn happend
  it('login button works', () => {
    const container = document.createElement('div');
    let clicked = false;
    
    renderLoginForm(container, () => { clicked = true; });
    
    const button = container.querySelector('button');
    button?.click();
    
    expect(clicked).toBe(true);
  });

  // test 4 - localStorage saved users
  it('saves user to storage', () => {
    localStorage.clear();
    
    const saveUser = (name: string) => {
      localStorage.setItem('currentUser', name);
    };
    
    saveUser('Анна');
    
    expect(localStorage.getItem('currentUser')).toBe('Анна');
  });

  // test 5 - switch btwn forms worked
  it('switches between login and register', () => {
    let mode = 'login';
    
    const switchToRegister = () => { mode = 'register'; };
    const switchToLogin = () => { mode = 'login'; };
    
    switchToRegister();
    expect(mode).toBe('register');
    
    switchToLogin();
    expect(mode).toBe('login');
  });
});