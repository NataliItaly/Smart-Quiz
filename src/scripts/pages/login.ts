import { Router } from '../services/router'

type User = {
  email: string
  password: string
}

export function renderLogin(router: Router, setAuth: (value: boolean) => void) {
  const root = document.getElementById('app')!
  root.innerHTML = `
    <h1>Login Page</h1>
    <input id="email" placeholder="Email" />
    <input id="password" type="password" placeholder="Password" />
    <button id="loginBtn">Login</button>
    <p id="error" style="color:red;"></p>
  `

  document.getElementById('loginBtn')!.onclick = () => {
    const email = (document.getElementById('email') as HTMLInputElement).value
    const password = (document.getElementById('password') as HTMLInputElement)
      .value

    const users = JSON.parse(localStorage.getItem('users') || '[]') as User[]
    const foundUser = users.find(
      (user: User) => user.email === email && user.password === password
    )

    if (foundUser) {
      localStorage.setItem('currentUser', JSON.stringify(foundUser))
      setAuth(true)
      router.navigate('/dashboard')
    } else {
      document.getElementById('error')!.textContent = 'User not found'
    }
  }
}
