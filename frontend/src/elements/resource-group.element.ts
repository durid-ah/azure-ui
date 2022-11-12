import { AsyncResourceGroup, ResourceType } from "../task-models";
import TEST_TASKS from "../task-models/test_val";
import { TaskElement } from "./task.element";

function cleanUpResourceGroup(div: HTMLElement) {
   const divId = div.id;
   // TODO: Swap for state
   // Get the group item's index in state
   const idx = TEST_TASKS.tasks.findIndex(t => t.id.toString() === divId);
   const lastIdx = TEST_TASKS.tasks.length - 1;

   if (idx === 0) {
      div.nextElementSibling?.remove();
      div.nextElementSibling?.classList.remove('select-left')
   } else {
      div.previousElementSibling?.remove();
   }

   if (idx === lastIdx)
      div.previousElementSibling?.classList.remove('select-right');

   div.remove();
   // TODO: Swap for state
   TEST_TASKS.tasks = TEST_TASKS.tasks
      .filter(t => t.id.toString() !== divId);
}

function dragOver_handler(ev: Event) {
   ev.preventDefault();
   (ev as DragEvent).dataTransfer!.dropEffect = "move";
}

function drop_handler(this: HTMLDivElement, ev: Event) {
   const dropEv = ev as DragEvent;
   dropEv.preventDefault();
   const id = dropEv.dataTransfer?.getData('text/plain')!;
   const droppedCard = document.getElementById(id)!;
   const movedFromGroup = droppedCard.parentElement!;


   if (this.id !== droppedCard?.parentElement?.id) {
      // TODO: Update task in state
      this.appendChild(droppedCard);
   }

   // If the group that the card was moved out of is empty remove group
   const cardCount = movedFromGroup?.getElementsByClassName('task-card').length;
   if (cardCount === 0) { 
      cleanUpResourceGroup(movedFromGroup);
   }

   // Move ghost card to the bottom
   const ghostCardEL = this.getElementsByClassName('ghost-card')[0];
   this.appendChild(ghostCardEL);
}

function buildGhostCard() {
   const el = document.createElement('div');
   el.innerText = '+ Add Task';
   el.classList.add('mx-2', 'card', 'ghost-card', 'w-56', 'text-center');
   return el;
}

export class ResourceGroupElement {
   private groupData: AsyncResourceGroup;
   public element: HTMLDivElement;

   get id(): string {
      return this.element.id;
   }

   constructor(resourceGroup: AsyncResourceGroup) {
      const group = document.createElement('div')
      group.classList.add('task-group')
      group.id = resourceGroup.id.toString()
   
      group.addEventListener("drop", drop_handler)
      group.addEventListener("dragover", dragOver_handler)
   
      resourceGroup?.tasks.forEach(item => {
         if (item.itemType === ResourceType.Resource) {
            // TODO: move into addTask method
            const el = new TaskElement(item)
            group.appendChild(el.element)
         }
      });

      this.groupData = resourceGroup
      const ghostCard = buildGhostCard()
      group.appendChild(ghostCard)
      this.element = group
   }

   public addTask(task: TaskElement) {
      this.element.appendChild(task.element)
      this.groupData.addTask(task.taskData)
   }

   public removeTask(task: TaskElement) {
      try {
         this.element.removeChild(task.element)
         this.groupData.removeTask(task.id)
      } catch (_) {
         // ignore DOM not found exception
      }
   }
}