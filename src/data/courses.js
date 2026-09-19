export const INITIAL_COURSES = [
  {
    id: "leadership-essentials",
    title: "Leadership Essentials",
    area: "Leadership",
    duration: "4 weeks",
    level: "Foundation",
    trainer: "Anita Verma",
    reason: "Your leadership competency is 26% below the role requirement.",
    enrolled: true,
    defaultCompleted: [0], // 1 module completed initially (25%)
    overview:
      "This program builds the decision-making, feedback, and team coordination habits expected of an Operations Associate transitioning into leadership responsibility.",
    learningOutcomes: [
      "Recognize your leadership style and its impact on cross-functional teams.",
      "Choose the right decision-making approach between consultative and consensus models.",
      "Deliver specific, timely, and actionable feedback that builds high trust.",
      "Lead teams through organizational transitions and high-uncertainty periods.",
    ],
    modules: [
      {
        id: "le-mod-1",
        title: "Understanding your leadership style",
        duration: "12 min",
        youtubeId: "lmyZMtPVodo", // Why good leaders make you feel safe | Simon Sinek | TED
        summary:
          "Explore how empathetic leadership creates an environment of psychological safety and high team performance, featuring key concepts from Simon Sinek.",
        resources: [
          { title: "Leadership Self-Assessment Matrix", url: "https://hbr.org/2020/04/what-makes-a-leader" },
          { title: "Trust and Safety Discussion Guide", url: "https://simonsinek.com" },
        ],
      },
      {
        id: "le-mod-2",
        title: "Making decisions with your team",
        duration: "16 min",
        youtubeId: "9X68dm92HVI", // Are we in control of our decisions? | Dan Ariely | TED
        summary:
          "Behavioral economist Dan Ariely explores how cognitive illusions shape our decision-making and how team leaders can build deliberate, rational choices.",
        resources: [
          { title: "DACI Decision-Making Framework Template", url: "https://www.atlassian.com/team-playbook/plays/daci" },
          { title: "Harvard Decision Protocol Summary", url: "https://hbr.org" },
        ],
      },
      {
        id: "le-mod-3",
        title: "Giving clear, useful feedback",
        duration: "12 min",
        youtubeId: "wtl5UrrgU8c", // The secret to giving great feedback | TED
        summary:
          "Discover the 4-part formula for delivering difficult feedback without triggering defensiveness, based on cognitive neuroscience and behavioral studies.",
        resources: [
          { title: "SBI (Situation-Behavior-Impact) Worksheet", url: "https://www.ccl.org" },
        ],
      },
      {
        id: "le-mod-4",
        title: "Leading through change",
        duration: "15 min",
        youtubeId: "V74AxCqOTvg", // How to start a movement | Derek Sivers | TED
        summary:
          "Derek Sivers deconstructs how movements and transformations actually happen, demonstrating the vital role of the first follower and clear leadership communication.",
        resources: [
          { title: "Kotter 8-Step Change Framework", url: "https://www.kotterinc.com" },
        ],
      },
    ],
  },
  {
    id: "communication-at-work",
    title: "Communication at Work",
    area: "Communication",
    duration: "3 weeks",
    level: "Intermediate",
    trainer: "Rohan Mehta",
    reason: "Built to close the workplace communication gap in your profile.",
    enrolled: true,
    defaultCompleted: [],
    overview:
      "Master active listening, constructive conflict resolution, and executive brevity to make every team meeting and written update crisp and impactful.",
    learningOutcomes: [
      "Apply the 7 C's of professional business communication.",
      "Listen actively and de-escalate workplace disagreements quickly.",
      "Craft concise executive summaries for senior stakeholders.",
    ],
    modules: [
      {
        id: "comm-mod-1",
        title: "How to speak so people listen",
        duration: "10 min",
        youtubeId: "eIho2S0ZahI", // Julian Treasure | TED
        summary:
          "Sound expert Julian Treasure shares the 7 deadly sins of speaking and introduces the HAIL framework (Honesty, Authenticity, Integrity, Love).",
        resources: [
          { title: "Vocal Warmup and Projection Guide", url: "https://ted.com" },
          { title: "Active Listening Checklist", url: "https://mindtools.com" },
        ],
      },
      {
        id: "comm-mod-2",
        title: "10 rules for better conversations & conflict",
        duration: "12 min",
        youtubeId: "R1vskiVDwl4", // Celeste Headlee | TED
        summary:
          "Radio host Celeste Headlee outlines the core tenets of engaging, respectful conversations even when opinions strongly clash.",
        resources: [
          { title: "Crucial Conversations Summary Guide", url: "https://vitalsmarts.com" },
        ],
      },
      {
        id: "comm-mod-3",
        title: "Persuasive communication & speaking smart",
        duration: "15 min",
        youtubeId: "HAnw168huqA", // Matt Abrahams | Stanford
        summary:
          "Stanford lecturer Matt Abrahams shares proven techniques to speak spontaneously, overcome anxiety, and deliver clear, persuasive messages.",
        resources: [
          { title: "Stanford Communication Framework", url: "https://gsb.stanford.edu" },
        ],
      },
    ],
  },
  {
    id: "advanced-team-management",
    title: "Advanced Team Management",
    area: "Leadership + Management",
    duration: "5 weeks",
    level: "Advanced",
    trainer: "Anita Verma",
    reason: "Recommended after Leadership Essentials for team coordination.",
    enrolled: true,
    defaultCompleted: [],
    overview:
      "A deep dive into team psychology, accountability systems, and high-velocity delegation models designed for managers driving multiple workstreams.",
    learningOutcomes: [
      "Diagnose and solve the 5 dysfunctions of a team.",
      "Establish measurable team KPIs and accountability checkpoints.",
      "Delegate outcomes instead of tasks to unlock senior talent.",
    ],
    modules: [
      {
        id: "atm-mod-1",
        title: "Building psychological safety in teams",
        duration: "15 min",
        youtubeId: "LhoLuui9gX8", // Amy Edmondson | TEDx
        summary:
          "Harvard professor Amy Edmondson explains why the highest-performing teams admit mistakes quickly and foster candid discussions.",
        resources: [
          { title: "Project Aristotle Google Research Findings", url: "https://rework.withgoogle.com" },
        ],
      },
      {
        id: "atm-mod-2",
        title: "Team trust and why leaders eat last",
        duration: "14 min",
        youtubeId: "ReRcHdeUG9Y", // Simon Sinek Why Leaders Eat Last
        summary:
          "Simon Sinek explores how deep trust within a team protects everyone from external dangers, creating sustainable collaboration and commitment.",
        resources: [
          { title: "Team Culture Checklist", url: "https://simonsinek.com" },
        ],
      },
      {
        id: "atm-mod-3",
        title: "High-leverage delegation and ownership",
        duration: "13 min",
        youtubeId: "f60dheI4ARg", // Steve Jobs on managing people
        summary:
          "Explore how exceptional teams self-organize through shared vision, high accountability, and outcome-oriented delegation.",
        resources: [
          { title: "Task Delegation Readiness Matrix", url: "https://mindtools.com" },
        ],
      },
    ],
  },
  {
    id: "web-development-foundations",
    title: "Full-Stack Web Development Foundations",
    area: "Engineering & Tech",
    duration: "6 weeks",
    level: "Foundation",
    trainer: "Dev Academy",
    reason: "Core technical capacity building for digital workflows and tools.",
    enrolled: true,
    defaultCompleted: [],
    overview:
      "Understand modern web architecture from frontend components to backend APIs, giving non-engineers and engineers alike the fluency to build and collaborate effectively.",
    learningOutcomes: [
      "Understand the request-response lifecycle and client-server architecture.",
      "Build component-based user interfaces with modern React paradigms.",
      "Connect frontend applications to REST and GraphQL backend services.",
    ],
    modules: [
      {
        id: "web-mod-1",
        title: "HTML, CSS & Modern Web Architecture",
        duration: "18 min",
        youtubeId: "mU6anWqZJcc", // freeCodeCamp HTML/CSS
        summary:
          "Examine modern HTML5 semantic markup, responsive design principles, and how the browser DOM renders interfaces.",
        resources: [
          { title: "MDN Web Docs HTML/CSS Guides", url: "https://developer.mozilla.org" },
        ],
      },
      {
        id: "web-mod-2",
        title: "Modern JavaScript in Practice",
        duration: "15 min",
        youtubeId: "DHjqpvDnNGE", // JS in 100s
        summary:
          "Cover ES6+ syntax, asynchronous programming (Promises, async/await), and manipulating live application data.",
        resources: [
          { title: "JavaScript.info Modern Handbook", url: "https://javascript.info" },
        ],
      },
      {
        id: "web-mod-3",
        title: "React Component-Driven Architecture",
        duration: "16 min",
        youtubeId: "Tn6-PIqc4UM", // React in 100s
        summary:
          "Learn state management, props, reactive hooks, and component lifecycle for building dynamic web apps.",
        resources: [
          { title: "React Official Documentation", url: "https://react.dev" },
        ],
      },
      {
        id: "web-mod-4",
        title: "REST APIs & Backend Integration",
        duration: "14 min",
        youtubeId: "WXsD0ZgxjRw", // APIs for Beginners
        summary:
          "Understand HTTP verbs, headers, status codes, JSON formatting, and how clients authenticate against backend APIs.",
        resources: [
          { title: "Postman API Network Guide", url: "https://postman.com" },
        ],
      },
    ],
  },
  {
    id: "data-analytics-sql",
    title: "Data Analytics & SQL Mastery",
    area: "Data & Operations",
    duration: "4 weeks",
    level: "Intermediate",
    trainer: "Vikram Singh",
    reason: "Directly improves data-driven decision making and query efficiency.",
    enrolled: true,
    defaultCompleted: [],
    overview:
      "Transform raw operational data into actionable business intelligence. Learn SQL querying, data cleaning, aggregation, and impactful data storytelling.",
    learningOutcomes: [
      "Write multi-table SQL queries using JOINs, GROUP BY, and window functions.",
      "Clean, filter, and normalize datasets for executive dashboards.",
      "Translate raw operational metrics into clear management recommendations.",
    ],
    modules: [
      {
        id: "data-mod-1",
        title: "The Data Analytics Workflow",
        duration: "14 min",
        youtubeId: "7mz73uXD9DA", // SQL for Data Analytics
        summary:
          "Walk through the complete analytics pipeline: data collection, cleansing, exploratory analysis, and stakeholder presentation.",
        resources: [
          { title: "Data Analysis Process Cheatsheet", url: "https://kaggle.com" },
        ],
      },
      {
        id: "data-mod-2",
        title: "SQL Fundamentals & Relational Queries",
        duration: "18 min",
        youtubeId: "BPHAr4QGGVE", // SQL Full Course Edureka
        summary:
          "Master SELECT statements, WHERE clauses, ORDER BY, and inner/left joins across relational database schemas.",
        resources: [
          { title: "Interactive SQL Practice Sandbox", url: "https://sqlzoo.net" },
        ],
      },
      {
        id: "data-mod-3",
        title: "Data Visualization & Dashboard Storytelling",
        duration: "12 min",
        youtubeId: "5Zg-C8AAIGg", // David McCandless TED
        summary:
          "Choose the right charts, avoid misleading axes, and highlight critical insights that drive swift organizational action.",
        resources: [
          { title: "Data to Viz Chart Selection Guide", url: "https://data-to-viz.com" },
        ],
      },
    ],
  },
  {
    id: "agile-project-management",
    title: "Agile & Scrum Project Management",
    area: "Delivery & Operations",
    duration: "4 weeks",
    level: "Foundation",
    trainer: "Priya Nair",
    reason: "Elevates cross-team delivery pace and sprint efficiency.",
    enrolled: true,
    defaultCompleted: [],
    overview:
      "Learn the industry-standard Scrum framework to run fast iterations, eliminate delivery roadblocks, and foster self-organizing teams.",
    learningOutcomes: [
      "Facilitate standard Scrum ceremonies (Sprint Planning, Daily Standup, Review, Retrospective).",
      "Write clear User Stories with testable Acceptance Criteria.",
      "Calculate team velocity and manage backlog burndown effectively.",
    ],
    modules: [
      {
        id: "agile-mod-1",
        title: "Scrum Framework in Action",
        duration: "15 min",
        youtubeId: "2Vt7Ik8Ublw", // Scrum in under 5 minutes
        summary:
          "Understand the three Scrum roles (Product Owner, Scrum Master, Developers) and sprint cadence cycles.",
        resources: [
          { title: "The Official Scrum Guide", url: "https://scrumguides.org" },
        ],
      },
      {
        id: "agile-mod-2",
        title: "Scrum Master Training & User Stories",
        duration: "16 min",
        youtubeId: "gxeyeNUgB_0", // Simplilearn Agile Scrum Master
        summary:
          "Structure user stories with clear acceptance criteria, definition of done, and value-based sprint prioritization.",
        resources: [
          { title: "INVEST Story Checklist", url: "https://agilealliance.org" },
        ],
      },
      {
        id: "agile-mod-3",
        title: "Continuous Improvement & Resilience",
        duration: "11 min",
        youtubeId: "H14bBuluwB8", // Angela Lee Duckworth | TED Grit
        summary:
          "Run high-impact retrospectives and build organizational grit to persevere through project bottlenecks.",
        resources: [
          { title: "Retrospective Ideas Toolkit", url: "https://tastycupcakes.org" },
        ],
      },
    ],
  },
  {
    id: "ai-prompt-engineering",
    title: "Generative AI & Prompt Engineering for Work",
    area: "AI & Innovation",
    duration: "3 weeks",
    level: "Intermediate",
    trainer: "AI Research Lab",
    reason: "Future-proof your productivity with generative AI and automated workflows.",
    enrolled: true,
    defaultCompleted: [],
    overview:
      "Harness Large Language Models to draft high-level reports, automate administrative analysis, summarize dense data, and build reliable workplace AI workflows.",
    learningOutcomes: [
      "Understand how LLMs generate responses and avoid hallucination risks.",
      "Apply few-shot prompting, chain-of-thought, and role framing techniques.",
      "Automate repetitive daily tasks while maintaining data privacy and security.",
    ],
    modules: [
      {
        id: "ai-mod-1",
        title: "How Large Language Models Work",
        duration: "14 min",
        youtubeId: "zjkBMFhNj_g", // Andrej Karpathy LLM Intro
        summary:
          "Demystify tokens, context windows, temperature, and training processes behind modern generative AI tools.",
        resources: [
          { title: "Anthropic Prompt Engineering Interactive Guide", url: "https://docs.anthropic.com" },
        ],
      },
      {
        id: "ai-mod-2",
        title: "Prompt Engineering Best Practices",
        duration: "17 min",
        youtubeId: "jC4v5AS4RIM", // Master Prompt Formula
        summary:
          "Learn structured prompt patterns: clear instructions, giving models time to think, and iterative refinement.",
        resources: [
          { title: "DeepLearning.AI Prompt Cheatsheet", url: "https://deeplearning.ai" },
        ],
      },
      {
        id: "ai-mod-3",
        title: "Opportunities and Governance in AI",
        duration: "13 min",
        youtubeId: "5p248yoa3oE", // Andrew Ng Opportunities in AI
        summary:
          "Implement AI assistants securely without leaking sensitive corporate data, ensuring verifiable outputs and audit trails.",
        resources: [
          { title: "NIST AI Risk Management Framework", url: "https://nist.gov" },
        ],
      },
    ],
  },
];

