import './style.css'
import './auth-dialog'
import createResourceCard from './card-element';
import './ui-management/actions';
import setUpDeleteButton from './ui-management/delete-button.element';
// import './socket_client'

let taskCount = 10;
const sideBarToggle = document.getElementById('my-drawer') as HTMLInputElement;
const drawerButton = document.getElementById('drawer-button');

drawerButton?.addEventListener('click', () => sideBarToggle.click());

const card = createResourceCard(
   `task-${taskCount}`, 
   (ev) => {
      ev.dataTransfer?.setData('text/id', `task-${taskCount++}`)
      ev.dataTransfer?.setData('text/name', `Task Item ${taskCount}`)
      ev.dataTransfer!.dropEffect = "copy";
      sideBarToggle.click();
   });

const list = document.getElementById('side-bar-list');
list?.appendChild(card);

setUpDeleteButton()




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