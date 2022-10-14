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

export {}