import { Subscription } from "rxjs";
import { Resource, ResourceType } from "../task-models";
import { ResourceGroup } from "../task-models/async_resource_group.model";
import TEST_TASKS from "../task-models/test_val";
import { ResourceGroupElement } from "./resource-group.element";

type GroupInfo = {
   id: string;
   group: ResourceGroup;
   groupElement: ResourceGroupElement;
   subscriptions: Subscription[];
}

function createGroupLine(): HTMLDivElement {
   const el = document.createElement('div')
   el.classList.add('group-line')
   return el
}

const element = document.getElementById('main-view') as HTMLDivElement 
let groups: GroupInfo[] = []

// work this out
const lastItem = TEST_TASKS.tasks.length - 1
TEST_TASKS.tasks.forEach((group, idx) => {
   
   if (group.itemType !== ResourceType.AsyncGroup) return

   const groupEl = new ResourceGroupElement(group)
   const info: GroupInfo = {
      id: groupEl.id,
      group: group,
      groupElement: groupEl,
      subscriptions: []
   }

   // Update UI when a task is removed from the group
   let s = group.taskRemoved$.subscribe(resource => {
      if (group.tasks.length === 0)
         cleanUpResourceGroup(info)
      else 
         groupEl.removeTask(resource.id)
   })

   // Update UI when a task is dropped into the group
   s = group.taskAdded$
      .subscribe((task) => groupEl.addTask(task))

   info.subscriptions.push(s)

   element.appendChild(groupEl.element)
   
   const isLast = idx === lastItem
   const isFirst = idx === 0
   
   if (!isLast) {
      groupEl.element.classList.add('select-right')
      element.appendChild(createGroupLine())
   }
   
   if (!isFirst)
      groupEl.element.classList.add('select-left')

   groups.push(info)
});

export function addNewTask(task: Resource, targetGroupId: string) {
   const to = groups.find(g => g.id === targetGroupId)?.group
   if (!to)
      throw new Error('Invalid addNewTask::targetGroupId')
   
   to.addTask(task)
}

export function moveTask(taskId: string, fromGroupId: string, toGroupId: string) {
   const from = groups.find(g => g.id === fromGroupId)?.group
   if (!from)
      throw new Error('Invalid moveTask::fromGroupId')
   
   const to = groups.find(g => g.id === toGroupId)?.group
   if (!to)
      throw new Error('Invalid moveTask::toGroupId')

   const task = from!.removeTask(taskId)
   if (!task)
      throw new Error('Invalid moveTask::taskId')

   to.addTask(task!)
}

function unsubscribeAll(subscriptions: Subscription[]) {
   subscriptions.forEach(s => s.unsubscribe())
}

function cleanUpResourceGroup(info: GroupInfo) {
   const groupElement = info.groupElement.element;
   
   // Get the group item's index in state
   const idx = groups.findIndex(t => t.id.toString() === info.id);
   const lastIdx = groups.length - 1;

   if (idx === 0) {
      groupElement.nextElementSibling?.remove();
      groupElement.nextElementSibling?.classList.remove('select-left')
   } else {
      groupElement.previousElementSibling?.remove();
   }

   if (idx === lastIdx)
      groupElement.previousElementSibling?.classList.remove('select-right');

   groupElement.remove();
   groups = groups
      .filter(t => t.id.toString() !== info.id);
   unsubscribeAll(info.subscriptions)
}