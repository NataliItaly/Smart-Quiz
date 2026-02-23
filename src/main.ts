import './css/styles.css';
import { Router } from "./scripts/services/router";

const app = document.getElementById('app');

if (app) {
  app.innerHTML = `<h1>Smart Quiz is running</h1>`;
}


const router = new Router(routes);
router.init()