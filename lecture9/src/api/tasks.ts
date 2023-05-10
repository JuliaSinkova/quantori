import { TaskInterface } from "../components/Task/TaskInterface";
const baseUrl = "http://localhost:3004";

export function addItemToDatabase(data: TaskInterface) {
  return fetch(`${baseUrl}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export function getItemsFromDatabase() {
  return fetch(`${baseUrl}/tasks`);
}
export function deleteItemFromDatabase(id: number) {
  return fetch(`${baseUrl}/tasks/${id}`, {
    method: "DELETE",
  });
}

export function finishItemInDatabase(task: TaskInterface, id: number) {
  const { title, tagtype, time, isActive } = task;
  return fetch(`${baseUrl}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: title,
      tagtype: tagtype,
      time: time,
      isActive: isActive,
    }),
  });
}
export function updateItemInDatabase(task: TaskInterface) {
  const { title, tagtype, time, isActive, id } = task;
  return fetch(`${baseUrl}/tasks/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      title: title,
      tagtype: tagtype,
      time: time,
      isActive: isActive,
    }),
  });
}
