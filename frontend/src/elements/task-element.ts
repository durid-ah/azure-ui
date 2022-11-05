import { Resource } from "../task-models";

const cardClassNames = ['task-card', 'mx-2', 'card', 'card-compact', 'bg-base-100', 'w-56', 'flex', 'flex-row', 'justify-center', 'text-primary'];

function dragStart_handler(ev: DragEvent) {
   const targetEl = (ev.target as HTMLDivElement);
   ev.dataTransfer?.setData('text/plain', targetEl.id)
   ev.dataTransfer!.dropEffect = "move";
}

export class TaskElement {
   private taskData: Resource;
   public element: HTMLDivElement;

   constructor(taskData: Resource, dragFunc = dragStart_handler) {
      this.taskData = taskData;
      
      this.element = document.createElement('div');
      this.element.classList.add(...cardClassNames);
      this.element.setAttribute('draggable', 'true');
      this.element.dataset.name = taskData.name;
      this.element.id = taskData.id;
   
      this.element.addEventListener('dragstart', dragFunc);
   
      const nameElement = document.createElement('div');
      nameElement.innerText = taskData.name;
   
      this.element.appendChild(nameElement);  
   }


}