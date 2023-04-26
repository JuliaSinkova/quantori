import { TaskInterface } from "../Task/TaskInterface";
import { TasksSection } from "../TasksSection/TasksSection";
import './tasksWrapper.css';

export function TasksWrapper(items : TaskInterface[], deleteItem:  (e: Event) => Promise<void>, finishItem: (e: Event) => Promise<void>) {
    const tasksWrapper = document.createElement('div');
    tasksWrapper.classList.add('tasks');

    const active = TasksSection(
      {
        title: 'All Tasks',
        items,
        sectionType: 'active',
      },
      deleteItem,
      finishItem
    );

    const finished = TasksSection(
      {
        title: 'Completed Tasks',
        items,
        sectionType: 'finished',
      },
      deleteItem,
      finishItem
    );
    
    tasksWrapper.append(active, finished);
    return tasksWrapper;
  }
