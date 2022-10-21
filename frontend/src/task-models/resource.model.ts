import { ResourceType } from ".";


export class Resource {
   readonly itemType = ResourceType.Resource;

   public name: string;

   constructor(name: string) {
      this.name = name;
   }
}
