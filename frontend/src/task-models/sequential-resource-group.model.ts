import { ResourceItem, ResourceType } from ".";


export class SequentialResourceGroup {
   readonly itemType = ResourceType.SequentialGroup;

   public tasks: ResourceItem[];

   constructor(tasks: ResourceItem[]) {
      this.tasks = tasks ?? [];
   }

   addTask(task: ResourceItem) {
      this.tasks.push(task);
   }
}
