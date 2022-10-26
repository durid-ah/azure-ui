import createResourceCard from "./card-element";
import createAsyncResourceGroup from "./resource-element";
import { Resource, ResourceType } from "./task-models";
import TEST_TASKS from "./task-models/test_val";

const mainView =  document.querySelector<HTMLDivElement>('#main-view')!;

function createGroupLine(): HTMLDivElement {
   const el = document.createElement('div');
   el.classList.add('group-line');
   return el;
}

export default function buildTaskBoard() {
   const lastItem = TEST_TASKS.tasks.length - 1;
   TEST_TASKS.tasks.forEach((item, idx) => {
      let el: HTMLDivElement;
      if (item.itemType === ResourceType.Resource) {
         el = createResourceCard(item);
      } else {//if (item.itemType === ResourceType.AsyncGroup) {
         el = createAsyncResourceGroup(item);
      } 
      // else {
      //    el = createResourceCard(item.tasks[0] as Resource);
      // }
   
      mainView.appendChild(el);
   
      const isLast = idx === lastItem;
      const isFirst = idx === 0;
   
      if (!isLast) {
         el.classList.add('select-right');
         mainView.appendChild(createGroupLine());
      }
   
      if (!isFirst) {
         el.classList.add('select-left');
      }
   });
}