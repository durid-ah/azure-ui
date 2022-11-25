import { deleteTask } from "./actions";

function dragOver_handler(ev: Event) {
   ev.preventDefault();
   (ev as DragEvent).dataTransfer!.dropEffect = "move";
}


export default function setUpDeleteButton() {
   const deleteButton = document.getElementById('delete-task')!
   deleteButton.addEventListener('dragover', dragOver_handler)
   deleteButton.addEventListener('drop', (ev) => {
      ev.preventDefault();
      const id = ev.dataTransfer?.getData('text/id')!
      const fromId = ev.dataTransfer?.getData('text/parent-id')!

      if (!fromId) return

      deleteTask(id, fromId)
   })
}