import { AppIcon as Icon } from "../../components/AppIcon";
import { PageHead } from "../../components/PageHead";
export function CourseForm() {
  return (
    <>
      <PageHead
        kicker="COURSE CREATION"
        title="Build a targeted learning program"
      />
      <form className="course-form">
        <label>
          Course title
          <input placeholder="e.g. Leadership Essentials" />
        </label>
        <label>
          Competency area
          <select>
            <option>Leadership</option>
            <option>Communication</option>
            <option>Technical Skills</option>
          </select>
        </label>
        <label>
          Level
          <select>
            <option>Foundation</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </label>
        <label>
          Duration
          <input placeholder="e.g. 4 weeks" />
        </label>
        <label className="full">
          Course description
          <textarea placeholder="What capability will this course build?" />
        </label>
        <label className="full">
          Learning outcomes
          <textarea placeholder="Add the practical outcomes learners will achieve…" />
        </label>
        <div className="full modules-editor">
          <b>Modules</b>
          <button type="button" className="text-button">
            + Add module
          </button>
          <div>01 &nbsp; Introduction to leadership foundations</div>
          <div>02 &nbsp; Making decisions with your team</div>
        </div>
        <button type="button" className="button dark">
          Create course <Icon name="ArrowRight" size={16} />
        </button>
      </form>
    </>
  );
}
