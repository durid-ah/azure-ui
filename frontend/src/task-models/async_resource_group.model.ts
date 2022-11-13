import { Subject } from "rxjs";
import { Resource, ResourceType } from ".";

export type TaskMoved = {
   taskId: string;
   fromGroupId: string;
}

export class ResourceGroup {
   readonly itemType = ResourceType.AsyncGroup

   id: string = Math.floor(Math.random() * 1000).toString()
   
   taskRemoved$ = new Subject<Resource>()
   taskAdded$ = new Subject<Resource>()

   public tasks: Resource[]
   
   constructor(tasks: Resource[]) {
      this.tasks = tasks ?? []
   }

   addTask(task: Resource) {
      this.tasks.push(task)
      this.taskAdded$.next(task)
   }

   removeTask(taskId: string): Resource {
      const task = this.tasks.find(t => t.id === taskId)!
      this.tasks = this.tasks.filter(t => t.id !== taskId)
      
      this.taskRemoved$.next(task)
      return task
   }
}
