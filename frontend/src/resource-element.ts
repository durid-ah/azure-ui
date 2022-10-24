import createResourceCard from "./card-element";
import { AsyncResourceGroup, ResourceType } from "./task-models";

function dragOver_handler(ev: Event) {
   ev.preventDefault();
   (ev as DragEvent).dataTransfer!.dropEffect = "move";
}

function drop_handler(ev: Event) {
   ev.preventDefault();
   const dropEv = ev as DragEvent;
   const data = dropEv.dataTransfer?.getData('text/html');
}

function dropEnd_handler(ev: Event) {
   ev.preventDefault();
   const dropEv = ev as DragEvent;
   dropEv.dataTransfer!.dropEffect = "move";
}

export default function createAsyncResourceGroup(resourceGroup: AsyncResourceGroup): HTMLDivElement {
   const group = document.createElement('div');
   group.classList.add('task-group');

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