export const COURSE_ASSESSMENTS = {
  "leadership-essentials": {
    courseId: "leadership-essentials",
    courseTitle: "Leadership Essentials",
    skill: "Leadership",
    requiredScore: 80,
    timeMinutes: 15,
    description: "Evaluates fundamental leadership habits, decision frameworks, feedback mechanisms, and team trust building.",
    questions: [
      {
        id: "le-q1",
        skill: "Leadership",
        question: "When a project milestone is at risk due to competing cross-team priorities, what is your primary course of action as a leader?",
        options: [
          "Escalate immediately to senior executives without consulting team leads.",
          "Convene cross-team leads, analyze dependencies collaboratively, and negotiate deliverables.",
          "Absorb the pending work alone to spare the team from stress.",
          "Quietly defer tasks without notifying external stakeholders."
        ],
        correctAnswer: 1,
        explanation: "Effective leaders convene stakeholders, realign dependencies transparently, and negotiate practical tradeoffs rather than escalating prematurely."
      },
      {
        id: "le-q2",
        skill: "Leadership",
        question: "According to modern neuroscience and feedback frameworks (such as SBI), what makes workplace feedback most effective?",
        options: [
          "Delivering it only during the annual performance review.",
          "Focusing primarily on personal traits and subjective attitudes.",
          "Making it specific, timely, and focused on objective behavior and observed impact.",
          "Keeping it intentionally vague so the employee doesn't feel singled out."
        ],
        correctAnswer: 2,
        explanation: "The Situation-Behavior-Impact (SBI) framework emphasizes concrete situations, observable behaviors, and measurable impact delivered promptly."
      },
      {
        id: "le-q3",
        skill: "Leadership",
        question: "What is the primary indicator of psychological safety within a high-performing team?",
        options: [
          "Zero disagreements during weekly strategy meetings.",
          "Team members feel comfortable speaking up about mistakes without fear of ridicule or penalty.",
          "All decisions are made strictly by unanimous consensus.",
          "Tasks are assigned without open discussion to preserve authority."
        ],
        correctAnswer: 1,
        explanation: "Psychological safety, as proven by Amy Edmondson and Google's Project Aristotle, means team members feel safe taking interpersonal risks and acknowledging errors."
      },
      {
        id: "le-q4",
        skill: "Leadership",
        question: "In the DACI decision-making model, what does the 'D' represent?",
        options: [
          "Director (the highest-ranking executive present)",
          "Driver (the individual responsible for shepherding the decision to conclusion)",
          "Delegator (the manager who assigns the task)",
          "Debater (the person playing devil's advocate)"
        ],
        correctAnswer: 1,
        explanation: "In the DACI framework, D stands for Driver—the person who gathers context, facilitates discussions, and moves the decision forward."
      },
      {
        id: "le-q5",
        skill: "Leadership",
        question: "A high-performing senior associate expresses burnout due to recurring ad-hoc tasks. How should a team lead respond?",
        options: [
          "Advise them to work overtime until the quarterly cycle ends.",
          "Audit current work in progress, establish clearer boundary agreements, and prioritize core outcomes.",
          "Reassign all their responsibilities to junior team members immediately.",
          "Ignore the complaint since high performers always manage somehow."
        ],
        correctAnswer: 1,
        explanation: "Auditing WIP and creating protected bandwidth enables sustainable high performance while showing organizational empathy."
      },
      {
        id: "le-q6",
        skill: "Leadership",
        question: "How does 'empathic leadership' differ from permissive management?",
        options: [
          "Empathic leaders hold high standards while providing authentic support and psychological safety.",
          "Empathic leaders never hold team members accountable for missed deadlines.",
          "Permissive management is always superior in tech environments.",
          "There is no practical difference between the two terms."
        ],
        correctAnswer: 0,
        explanation: "True empathy pairs high accountability with deep human support, helping team members achieve excellence sustainably."
      },
      {
        id: "le-q7",
        skill: "Leadership",
        question: "During an organizational change, some team members are resistant to new workflows. What is the most effective approach?",
        options: [
          "Mandate immediate compliance and threaten corrective action.",
          "Listen to concerns, explain the strategic 'Why', and involve them in shaping implementation details.",
          "Abandon the change initiative completely.",
          "Exclude the skeptical members from future team communications."
        ],
        correctAnswer: 1,
        explanation: "Explaining the strategic purpose and involving skeptics in process refinement turns resistance into constructive engagement."
      },
      {
        id: "le-q8",
        skill: "Leadership",
        question: "When delegating a complex initiative, which practice best empowers the assignee?",
        options: [
          "Instructing them on every granular micro-step to follow daily.",
          "Defining the expected end outcomes, success criteria, and escalation thresholds, then granting autonomy.",
          "Providing zero documentation and letting them figure it out alone.",
          "Checking their screen every 30 minutes to verify compliance."
        ],
        correctAnswer: 1,
        explanation: "Outcome-based delegation gives talented team members ownership over execution while keeping boundaries and goals transparent."
      },
      {
        id: "le-q9",
        skill: "Leadership",
        question: "What is a major danger of 'Groupthink' in cross-functional team decision making?",
        options: [
          "Too many ideas are generated too quickly.",
          "Critical flaws in a proposal are ignored to preserve harmony or agree with authority.",
          "Decisions take longer because of intense healthy debate.",
          "Team members refuse to talk to each other."
        ],
        correctAnswer: 1,
        explanation: "Groupthink suppresses dissenting viewpoints and critical examination in favor of superficial consensus."
      },
      {
        id: "le-q10",
        skill: "Leadership",
        question: "What role does recognition play in reinforcing team capability and morale?",
        options: [
          "It should only be given to team leads to preserve hierarchy.",
          "It is unnecessary if salaries are competitive.",
          "Specific, timely public recognition reinforces target behaviors and elevates team motivation.",
          "Recognition should be saved solely for year-end bonuses."
        ],
        correctAnswer: 2,
        explanation: "Recognizing specific achievements promptly reinforces cultural values and shows members that their contributions matter."
      }
    ]
  },
  "communication-at-work": {
    courseId: "communication-at-work",
    courseTitle: "Communication at Work",
    skill: "Communication",
    requiredScore: 80,
    timeMinutes: 15,
    description: "Tests active listening, constructive conflict resolution, executive brevity, and written business clarity.",
    questions: [
      {
        id: "comm-q1",
        skill: "Communication",
        question: "What does the Minto Pyramid Principle recommend when presenting recommendations to executive leaders?",
        options: [
          "Build up the full chronological background before stating the conclusion.",
          "Lead immediately with the core conclusion or recommendation, followed by supporting logic.",
          "Provide only technical raw data without any synthesized takeaway.",
          "Hide the financial implications until the final slide."
        ],
        correctAnswer: 1,
        explanation: "The Pyramid Principle advocates 'Bottom Line Up Front' (BLUF)—stating the recommendation first, then grouping supporting rationale."
      },
      {
        id: "comm-q2",
        skill: "Communication",
        question: "Which of the following is an example of an 'Active Listening' behavior?",
        options: [
          "Thinking about your counter-argument while the speaker is talking.",
          "Paraphrasing key points back to the speaker to verify understanding before responding.",
          "Interrupting immediately as soon as you spot a factual error.",
          "Checking notifications on your phone while maintaining eye contact."
        ],
        correctAnswer: 1,
        explanation: "Paraphrasing confirms accurate reception of the message and indicates genuine engagement with the speaker."
      },
      {
        id: "comm-q3",
        skill: "Communication",
        question: "In professional correspondence, what are the '7 C's' of communication designed to achieve?",
        options: [
          "Ensuring emails are at least 500 words long.",
          "Making communication Clear, Concise, Concrete, Correct, Coherent, Complete, and Courteous.",
          "Restricting communication to executive management only.",
          "Eliminating the need for subject lines."
        ],
        correctAnswer: 1,
        explanation: "The 7 C's ensure messages are professional, unambiguous, and respect the recipient's cognitive bandwidth."
      },
      {
        id: "comm-q4",
        skill: "Communication",
        question: "Two department leads strongly disagree on resource allocation for next quarter. How should the meeting facilitator handle it?",
        options: [
          "Shut down the discussion immediately and tell them to figure it out off-line.",
          "Frame the disagreement around shared organizational objectives and evaluate options against objective criteria.",
          "Side publicly with the louder department lead.",
          "Delay the decision indefinitely until both naturally agree."
        ],
        correctAnswer: 1,
        explanation: "Reframing conflict around shared company goals and objective evaluation criteria turns emotional clashes into constructive problem solving."
      },
      {
        id: "comm-q5",
        skill: "Communication",
        question: "What is the primary risk of relying solely on asynchronous text (e.g. Slack, email) for emotionally sensitive feedback?",
        options: [
          "It takes longer to type than to speak.",
          "Absence of tone, micro-expressions, and real-time inflection frequently leads to misinterpretation.",
          "Text messages are always deleted automatically.",
          "There is no risk; text is always preferable."
        ],
        correctAnswer: 1,
        explanation: "Without vocal tone and body language, neutral written words are often interpreted negatively or defensively."
      },
      {
        id: "comm-q6",
        skill: "Communication",
        question: "In Julian Treasure's HAIL framework for powerful speaking, what does 'A' stand for?",
        options: [
          "Aggressiveness (asserting dominance early)",
          "Authenticity (being yourself and standing in your truth)",
          "Ambiguity (leaving room for interpretation)",
          "Articulate (speaking in complex vocabulary)"
        ],
        correctAnswer: 1,
        explanation: "HAIL stands for Honesty, Authenticity, Integrity, and Love (wishing people well)."
      },
      {
        id: "comm-q7",
        skill: "Communication",
        question: "When writing a project update email, which formatting technique best aids readability for busy stakeholders?",
        options: [
          "A single dense 3-paragraph wall of text.",
          "Bullet points highlighting key achievements, blockers, and next actions with bold headers.",
          "All-caps text for emphasis.",
          "Omitting dates and names to keep it brief."
        ],
        correctAnswer: 1,
        explanation: "Structured bullets with visual hierarchy allow stakeholders to scan and comprehend critical takeaways in seconds."
      },
      {
        id: "comm-q8",
        skill: "Communication",
        question: "What is the primary purpose of 'Crucial Conversations' techniques when stakes are high?",
        options: [
          "To guarantee you win every debate regardless of team consensus.",
          "To make it safe to discuss controversial, high-stakes matters candidly without triggering fight-or-flight.",
          "To postpone confrontation until performance review season.",
          "To script conversations word-for-word in advance."
        ],
        correctAnswer: 1,
        explanation: "Crucial Conversations focus on maintaining psychological safety and mutual purpose when opinions differ and emotions run high."
      },
      {
        id: "comm-q9",
        skill: "Communication",
        question: "How should you respond when an executive asks a direct question in a meeting and you don't know the exact answer?",
        options: [
          "Guess with high confidence and hope they don't verify.",
          "Acknowledge clearly that you don't have the exact figure, explain how you will get it, and commit to a specific follow-up time.",
          "Deflect by blaming a peer who isn't present in the meeting.",
          "Change the topic abruptly."
        ],
        correctAnswer: 1,
        explanation: "Transparent intellectual honesty combined with an accountable follow-up commitment preserves executive trust."
      },
      {
        id: "comm-q10",
        skill: "Communication",
        question: "What does 'non-verbal alignment' mean in high-stakes presentations?",
        options: [
          "Remaining completely frozen and expressionless while speaking.",
          "Ensuring your posture, eye contact, and vocal pace reinforce rather than contradict your verbal message.",
          "Using exaggerated theatrical gestures continuously.",
          "Looking exclusively at your presentation slides."
        ],
        correctAnswer: 1,
        explanation: "When body language and vocal delivery mirror the message, credibility and persuasiveness are amplified."
      }
    ]
  },
  "advanced-team-management": {
    courseId: "advanced-team-management",
    courseTitle: "Advanced Team Management",
    skill: "Management",
    requiredScore: 80,
    timeMinutes: 15,
    description: "Evaluates high-leverage delegation, cross-functional team scaling, KPI management, and team dysfunction diagnostics.",
    questions: [
      {
        id: "atm-q1",
        skill: "Management",
        question: "According to Patrick Lencioni's 'Five Dysfunctions of a Team', what is the foundational dysfunction at the base of the pyramid?",
        options: [
          "Avoidance of Accountability",
          "Absence of Trust",
          "Lack of Commitment",
          "Inattention to Results"
        ],
        correctAnswer: 1,
        explanation: "Without vulnerability-based trust at the foundation, teams cannot engage in healthy ideological conflict or achieve true commitment."
      },
      {
        id: "atm-q2",
        skill: "Management",
        question: "What is the key difference between managing tasks and managing outcomes?",
        options: [
          "Managing outcomes focuses on results and metric targets, empowering team members to determine the best path.",
          "Managing tasks is always faster and requires less managerial effort.",
          "Managing outcomes means ignoring deadlines completely.",
          "Managing tasks requires zero check-ins."
        ],
        correctAnswer: 0,
        explanation: "Outcome-driven management defines clear goals and quality metrics while leaving tactical execution to the team's discretion."
      },
      {
        id: "atm-q3",
        skill: "Management",
        question: "How should a manager handle a team member consistently missing sprint commitments?",
        options: [
          "Publicly shame them in front of the entire team during daily standup.",
          "Conduct a private root-cause 1-on-1, assess workload/skill blockers, and establish measurable milestone checkpoints.",
          "Silently reassign all their work without having a conversation.",
          "Ignore the issue to preserve team morale."
        ],
        correctAnswer: 1,
        explanation: "Constructive 1-on-1 diagnostics uncover systemic bottlenecks, training gaps, or estimation issues before taking corrective steps."
      },
      {
        id: "atm-q4",
        skill: "Management",
        question: "What makes OKRs (Objectives and Key Results) more effective than traditional static goal lists?",
        options: [
          "OKRs pair inspirational qualitative objectives with quantifiable, time-bound key results.",
          "OKRs cannot be changed for 5 years.",
          "OKRs are assigned exclusively to senior executives.",
          "OKRs do not require team tracking."
        ],
        correctAnswer: 0,
        explanation: "OKRs connect ambitious directional goals with concrete, measurable metrics that can be tracked iteratively."
      },
      {
        id: "atm-q5",
        skill: "Management",
        question: "When managing cross-functional teams with competing dependencies, what is the best strategy to prevent bottleneck delays?",
        options: [
          "Have each subgroup work in total isolation.",
          "Establish transparent dependency mapping and regular inter-team synchronization touchpoints.",
          "Cancel all joint deliverables and reduce project scope by 90%.",
          "Escalate daily to executive sponsors."
        ],
        correctAnswer: 1,
        explanation: "Visible dependency boards and cadenced alignments allow leads to unblock blockers before they derail project timelines."
      },
      {
        id: "atm-q6",
        skill: "Management",
        question: "What is the primary benefit of conducting structured team retrospectives?",
        options: [
          "Finding someone specific to blame for missed milestones.",
          "Reflecting on process successes and pain points to implement targeted, iterative improvements.",
          "Filling out administrative compliance paperwork.",
          "Cancelling future team meetings."
        ],
        correctAnswer: 1,
        explanation: "Retrospectives provide psychological space to evaluate workflows and commit to concrete continuous improvement actions."
      },
      {
        id: "atm-q7",
        skill: "Management",
        question: "Under the Situational Leadership model, how should management style adapt when a team member is highly competent and confident?",
        options: [
          "Use a Directing style with step-by-step supervision.",
          "Use a Delegating style, providing high autonomy and strategic governance.",
          "Keep them on basic probation tasks.",
          "Transfer them to another department."
        ],
        correctAnswer: 1,
        explanation: "High competence and commitment warrant a delegating approach, freeing leadership time and maximizing team velocity."
      },
      {
        id: "atm-q8",
        skill: "Management",
        question: "Why is 'healthy conflict' essential for high-performing teams?",
        options: [
          "It breaks friendships and keeps members emotionally detached.",
          "It surfaces best ideas, stress-tests assumptions, and creates true commitment through genuine debate.",
          "It proves who is the smartest person in the room.",
          "It shortens team meetings."
        ],
        correctAnswer: 1,
        explanation: "Teams that debate ideas vigorously without personal rancor produce stronger strategies and avoid blind spots."
      },
      {
        id: "atm-q9",
        skill: "Management",
        question: "What is a 'Single Point of Failure' (SPOF) in workforce capacity planning?",
        options: [
          "A server that lacks backup power.",
          "A critical operational process known only to one person, creating extreme vulnerability if they leave or are unavailable.",
          "A team with too many managers.",
          "An assessment with a high passing score."
        ],
        correctAnswer: 1,
        explanation: "Workforce SPOFs represent operational vulnerability; proactive leaders cross-train team members to build redundancy."
      },
      {
        id: "atm-q10",
        skill: "Management",
        question: "How should a manager balance team autonomy with executive oversight?",
        options: [
          "By practicing micro-management during weekdays and autonomy on weekends.",
          "By establishing transparent dashboards, agreed KPIs, and clear escalation triggers while trusting day-to-day execution.",
          "By never reporting status to executives.",
          "By eliminating all team autonomy."
        ],
        correctAnswer: 1,
        explanation: "Transparent telemetry and agreed boundaries give leadership confidence without suffocating team initiative."
      }
    ]
  },
  "web-development-foundations": {
    courseId: "web-development-foundations",
    courseTitle: "Full-Stack Web Development Foundations",
    skill: "Engineering & Tech",
    requiredScore: 80,
    timeMinutes: 15,
    description: "Evaluates modern HTML/CSS architecture, JavaScript runtime, React component models, and REST API integration.",
    questions: [
      {
        id: "web-q1",
        skill: "Engineering",
        question: "In modern client-server architecture, what is the primary role of a RESTful API?",
        options: [
          "To design CSS styles for mobile browsers.",
          "To serve as a standardized stateless communication protocol exchanging structured data (such as JSON) between client and server.",
          "To compile JavaScript into machine binary.",
          "To manage physical network cabling."
        ],
        correctAnswer: 1,
        explanation: "REST APIs provide a stateless contract for clients to perform CRUD operations over standard HTTP verbs."
      },
      {
        id: "web-q2",
        skill: "Engineering",
        question: "Which HTTP status code signifies that a requested resource was successfully created on the server?",
        options: ["200 OK", "201 Created", "204 No Content", "304 Not Modified"],
        correctAnswer: 1,
        explanation: "HTTP 201 Created explicitly confirms that the request succeeded and resulted in a new resource creation."
      },
      {
        id: "web-q3",
        skill: "Engineering",
        question: "In React, what is the fundamental difference between 'props' and 'state'?",
        options: [
          "Props are mutable data owned by the component; state is immutable data passed from outside.",
          "Props are read-only data passed from parent to child; state is local mutable data managed within the component.",
          "There is no difference; they are aliases for the same object.",
          "Props only work with class components; state only works with functional components."
        ],
        correctAnswer: 1,
        explanation: "Props flow downwards as inputs; state represents internal reactive memory that triggers re-renders upon change."
      },
      {
        id: "web-q4",
        skill: "Engineering",
        question: "What happens when an asynchronous JavaScript function uses 'await' on a Promise?",
        options: [
          "The entire browser window freezes and stops accepting user input.",
          "Execution of that async function pauses until the Promise resolves or rejects, while the event loop continues handling other tasks.",
          "The code immediately throws a syntax error.",
          "The server restarts automatically."
        ],
        correctAnswer: 1,
        explanation: "Async/await offers non-blocking asynchronous control flow; the engine pauses that specific routine without blocking the main event thread."
      },
      {
        id: "web-q5",
        skill: "Engineering",
        question: "Why are semantic HTML tags (like <header>, <main>, <article>, <nav>) preferred over generic <div> tags?",
        options: [
          "They automatically apply CSS styling without any stylesheet.",
          "They improve screen-reader accessibility, SEO indexing, and document maintainability.",
          "They make the browser download code faster.",
          "Non-semantic tags are deprecated in HTML5."
        ],
        correctAnswer: 1,
        explanation: "Semantic tags describe the meaning of content to user agents, assistive technologies, and web crawlers."
      },
      {
        id: "web-q6",
        skill: "Engineering",
        question: "Which CSS property is used to create a responsive, one-dimensional flexible layout for aligning items?",
        options: ["display: flex", "display: block", "float: left", "position: static"],
        correctAnswer: 0,
        explanation: "Flexbox (display: flex) provides powerful one-dimensional distribution and alignment capabilities across responsive viewports."
      },
      {
        id: "web-q7",
        skill: "Engineering",
        question: "What is the primary danger of concatenating unescaped user input directly into database queries?",
        options: [
          "Slow network connection.",
          "SQL Injection vulnerabilities allowing attackers to read, manipulate, or destroy database contents.",
          "Memory leak in the browser.",
          "CSS layout breaking."
        ],
        correctAnswer: 1,
        explanation: "SQL Injection occurs when untrusted input alters query structure; parameterized queries and ORMs protect against this."
      },
      {
        id: "web-q8",
        skill: "Engineering",
        question: "What is the purpose of JWT (JSON Web Tokens) in modern web applications?",
        options: [
          "To compress video files for faster streaming.",
          "To securely transmit verifiable claims between parties as a compact, digitally signed bearer token for authentication.",
          "To format JSON output with indentations.",
          "To test backend server speed."
        ],
        correctAnswer: 1,
        explanation: "JWTs provide stateless authorization tokens signed cryptographically with secrets or public/private key pairs."
      },
      {
        id: "web-q9",
        skill: "Engineering",
        question: "What does CORS (Cross-Origin Resource Sharing) protect against in web browsers?",
        options: [
          "Malicious websites reading sensitive data from another domain on behalf of an authenticated user without server permission.",
          "Users downloading large image files.",
          "Browsers using dark mode themes.",
          "Slow server response times."
        ],
        correctAnswer: 0,
        explanation: "CORS is a browser security mechanism that restricts HTTP requests initiated from scripts running in another domain."
      },
      {
        id: "web-q10",
        skill: "Engineering",
        question: "In Git version control, what does 'git pull' perform under the hood?",
        options: [
          "It deletes remote branches.",
          "It runs 'git fetch' to retrieve remote commits followed by 'git merge' into the current branch.",
          "It discards all local uncommitted changes.",
          "It pushes local commits to GitHub."
        ],
        correctAnswer: 1,
        explanation: "Git pull combines fetching the latest commits from the remote repository with merging them into the current active branch."
      }
    ]
  },
  "data-analytics-sql": {
    courseId: "data-analytics-sql",
    courseTitle: "Data Analytics & SQL Mastery",
    skill: "Data & Analytics",
    requiredScore: 80,
    timeMinutes: 15,
    description: "Evaluates relational SQL queries, table joins, aggregations, data cleansing pipelines, and dashboard visualization principles.",
    questions: [
      {
        id: "data-q1",
        skill: "Data & Analytics",
        question: "In SQL, which clause is used to filter records resulting from an aggregate function like SUM() or COUNT()?",
        options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"],
        correctAnswer: 1,
        explanation: "WHERE filters rows before aggregation; HAVING filters groups after aggregate calculations."
      },
      {
        id: "data-q2",
        skill: "Data & Analytics",
        question: "What is the difference between an INNER JOIN and a LEFT JOIN in SQL?",
        options: [
          "INNER JOIN returns only rows with matches in both tables; LEFT JOIN returns all rows from the left table plus matched rows from the right.",
          "LEFT JOIN only works with number columns.",
          "INNER JOIN deletes non-matching rows from the database disk.",
          "There is no difference; they are interchangeable."
        ],
        correctAnswer: 0,
        explanation: "INNER JOIN produces the intersection of two tables; LEFT JOIN preserves all records from the primary table even with NULL matches."
      },
      {
        id: "data-q3",
        skill: "Data & Analytics",
        question: "Which SQL aggregate function counts the number of distinct values in a column, ignoring duplicate rows?",
        options: ["COUNT(*)", "COUNT(DISTINCT column_name)", "SUM(DISTINCT column_name)", "UNIQUE(column_name)"],
        correctAnswer: 1,
        explanation: "COUNT(DISTINCT column_name) evaluates unique values in the specified field while skipping repeats."
      },
      {
        id: "data-q4",
        skill: "Data & Analytics",
        question: "What is database 'Normalization' primarily designed to achieve?",
        options: [
          "Increase disk storage usage.",
          "Reduce data redundancy, eliminate update anomalies, and enforce relational data integrity.",
          "Convert SQL tables into Excel files.",
          "Remove all primary keys."
        ],
        correctAnswer: 1,
        explanation: "Normalization decomposes complex tables to minimize redundancy and prevent conflicting updates across records."
      },
      {
        id: "data-q5",
        skill: "Data & Analytics",
        question: "When visualizing time-series data showing monthly revenue trends over 3 years, which chart type is most appropriate?",
        options: ["Pie chart", "Line chart", "Scatter plot with no lines", "Radar chart"],
        correctAnswer: 1,
        explanation: "Line charts naturally communicate continuous chronological progression and trend patterns over time."
      },
      {
        id: "data-q6",
        skill: "Data & Analytics",
        question: "What is the danger of setting the vertical Y-axis baseline to a non-zero value in a bar chart?",
        options: [
          "The chart prints in black and white.",
          "It visually exaggerates differences between categories, potentially misleading stakeholders.",
          "It makes the SQL query run slower.",
          "It is completely standard and has no negative effect."
        ],
        correctAnswer: 1,
        explanation: "Truncated axes distort the relative proportions between bars, leading viewers to perceive small differences as massive changes."
      },
      {
        id: "data-q7",
        skill: "Data & Analytics",
        question: "In data analytics, what does 'imputing missing values' mean?",
        options: [
          "Deleting the entire database column.",
          "Replacing missing or null data points with estimated values (such as the mean, median, or modeled value).",
          "Exporting data into CSV format.",
          "Renaming column headers."
        ],
        correctAnswer: 1,
        explanation: "Imputation estimates missing values statistically so that downstream analysis or models can process complete records."
      },
      {
        id: "data-q8",
        skill: "Data & Analytics",
        question: "Which SQL statement is used to remove all records from a table while keeping the table structure intact?",
        options: ["DROP TABLE table_name", "TRUNCATE TABLE table_name", "REMOVE TABLE table_name", "ALTER TABLE table_name"],
        correctAnswer: 1,
        explanation: "TRUNCATE TABLE quickly removes all rows while preserving schema definitions, whereas DROP TABLE destroys the schema."
      },
      {
        id: "data-q9",
        skill: "Data & Analytics",
        question: "What does an 'index' on a database table do?",
        options: [
          "It changes the data types of all numbers to text.",
          "It builds an optimized lookup data structure (e.g. B-Tree) that significantly speeds up SELECT queries at the cost of slight write overhead.",
          "It automatically encrypts all passwords.",
          "It limits the table to 1,000 rows."
        ],
        correctAnswer: 1,
        explanation: "Database indexes allow the query engine to locate matching records quickly without scanning the entire table sequentially."
      },
      {
        id: "data-q10",
        skill: "Data & Analytics",
        question: "What is the difference between 'Correlation' and 'Causation' in business analytics?",
        options: [
          "They are exact synonyms.",
          "Correlation means two variables change together, but it does not prove that one directly causes the other.",
          "Causation only applies to marketing data.",
          "Correlation proves that one event created the other."
        ],
        correctAnswer: 1,
        explanation: "Two metrics may correlate due to a third confounding variable or coincidence; establishing causality requires rigorous testing."
      }
    ]
  },
  "agile-project-management": {
    courseId: "agile-project-management",
    courseTitle: "Agile & Scrum Project Management",
    skill: "Delivery & Agile",
    requiredScore: 80,
    timeMinutes: 15,
    description: "Evaluates Scrum framework ceremonies, user story refinement, backlog prioritization, team velocity, and sprint delivery.",
    questions: [
      {
        id: "agile-q1",
        skill: "Delivery & Agile",
        question: "In the Scrum framework, who is solely accountable for maximizing the value of the product and managing the Product Backlog?",
        options: ["The Scrum Master", "The Product Owner", "The Lead Developer", "The Project Sponsor"],
        correctAnswer: 1,
        explanation: "The Product Owner owns the vision, prioritizes backlog items, and ensures the team builds high-value deliverables."
      },
      {
        id: "agile-q2",
        skill: "Delivery & Agile",
        question: "What is the recommended timebox for a Daily Scrum (Standup) in standard Scrum teams?",
        options: ["60 minutes", "15 minutes", "30 minutes", "As long as needed until all tasks are solved"],
        correctAnswer: 1,
        explanation: "The Daily Scrum is intentionally timeboxed to 15 minutes to synchronize work and identify blockers without devolving into problem-solving sessions."
      },
      {
        id: "agile-q3",
        skill: "Delivery & Agile",
        question: "What does the INVEST mnemonic stand for when writing effective User Stories?",
        options: [
          "Important, Negotiable, Verifiable, Expensive, Simple, Timely",
          "Independent, Negotiable, Valuable, Estimable, Small, Testable",
          "Integrated, Normalized, Variable, Estimated, Standardized, Tested",
          "Innovative, Numeric, Visual, Executive, Scalable, Trustworthy"
        ],
        correctAnswer: 1,
        explanation: "INVEST criteria ensure stories are self-contained, negotiable, valuable to users, estimable, right-sized, and verifiable with acceptance tests."
      },
      {
        id: "agile-q4",
        skill: "Delivery & Agile",
        question: "What is the 'Definition of Done' (DoD) in Scrum?",
        options: [
          "When a developer finishes typing code on their local laptop.",
          "A formal, shared agreement detailing all quality criteria a product increment must satisfy before being considered releasable.",
          "The date when the sprint ends on the calendar.",
          "The list of features the customer requested."
        ],
        correctAnswer: 1,
        explanation: "The DoD creates transparency by ensuring all team members share the exact same standards of quality and completion."
      },
      {
        id: "agile-q5",
        skill: "Delivery & Agile",
        question: "How should a Scrum Master respond when a stakeholder attempts to add new tasks directly into an active sprint?",
        options: [
          "Immediately add the tasks and tell developers to work extra weekends.",
          "Protect the sprint goal, explain the Scrum framework, and guide the stakeholder to collaborate with the Product Owner for future sprint planning.",
          "Ignore the stakeholder completely.",
          "Cancel the sprint."
        ],
        correctAnswer: 1,
        explanation: "The Scrum Master defends sprint commitments and redirects scope adjustments through the Product Owner's backlog prioritization."
      },
      {
        id: "agile-q6",
        skill: "Delivery & Agile",
        question: "What does a team's 'Velocity' measure in Agile development?",
        options: [
          "The number of hours each developer sits at their desk.",
          "The amount of product backlog units (story points) completed and accepted per sprint according to the Definition of Done.",
          "How fast the team types code in lines per minute.",
          "The speed of the network server."
        ],
        correctAnswer: 1,
        explanation: "Velocity measures empirical throughput of completed work over iterations, helping teams forecast future capacity reliably."
      },
      {
        id: "agile-q7",
        skill: "Delivery & Agile",
        question: "What is the primary objective of the Sprint Retrospective ceremony?",
        options: [
          "To demonstrate the finished software to external clients.",
          "To inspect how the last sprint went with regards to people, relationships, process, and tools, and identify actionable improvements.",
          "To assign performance grades to individual team members.",
          "To write code for the next sprint."
        ],
        correctAnswer: 1,
        explanation: "The Retrospective focuses exclusively on continuous process and team improvement for subsequent iterations."
      },
      {
        id: "agile-q8",
        skill: "Delivery & Agile",
        question: "What is a 'Burndown Chart' used for during an active sprint?",
        options: [
          "To track how much budget was spent on cloud computing.",
          "To visualize the remaining work over the sprint duration against the ideal completion trajectory.",
          "To record employee vacation days.",
          "To monitor server processor temperature."
        ],
        correctAnswer: 1,
        explanation: "Burndown charts track remaining work daily, helping teams spot early warning signs of overcommitment or bottlenecks."
      },
      {
        id: "agile-q9",
        skill: "Delivery & Agile",
        question: "In Kanban systems, what is the purpose of 'Work in Progress' (WIP) limits?",
        options: [
          "To prevent employees from talking during office hours.",
          "To stop starting and start finishing—reducing multitasking, identifying bottlenecks, and optimizing cycle time.",
          "To limit total corporate revenue.",
          "To enforce overtime work."
        ],
        correctAnswer: 1,
        explanation: "WIP limits prevent teams from overloading workflows, accelerating overall throughput and exposing delivery bottlenecks."
      },
      {
        id: "agile-q10",
        skill: "Delivery & Agile",
        question: "What is 'Backlog Refinement' (Grooming)?",
        options: [
          "An ongoing collaborative session where the Product Owner and developers review, split, estimate, and clarify upcoming user stories.",
          "Deleting old Jira tickets without reading them.",
          "A formal party held at the end of the year.",
          "A meeting strictly for senior executives."
        ],
        correctAnswer: 0,
        explanation: "Refinement ensures upcoming sprint items are detailed, estimated, and ready for development before sprint planning begins."
      }
    ]
  },
  "ai-prompt-engineering": {
    courseId: "ai-prompt-engineering",
    courseTitle: "Generative AI & Prompt Engineering for Work",
    skill: "AI & Innovation",
    requiredScore: 80,
    timeMinutes: 15,
    description: "Evaluates Large Language Model mechanics, prompt design patterns, few-shot prompting, hallucination reduction, and workplace AI safety.",
    questions: [
      {
        id: "ai-q1",
        skill: "AI & Innovation",
        question: "What is a 'hallucination' in the context of Large Language Models (LLMs)?",
        options: [
          "A graphic display glitch on the computer monitor.",
          "When an LLM generates factually incorrect or fabricated information with high grammatical fluency and confidence.",
          "When an AI model runs out of computer memory.",
          "A security encryption key expiration."
        ],
        correctAnswer: 1,
        explanation: "LLMs predict the most statistically probable next tokens; without grounded context, they can fluently invent facts that sound convincing."
      },
      {
        id: "ai-q2",
        skill: "AI & Innovation",
        question: "What is 'Few-Shot Prompting'?",
        options: [
          "Prompting the model only 3 times a day to save battery.",
          "Providing a few high-quality input-output examples in the prompt to demonstrate the desired format, style, or reasoning pattern.",
          "Typing prompts with as few words as possible.",
          "Asking the AI to generate code in Python."
        ],
        correctAnswer: 1,
        explanation: "Few-shot prompting provides demonstrations inside the context window, guiding the model toward specific formats or classification schemas."
      },
      {
        id: "ai-q3",
        skill: "AI & Innovation",
        question: "What does 'Chain-of-Thought' (CoT) prompting encourage an AI model to do?",
        options: [
          "Connect to blockchain networks.",
          "Break complex reasoning down into step-by-step intermediate thoughts before stating the final answer.",
          "Search the web simultaneously on 10 tabs.",
          "Translate the query into 5 foreign languages."
        ],
        correctAnswer: 1,
        explanation: "Instructing models to 'think step by step' generates intermediate reasoning tokens, vastly improving accuracy in math and multi-step logic."
      },
      {
        id: "ai-q4",
        skill: "AI & Innovation",
        question: "What does the 'temperature' parameter control in LLM response generation?",
        options: [
          "The physical heat of the data center processor.",
          "The degree of randomness and creativity in token selection (lower = more deterministic/focused; higher = more creative/variable).",
          "The download speed of the model response.",
          "The font size of the text output."
        ],
        correctAnswer: 1,
        explanation: "Temperature scales the logits before softmax; low temperature (e.g. 0.0) yields repeatable factual outputs, while high temperature adds variation."
      },
      {
        id: "ai-q5",
        skill: "AI & Innovation",
        question: "What is a 'System Prompt' (or System Instruction)?",
        options: [
          "A notification generated by the computer operating system.",
          "A foundational directive that sets the AI's persona, operational rules, constraints, and behavioral boundaries across the conversation.",
          "A command that shuts down the server.",
          "A password prompt."
        ],
        correctAnswer: 1,
        explanation: "System prompts define persistent framing, tone, ethical guidelines, and operational guardrails for the agent."
      },
      {
        id: "ai-q6",
        skill: "AI & Innovation",
        question: "What is 'Retrieval-Augmented Generation' (RAG) primarily used for?",
        options: [
          "To make AI image generation faster.",
          "To fetch relevant external, verifiable documents or proprietary data dynamically and feed them into the model's context window to prevent hallucination.",
          "To delete old conversation transcripts.",
          "To translate audio recordings into MP3s."
        ],
        correctAnswer: 1,
        explanation: "RAG grounds LLM outputs in verified corporate knowledge bases and proprietary documentation, avoiding generic or out-of-date responses."
      },
      {
        id: "ai-q7",
        skill: "AI & Innovation",
        question: "What is the primary risk of pasting confidential corporate financial spreadsheets into unapproved public AI chatbots?",
        options: [
          "The file takes up too much hard drive space.",
          "Data privacy breach and potential leakage into future model training sets or third-party log audits.",
          "The spreadsheet formulas become corrupted.",
          "The browser window closes."
        ],
        correctAnswer: 1,
        explanation: "Public AI consumer tools may retain user data for model re-training, exposing proprietary corporate IP and violating compliance standards."
      },
      {
        id: "ai-q8",
        skill: "AI & Innovation",
        question: "In prompt engineering, what is the best technique to ensure an LLM produces output consumable by automated software?",
        options: [
          "Ask it to write in Shakespearean prose.",
          "Explicitly instruct the model to return valid, strict JSON matching a specified schema with no surrounding commentary.",
          "Type in all capital letters.",
          "Ask the question 3 times in a row."
        ],
        correctAnswer: 1,
        explanation: "Defining explicit JSON schemas or using structured outputs ensures predictable, parseable data structures for downstream code."
      },
      {
        id: "ai-q9",
        skill: "AI & Innovation",
        question: "What does the 'context window' of a Large Language Model represent?",
        options: [
          "The size of the browser window in pixels.",
          "The maximum number of tokens (words/characters) the model can process and remember simultaneously in a single prompt and conversation history.",
          "The number of users logged into the app.",
          "The amount of battery remaining on the laptop."
        ],
        correctAnswer: 1,
        explanation: "The context window limits the total input and output tokens available in a single inference pass."
      },
      {
        id: "ai-q10",
        skill: "AI & Innovation",
        question: "Why should professionals always human-review critical AI-generated contracts, medical summaries, or technical reports?",
        options: [
          "Because computers dislike writing long documents.",
          "Because LLMs lack genuine real-world accountability, nuance verification, and can produce subtle but dangerous inaccuracies.",
          "Because AI generated text always has spelling mistakes.",
          "Human review is actually unnecessary."
        ],
        correctAnswer: 1,
        explanation: "The 'human-in-the-loop' paradigm ensures legal, ethical, and factual integrity before decisions or deliverables are finalized."
      }
    ]
  }
};

export const DEFAULT_ASSESSMENT_KEY = "leadership-essentials";

const ASSESSMENT_RESULTS_KEY = "capacity_assessment_results_v2";

export function loadAssessmentResults() {
  try {
    const raw = localStorage.getItem(ASSESSMENT_RESULTS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return {};
}

export function saveAssessmentResult(courseId, result) {
  try {
    const current = loadAssessmentResults();
    current[courseId] = {
      ...result,
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      timestamp: Date.now(),
    };
    localStorage.setItem(ASSESSMENT_RESULTS_KEY, JSON.stringify(current));
  } catch (e) {
    console.error(e);
  }
}
