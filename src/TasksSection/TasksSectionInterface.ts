import { TaskInterface } from "../Task/TaskInterface";

export interface TasksSectionInterface {
    title: string,
    items: TaskInterface[], 
    sectionType: string
}