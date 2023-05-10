import { Tag } from "../Tag/Tag";
import "./tags.css";
import { selectCurrentEditTask } from "../../features/todo/todoSlice";
import { useAppSelector } from "../../app/hooks";

export function Tags() {
  const currentEditTask = useAppSelector(selectCurrentEditTask);
  const tagtype = currentEditTask?.tagtype;
  return (
    <fieldset className="tags" name="tagtype" id="modal_tags">
      <Tag type="home" checked={tagtype === "home" ? true : false} />
      <Tag type="work" checked={tagtype === "work" ? true : false} />
      <Tag type="health" checked={tagtype === "health" ? true : false} />
      <Tag
        type="other"
        checked={tagtype ? (tagtype === "other" ? true : false) : true}
      />
    </fieldset>
  );
}
