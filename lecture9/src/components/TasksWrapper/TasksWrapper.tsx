import { TaskSection } from "../TasksSection/TasksSection";
import "./tasksWrapper.css";

export function TasksWrapper({
  type,
  modalRef,
}: {
  type?: string;
  modalRef: React.RefObject<HTMLFormElement>;
}) {
  
  return (
    <div className="tasks">
      <TaskSection
        title={`All ${type ? type : ""} Tasks`}
        sectionType="active"
        type={type}
        modalRef={modalRef}
      />
      <TaskSection
        title="Completed Tasks"
        sectionType="finished"
        type={type}
        modalRef={modalRef}
      />
    </div>
  );
}
