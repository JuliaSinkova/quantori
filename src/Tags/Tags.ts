import { Tag } from "../Tag/Tag";
import './tags.css';

export function Tags() {
    const fieldset = document.createElement('fieldset');
    fieldset.name = 'tagtype';
    fieldset.id = "modal_tags";

    const tag_home = Tag('home');
    const tag_health = Tag('health');
    const tag_work = Tag('work');
    const tag_other = Tag('other');

    tag_other.querySelector('input').checked = true;

    fieldset.append(tag_home, tag_work, tag_health, tag_other);
    return fieldset;
  }