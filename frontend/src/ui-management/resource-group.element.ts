import { AsyncResourceGroup, Resource, ResourceType } from "../task-models";
import { moveTask } from "./actions";
import { TaskElement } from "./task.element";

function dragOver_handler(ev: Event) {
   ev.preventDefault();
   (ev as DragEvent).dataTransfer!.dropEffect = "move";
}

function buildGhostCard() {
   const el = document.createElement('div');
   el.innerText = '+ Add Task';
   el.classList.add('mx-2', 'card', 'ghost-card', 'w-56', 'text-center');
   return el;
}

export class ResourceGroupElement {
   private ghostCard: HTMLDivElement
   private tasks: TaskElement[] = [];
   public element: HTMLDivElement

   get id(): string {
      return this.element.id
   }

   constructor(resourceGroup: AsyncResourceGroup) {
      const group = document.createElement('div')
      group.classList.add('task-group')
      group.id = resourceGroup.id.toString()
      
      this.element = group   
      group.addEventListener("drop", (ev) => this._drop_handler(ev))
      group.addEventListener("dragover", dragOver_handler)
   
      resourceGroup?.tasks.forEach(item => {
         if (item.itemType === ResourceType.Resource) {
            this.addTask(item)
         }
      });

      this.ghostCard = buildGhostCard()
      this._updateGhostCard()
   }

   public addTask(task: Resource) {
      const taskEl = new TaskElement(task)
      this.element.appendChild(taskEl.element)
      this.tasks.push(taskEl)
   }

   public removeTask(id: string) {
      const toRemove = this.tasks.find(t => t.id === id)!
      this.element.removeChild(toRemove.element)
      this.tasks = this.tasks.filter(t => t.id !== id)
   }

   /** move ghost card to the bottom of the group */
   private _updateGhostCard() {
      this.element.appendChild(this.ghostCard)
   }

   private _drop_handler(ev: DragEvent) {
      ev.preventDefault();
      const id = ev.dataTransfer?.getData('text/id')!
      const fromId = ev.dataTransfer?.getData('text/parent-id')!

      if (this.element.id !== fromId) {
         moveTask(id, fromId, this.id)
      }

      this._updateGhostCard()
   }
}