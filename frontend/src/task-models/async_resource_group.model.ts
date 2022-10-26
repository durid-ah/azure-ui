import { ResourceItem, ResourceType } from ".";

export class AsyncResourceGroup {
   readonly itemType = ResourceType.AsyncGroup;
   id: number = Math.floor(Math.random() * 1000);

   public tasks: ResourceItem[];
   
   constructor(tasks: ResourceItem[]) {
      this.tasks = tasks ?? [];
   }

   addTask(task: ResourceItem) {
      this.tasks.push(task);
   }
}
