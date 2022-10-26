import createResourceCard from "./card-element";
import { AsyncResourceGroup, ResourceType } from "./task-models";

function dragOver_handler(ev: Event) {
   ev.preventDefault();
   (ev as DragEvent).dataTransfer!.dropEffect = "move";
}

function drop_handler(this: HTMLDivElement, ev: Event) {
   const dropEv = ev as DragEvent;
   dropEv.preventDefault();
   const id = dropEv.dataTransfer?.getData('text/plain');
   const droppedCard = document.getElementById(id!)!;

   if (this.id !== droppedCard?.parentElement?.id)
      this.appendChild(droppedCard);
}

function dropEnd_handler(ev: Event) {
   ev.preventDefault();
   const dropEv = ev as DragEvent;
   dropEv.dataTransfer!.dropEffect = "move";
}

export default function createAsyncResourceGroup(resourceGroup: AsyncResourceGroup): HTMLDivElement {
   const group = document.createElement('div');
   group.classList.add('task-group');
   group.id = resourceGroup.id.toString();

   group.addEventListener("dragenter", ev => ev.preventDefault());
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