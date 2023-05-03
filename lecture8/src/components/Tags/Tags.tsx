import { Tag } from "../Tag/Tag";
import "./tags.css";

export function Tags() {
  return (
    <fieldset className="tags" name="tagtype" id="modal_tags">
      <Tag type="home" checked={false} />
      <Tag type="work" checked={false} />
      <Tag type="health" checked={false} />
      <Tag type="other" checked={true} />
    </fieldset>
  );
}
