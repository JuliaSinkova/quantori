import { NavLink } from "react-router-dom";
import "../Tag/tag.css";
import "./filterTags.css";

export function FilterTags() {
  return (
    <div className="navigation">
      <NavLink
        to="/tasks/all"
        className={({ isActive }) =>
          isActive ? "tag tag--all tag--all-active" : "tag tag--all "
        }
      >
        all
      </NavLink>
      <NavLink
        to="/tasks/home"
        className={({ isActive }) =>
          isActive ? "tag tag--home tag--home-active" : "tag tag--home"
        }
      >
        home
      </NavLink>
      <NavLink
        to="/tasks/health"
        className={({ isActive }) =>
          isActive ? "tag tag--health tag--health-active" : "tag tag--health "
        }
      >
        health
      </NavLink>
      <NavLink
        to="/tasks/work"
        className={({ isActive }) =>
          isActive ? "tag tag--work tag--work-active" : "tag tag--work "
        }
      >
        work
      </NavLink>
      <NavLink
        to="/tasks/other"
        className={({ isActive }) =>
          isActive ? "tag tag--other tag--other-active" : "tag tag--other "
        }
      >
        other
      </NavLink>
    </div>
  );
}
