import { Resource } from "./task-models";

const cardClassNames = ['task-card', 'mx-2', 'card', 'card-compact', 'bg-base-100', 'w-56', 'flex', 'flex-row', 'justify-center', 'text-primary'];

function dragStart_handler(ev: DragEvent) {
   const targetEl = (ev.target as HTMLDivElement);
   ev.dataTransfer?.setData('text/plain', targetEl.id)
   ev.dataTransfer!.dropEffect = "move";
}

export default function createResourceCard(resource: Resource, dragFunc = dragStart_handler): HTMLDivElement {
   const cardElement = document.createElement('div');
   cardElement.classList.add(...cardClassNames);
   cardElement.setAttribute('draggable', 'true');
   cardElement.dataset.name = resource.name;
   cardElement.id = resource.id;

   cardElement.addEventListener('dragstart', dragFunc);

   const nameElement = document.createElement('div');
   nameElement.innerText = resource.name;

   cardElement.appendChild(nameElement);

   return cardElement;
}
