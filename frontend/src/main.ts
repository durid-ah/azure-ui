import './style.css'
import './auth-dialog'
import buildTaskBoard from './board-element';
import createResourceCard from './card-element';
import { Resource } from './task-models';
// import './socket_client'

let taskCount = 10;
const sideBarToggle = document.getElementById('my-drawer') as HTMLInputElement;
const drawerButton = document.getElementById('drawer-button');

drawerButton?.addEventListener('click', () => sideBarToggle.click());
buildTaskBoard();

const card = createResourceCard(
   new Resource('New Task', `task-${taskCount++}`), 
   (ev) => {
      const targetEl = (ev.target as HTMLDivElement);
      ev.dataTransfer?.setData('text/plain', targetEl.id)
      ev.dataTransfer!.dropEffect = "copy";
      sideBarToggle.click();
   });

const list = document.getElementById('side-bar-list');
list?.appendChild(card);

// import typescriptLogo from './typescript.svg'
// import { setupCounter } from './counter'

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="/vite.svg" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
// `