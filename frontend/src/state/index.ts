import { AsyncResourceGroup } from "../task-models";

const groups: AsyncResourceGroup[] =  [];

export function moveTask(taskId: string, fromGroupId: string, toGroupId: string) {
   const from = groups.find(g => g.id === fromGroupId)
   if (from === null)
      throw new Error('Invalid moveTask::fromGroupId')
   
   const to = groups.find(g => g.id === toGroupId)
   if (to === null)
      throw new Error('Invalid moveTask::toGroupId')

   const task = from!.removeTask(taskId)
   if (task === null)
      throw new Error('Invalid moveTask::taskId')

   to!.addTask(task!)
}
