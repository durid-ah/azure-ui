import './style.css'
// import typescriptLogo from './typescript.svg'
// import { setupCounter } from './counter'

const authDialog = document.getElementById('auth-dialog') as HTMLDialogElement;
const launchAuthDialogButton = document.getElementById('open-auth-dlg');

// AUTH INPUTS:
const clientId = document.getElementById("auth-form-client-id") as HTMLInputElement;
const clientSecret  = document.getElementById("auth-form-client-secret") as HTMLInputElement;
const tenantId  = document.getElementById("auth-form-tenant-id") as HTMLInputElement;
const subscriptionId = document.getElementById("auth-form-subscription-id") as HTMLInputElement;
const submitButton = document.getElementById("auth-form-submit") as HTMLButtonElement;

submitButton.addEventListener('click', () => {
  submitButton.value = JSON.stringify({
    clientId: clientId.value,
    clientSecret: clientSecret.value,
    tenantId: tenantId.value,
    subscriptionId: subscriptionId.value
  });
});

launchAuthDialogButton?.addEventListener('click', () => {
  authDialog.show();
});

authDialog.addEventListener('close', () => {
  console.log(`Dialog`, authDialog.returnValue);
});


// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="/vite.svg" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
