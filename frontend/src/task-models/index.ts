import { AsyncResourceGroup } from "./async_resource_group.model";
import { Resource } from "./resource.model";
import { SequentialResourceGroup } from "./sequential-resource-group.model";


export enum ResourceType {
   Resource,
   AsyncGroup,
   SequentialGroup
}

export type ResourceItem = Resource | AsyncResourceGroup | SequentialResourceGroup;

export { Resource,  AsyncResourceGroup, SequentialResourceGroup};