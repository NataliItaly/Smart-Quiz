

let isAuth: boolean = false;

function renderLogin() {
  const root = document.getElementById("app")!;
  root.innerHTML = `
    <h1>Login Page</h1>
    <button id="loginBtn">Login</button>
  `;

  document.getElementById("loginBtn")!.onclick = () => {
    isAuth = true;
    router.navigate("/dashboard");
  };
}

function renderQuiz() {
  const root = document.getElementById("app")!;
  root.innerHTML = `
    <h1>Quiz Page</h1>
    <button id="backBtn">Back</button>
  `;

  document.getElementById("backBtn")!.onclick = () => {
    router.navigate("/dashboard");
  };
}

function renderDashboard() {
  const root = document.getElementById("app")!;
  root.innerHTML = `
    <h1>Dashboard</h1>
    <button id="logoutBtn">Logout</button>
    <button id="quizBtn">Go to Quiz</button>
  `;

  document.getElementById("logoutBtn")!.onclick = () => {
    isAuth = false;
    router.navigate("/");
  };

  document.getElementById("quizBtn")!.onclick = () => {
    router.navigate("/quiz");
  };
}

const routes = [
  { path: "/", render: renderLogin },
  { path: "/dashboard", render: renderDashboard, protected: true },
  { path: "/quiz", render: renderQuiz, protected: true }
];

if (route.protected && !isAuth) {
  navigate("/");
  return;
}