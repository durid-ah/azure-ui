import { ResourceItem, ResourceType } from ".";

export class AsyncResourceGroup {
   readonly itemType = ResourceType.AsyncGroup;
   id: string = Math.floor(Math.random() * 1000).toString();

   public tasks: ResourceItem[];
   
   constructor(tasks: ResourceItem[]) {
      this.tasks = tasks ?? [];
   }

   addTask(task: ResourceItem) {
      this.tasks.push(task);
   }

   removeTask(taskId: string) {
      this.tasks = this.tasks.filter(t => t.id === taskId);
   }
}
