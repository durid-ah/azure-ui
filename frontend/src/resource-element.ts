import createResourceCard from "./card-element";
import { AsyncResourceGroup, ResourceType } from "./task-models";
import TEST_TASKS from "./task-models/test_val";

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
      // TODO: change to model counting?
      this.appendChild(droppedCard);
   } 

   // If the group that the card was moved out of is empty remove group
   const cardCount = movedFromGroup?.getElementsByClassName('card').length;
   if (cardCount === 0) { 
      const movedFromGroupId = movedFromGroup.id;
      // TODO: Swap for state
      const idx = TEST_TASKS.tasks.findIndex(t => t.id.toString() === movedFromGroupId);
      const lastIdx = TEST_TASKS.tasks.length - 1;

      if (idx === 0) {
         movedFromGroup.nextElementSibling?.remove();
         movedFromGroup.nextElementSibling?.classList.remove('select-left')
      } else {
         movedFromGroup.previousElementSibling?.remove();
      }

      if (idx === lastIdx)
         movedFromGroup.previousElementSibling?.classList.remove('select-right');

      movedFromGroup.remove();
      // TODO: Swap for state
      TEST_TASKS.tasks = TEST_TASKS.tasks
         .filter(t => t.id.toString() !== movedFromGroupId);
   }
}

function dragEnter_handler(this: HTMLDivElement, ev: Event) {
   ev.preventDefault();
   console.log('Entering', this.id);
}

function dropEnd_handler(ev: Event) {
   const dropEv = ev as DragEvent;
   dropEv.preventDefault();
   dropEv.dataTransfer!.dropEffect = "move";
}

export default function createAsyncResourceGroup(resourceGroup: AsyncResourceGroup): HTMLDivElement {
   const group = document.createElement('div');
   group.classList.add('task-group');
   group.id = resourceGroup.id.toString();

   group.addEventListener("dragenter", dragEnter_handler);
   group.addEventListener("drop", drop_handler);
   group.addEventListener("dragover", dragOver_handler);
   group.addEventListener("dropend", dropEnd_handler);

   resourceGroup.tasks.forEach(item => {
      if (item.itemType === ResourceType.Resource) {
         const el = createResourceCard(item);
         group.appendChild(el);
      }
   });
   
   return group;
}