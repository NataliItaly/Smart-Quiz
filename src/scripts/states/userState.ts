export interface User {
  id: string;
  name: string;
  email: string;
  results: []
}

function generateId(): string {
  return Date.now().toString() + '-' + Math.random().toString(36).substring(2, 10);
}

const defaultUser: User = {
  id: '',
  name: '',
  email: '',
  results: []
};

export function loadUser(): User {
  try {
    const parsed = JSON.parse(localStorage.getItem('user') || 'null') as User | null;
    if (parsed) {
      if (!parsed.id) {
        parsed.id = generateId();
        localStorage.setItem('user', JSON.stringify(parsed));
      }
      return parsed;
    }
    return defaultUser;
  } catch {
    return defaultUser;
  }
}

let user: User = loadUser();

export function getUser(): User {
  return user;
}

export function setUser(userObj: User): void {

  if (!userObj.id) {
    userObj.id = generateId();
  }
  user = userObj;
  localStorage.setItem('user', JSON.stringify(userObj));
}

export function updateUser(updates: Partial<User>): void {
  user = { ...user, ...updates };
  localStorage.setItem('user', JSON.stringify(user));
}