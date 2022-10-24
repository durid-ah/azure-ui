import './style.css'
import './auth-dialog'
import TEST_TASKS from './task-models/test_val';
import { AsyncResourceGroup, Resource, ResourceType } from './task-models';
import createResourceCard from './card-element';
// import './socket_client'

function group_dragover_handler(ev: Event) {
   ev.preventDefault();
   (ev as DragEvent).dataTransfer!.dropEffect = "move";
}

function group_drop_handler(ev: Event) {
   ev.preventDefault();
   const dropEv = ev as DragEvent;
   const data = dropEv.dataTransfer?.getData('text/html');
}

function group_dropend_handler(ev: Event) {
   ev.preventDefault();
   const dropEv = ev as DragEvent;
   dropEv.dataTransfer!.dropEffect = "move";
}

function createAsyncResourceGroup(resourceGroup: AsyncResourceGroup): HTMLDivElement {
   const group = document.createElement('div');
   group.classList.add('task-group');

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

// main view
const mainView =  document.querySelector<HTMLDivElement>('#main-view')!;
// loop
const lastItem = TEST_TASKS.tasks.length - 1;
TEST_TASKS.tasks.forEach((item, idx) => {
   let el: HTMLDivElement;
   if (item.itemType === ResourceType.Resource) {
      el = createResourceCard(item);
   } else if (item.itemType === ResourceType.AsyncGroup) {
      el = createAsyncResourceGroup(item);
   } else {
      el = createResourceCard(item.tasks[0] as Resource);
   }

   mainView.appendChild(el);

   const isLast = idx === lastItem;
   const isFirst = idx === 0;

   if (!isLast) {
      el.classList.add('select-right');
      mainView.appendChild(createGroupLine());
   }

   if (!isFirst) {
      el.classList.add('select-left');
   }
});

const groups = document.getElementsByClassName('task-group')
for (let idx = 0; idx < groups.length; idx++) {
   const element = groups[idx];
   console.log(element);
   element.addEventListener("dragenter", ev => ev.preventDefault());
   element.addEventListener("drop", group_drop_handler);
   element.addEventListener("dragover", group_dragover_handler);
   element.addEventListener("dropend", group_dropend_handler);
}


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
