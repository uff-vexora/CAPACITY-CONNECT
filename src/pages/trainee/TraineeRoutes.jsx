import { GenericPage } from "../../components/GenericPage";
import { Assessment } from "./Assessment";
import { AssessmentResult } from "./AssessmentResult";
import { Certificates } from "./Certificates";
import { CourseDetails } from "./CourseDetails";
import { Learning } from "./Learning";
import { CoursesList } from "./MyCourses";
import { Profile } from "./Profile";
import { Progress } from "./Progress";
import { Recommended } from "./RecommendedCourses";
import { SkillGap } from "./SkillGap";
import { TraineeDashboard } from "./TraineeDashboard";

export function TraineeRoutes({ page, setPage }) {
  if (page === "Dashboard") return <TraineeDashboard setPage={setPage} />;
  if (page === "Assessment") return <Assessment setPage={setPage} />;
  if (page === "Assessment Result") return <AssessmentResult onViewGap={() => setPage("Skill Gap")} />;
  if (page === "Skill Gap") return <SkillGap setPage={setPage} />;
  if (page === "Recommended") return <Recommended setPage={setPage} />;
  if (page === "Course Details") return <CourseDetails onStartLearning={() => setPage("Learning")} />;
  if (page === "Learning") return <Learning />;
  if (page === "My Profile") return <Profile />;
  if (page === "Progress") return <Progress />;
  if (page === "Certificates") return <Certificates />;
  if (page === "My Courses") return <CoursesList setPage={setPage} />;
  return <GenericPage page={page} title={page} text="This workspace is ready for your organization’s learning activity." />;
}