const STORAGE_KEY = "capacity_user_courses_progress_v2";

export function loadUserProgress() {
  let stored = {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) stored = JSON.parse(raw);
  } catch (e) {
    console.error("Failed to load user course progress:", e);
  }

  const merged = { ...stored };
  for (const c of INITIAL_COURSES) {
    if (!merged[c.id]) {
      const completed = c.defaultCompleted || [];
      const percent = c.modules.length > 0 ? Math.round((completed.length / c.modules.length) * 100) : 0;
      merged[c.id] = {
        enrolled: true, // ALL courses enrolled by default so they appear in My Courses!
        completedModules: completed,
        percent: percent,
        notes: {},
      };
    } else {
      // Ensure enrolled is true
      merged[c.id].enrolled = true;
    }
  }
  return merged;
}

const CUSTOM_COURSES_KEY = "capacity_custom_courses";
const COURSE_STATUS_KEY = "capacity_courses_status";

export function loadCustomCourses() {
  try {
    const raw = localStorage.getItem(CUSTOM_COURSES_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return [];
}

export function saveCustomCourses(courses) {
  try {
    localStorage.setItem(CUSTOM_COURSES_KEY, JSON.stringify(courses));
  } catch (e) {
    console.error(e);
  }
}

export function addCustomCourse(course) {
  const current = loadCustomCourses();
  const updated = [course, ...current];
  saveCustomCourses(updated);
  return updated;
}

export function loadCourseStatuses() {
  try {
    const raw = localStorage.getItem(COURSE_STATUS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return {};
}

export function saveCourseStatus(courseId, status) {
  const statuses = loadCourseStatuses();
  statuses[courseId] = status;
  try {
    localStorage.setItem(COURSE_STATUS_KEY, JSON.stringify(statuses));
  } catch (e) {
    console.error(e);
  }
  return statuses;
}

export function getAllCatalogCourses() {
  const custom = loadCustomCourses();
  const statuses = loadCourseStatuses();
  const combined = [...INITIAL_COURSES, ...custom];
  return combined.map((c) => ({
    ...c,
    status: statuses[c.id] || "Published",
  }));
}

export function saveUserProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error("Failed to save progress:", e);
  }
}

export function getCourses(userProgress = loadUserProgress()) {
  const allCatalog = getAllCatalogCourses();
  // Filter out archived courses for standard learning
  const activeCatalog = allCatalog.filter((c) => c.status !== "Archived");

  return activeCatalog.map((course) => {
    const p = userProgress[course.id] || {
      enrolled: true,
      completedModules: course.defaultCompleted || [],
      percent: 0,
      notes: {},
    };
    const totalModules = (course.modules || []).length;
    const completedCount = (p.completedModules || []).length;
    const percent = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;

    return {
      ...course,
      enrolled: true, // Visible in My Courses!
      progress: percent,
      completedModules: p.completedModules || [],
      notes: p.notes || {},
    };
  });
}

export const courses = getCourses();
