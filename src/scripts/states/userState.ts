interface User {
  name: string;
  email: string;
  results: []
}

const defaultUser: User = {
  name: '',
  email: '',
  results: []
};

export function loadUser(): User {
  try {
    const parsed = JSON.parse(localStorage.getItem('user') || 'null') as User | null;
    return parsed ?? defaultUser;
  } catch {
    return defaultUser;
  }
}

let user: User = loadUser();

export function getUser(): User {
  return user;
}

export function setUser(userObj: User): void {
  user = userObj;
  localStorage.setItem('user', JSON.stringify(userObj));
}