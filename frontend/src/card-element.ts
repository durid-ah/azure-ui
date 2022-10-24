import { Resource } from "./task-models";

function dragStart_handler(ev: DragEvent) {
   const targetEl = (ev.target as HTMLDivElement);
   ev.dataTransfer?.setData('text/html', targetEl.outerHTML)
   ev.dataTransfer!.dropEffect = "move";
}


export default function createResourceCard(resource: Resource): HTMLDivElement {
   const cardElement = document.createElement('div');
   cardElement.classList.add('px-2');
   cardElement.setAttribute('draggable', 'true');
   cardElement.dataset.name = resource.name;
   cardElement.innerHTML = `
      <div id="test-card-1" class="card card-compact bg-base-100 w-56 flex flex-row justify-center">
      </div>
   `;

   cardElement.addEventListener('dragstart', dragStart_handler)

   const nameElement = document.createElement('div');
   nameElement.innerText = resource.name;
   const innerCardElement = cardElement.querySelector('.card')!;
   innerCardElement.appendChild(nameElement);

   return cardElement;
}
