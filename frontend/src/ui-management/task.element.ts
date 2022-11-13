import { Resource } from "../task-models";

const cardClassNames = [
   'task-card', 'mx-2', 'card', 'card-compact', 'bg-base-100',
   'w-56', 'flex', 'flex-row', 'justify-center', 'text-primary'
];

/**
 * Represents a task on the board
 */
export class TaskElement {
   public taskData: Resource;
   public element: HTMLDivElement;

   get id(): string {
      return this.element.id;
   }

   constructor(taskData: Resource) {
      this.taskData = taskData
      
      this.element = document.createElement('div')
      this.element.classList.add(...cardClassNames)
      this.element.setAttribute('draggable', 'true')
      this.element.dataset.name = taskData.name
      this.element.id = this.taskData.id
   
      this.element.addEventListener('dragstart', (ev) => this._dragStart_handler(ev))
   
      const nameElement = document.createElement('div')
      nameElement.innerText = taskData.name;
      this.element.appendChild(nameElement);  
   }

   private _dragStart_handler(ev: DragEvent) {
      const targetEl = (ev.target as HTMLDivElement)
      ev.dataTransfer?.setData('text/id', targetEl.id)
      ev.dataTransfer?.setData('text/parent-id', targetEl.parentElement!.id)

      ev.dataTransfer!.dropEffect = "move"
   }
}