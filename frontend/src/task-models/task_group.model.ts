
export enum ResourceType {
   Resource,
   AsyncGroup,
   SequentialGroup
}

export type ResourceItem = Resource | AsyncResourceGroup | SequentialResourceGroup;

export class Resource {
   readonly itemType = ResourceType.Resource
   
   public name: string;

   constructor(name: string) {
      this.name = name;
   }
}

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

export class AsyncResourceGroup {
   readonly itemType = ResourceType.AsyncGroup;

   public tasks: ResourceItem[];
   
   constructor(tasks: ResourceItem[]) {
      this.tasks = tasks ?? [];
   }

   addTask(task: ResourceItem) {
      this.tasks.push(task);
   }
}
