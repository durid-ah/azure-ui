import { ResourceType } from ".";


export class Resource {
   readonly itemType = ResourceType.Resource;

   public name: string;
   public id: string;

   constructor(name: string, id: string) {
      this.name = name;
      this.id = id;
   }
}
