import './style.css'
import './auth-dialog'
import TEST_TASKS from './task-models/test_val';
import { AsyncResourceGroup, Resource, ResourceType } from './task-models';
// import './socket_client'

function createResourceCard(resource: Resource): HTMLDivElement {
   const cardElement = document.createElement('div');
   cardElement.classList.add('px-2');
   cardElement.innerHTML = `
      <div id="test-card-1" class="card card-compact bg-base-100 w-56 flex flex-row justify-center">
      </div>
   `;

   const nameElement = document.createElement('div');
   nameElement.innerText = resource.name;
   const innerCardElement = cardElement.querySelector('.card')!;
   innerCardElement.appendChild(nameElement);

   return cardElement;
}

function createAsyncResourceGroup(resourceGroup: AsyncResourceGroup): HTMLDivElement {
   const group = document.createElement('div');
   group.classList.add('task-group','select-right');

   resourceGroup.tasks.forEach(item => {
      if (item.itemType === ResourceType.Resource) {
         const el = createResourceCard(item);
         group.appendChild(el);
      }
   });
   
   return group;
}

function createGroupLine(): HTMLDivElement {
   const el = document.createElement('div');
   el.classList.add('group-line');
   return el;
}

const mainView =  document.querySelector<HTMLDivElement>('#main-view')!;

const lastItem = TEST_TASKS.tasks.length - 1;
TEST_TASKS.tasks.forEach((item, idx) => {
   if (item.itemType === ResourceType.Resource) {
      const el = createResourceCard(item);
      mainView.appendChild(el);
   } else if (item.itemType === ResourceType.AsyncGroup) {
      const el = createAsyncResourceGroup(item);
      mainView.appendChild(el);
   }

   if (idx !== lastItem) {
      mainView.appendChild(createGroupLine());
   }

});


// import typescriptLogo from './typescript.svg'
// import { setupCounter } from './counter'


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
