# Capacity Connect 🎓

> **Enterprise Workforce Competency Diagnostics & Targeted Capability Upskilling Ecosystem**  
> *Smart India Hackathon (SIH 2026)*

Capacity Connect is an enterprise-grade capability acceleration platform designed to bridge organizational skill deficits through diagnostic evaluations, automated gap analytics, modular video-based learning pathways, and verifiable credential governance.

---

## 🌟 Ecosystem Architecture & Multi-Role Workspaces

Capacity Connect provides three purpose-built, seamlessly synchronized workspaces tailored for every stakeholder in the learning lifecycle:

```
                  ┌─────────────────────────────────────────────────┐
                  │          CAPACITY CONNECT CORE ENGINE           │
                  │   (Shared Workforce, Curriculums, Diagnostics)  │
                  └───────┬─────────────────┬─────────────────┬─────┘
                          │                 │                 │
            ┌─────────────┴─────┐   ┌───────┴───────────┐   ┌─┴─────────────────┐
            │ Trainee Workspace │   │ Trainer Workspace │   │  Admin Command    │
            │  (Upskilling &    │   │  (Facilitator &   │   │  (Enterprise      │
            │   Certificates)   │   │   Course Studio)  │   │   Governance)     │
            └───────────────────┘   └───────────────────┘   └───────────────────┘
```

---

### 1. 👨‍🎓 Trainee Workspace (Learner Journey)
- **Standardized Diagnostic Assessments**: Comprehensive multi-category assessments (Leadership, Cross-functional Communication, Data Analytics, Operational Safety) with real-time scoring and explanatory rationale.
- **Interactive Gap Analysis**: Visual comparison of current capability baselines against organizational target benchmarks, highlighting priority deficits and recommended learning tracks.
- **Modular Learning Player**: Video lessons embedded with full-screen playback, lesson summaries, key takeaways, and downloadable toolkits (e.g. SBI Feedback frameworks, DACI templates).
- **Verifiable Credentials & Certificates**: Cryptographically-styled completion certificates with issue timestamps, facilitator signatures, credential verification IDs, and one-click printable dossiers.
- **Progress Tracking & Skill Profile**: Longitudinal competency gain tracking, active course milestones, and customizable associate profiles.

---

### 2. 👩‍🏫 Trainer / Facilitator Workspace
- **Course Authoring Studio**: Create structured, multi-module curriculums with title, category, target competency levels, duration, and embedded video stream links.
- **Media & Stream Verification Studio**: Dedicated inspector for instructors to review video streams, check aspect ratio, verify resolution (1080p FHD), and test playback before publishing.
- **Trainee Performance Telemetry**: Real-time roster tracking employee progress, completion percentages, quiz scores, and personalized instructional feedback pings.
- **Virtual Live Sessions & Workshops**: Schedule cohort webinars and coaching sessions with direct meeting links (Zoom / Google Meet / Microsoft Teams), track RSVPs, and distribute session replay recordings.
- **Instructor Portfolio & Reviews**: Manage domain competencies, certifications, office hours, and review trainee ratings.

---

### 3. 🏢 Enterprise Admin Command Center
- **Workforce Capability Diagnostics**: Executive telemetry monitoring organizational competency across departments (Engineering, Operations, Manufacturing, Customer Success, Finance & Risk).
- **Dynamic Benchmark Threshold Switcher**: Calibrate enterprise target benchmarks (75%, 80%, 85%, 90%) with instant, real-time recalculation of deficits across all trainee workspaces.
- **Training Needs & Cohort Allocation**: Detect high-severity skill gaps, allocate budgets (in INR ₹), assign certified instructors, and authorize cohort launch dates.
- **Curriculum Governance**: Publish, archive, and inspect courses across the entire platform. Includes the **Professional Course Media & Video Quality Review Studio** for inspecting video assets, checking captions, and exporting video manifests.
- **Faculty Management**: Certified instructor faculty directory, domain filters, instructor portfolio inspection, and faculty synchronization pings.
- **Executive Audit Reports**: Granular drill-down audit reports covering competency gain, completion velocity, assessment pass rates, and compliance coverage with CSV data exports.

---

## ⚡ Real-Time Cross-Workspace Synchronization

Capacity Connect features a unified data persistence and event synchronization layer:
- **Shared Workforce Store (`workforce.js`)**: Changes made by Admins in the employee directory instantly reflect in Trainer rosters and cohort rosters.
- **Synchronized Curriculum Catalog (`courses.js`)**: Courses added or modified by Trainers immediately update across the Admin catalog and Trainee course catalog. Toggling a course to *Archived* or *Draft* instantly filters it from learners.
- **Shared Faculty Directory (`trainers.js`)**: Instructors assigned in Admin training needs or course creation sync across all workspaces.
- **Unified Live Sessions (`liveSessions.js`)**: Upcoming webinars scheduled by Trainers are visible in real-time to participants and Admins.
- **Benchmark Propagation**: Adjusting organization benchmark targets in Admin dynamically updates Trainee gap calculations and course recommendations.

---

## 🎨 Design & Aesthetic Philosophy

- **Editorial Swiss & Warm Brutalist Aesthetic**: Warm cream background (`#f6f4ed`), rich charcoal typography (`#22251f`), forest green accents (`#4f6b56`), and terra-cotta highlights (`#d98045`).
- **Typography**: Paired pairing of `DM Sans` (for clean, legible interface text) and `DM Mono` (for data metrics, percentages, badges, and code tags).
- **100% Fully Responsive**: Optimized for ultra-wide enterprise monitors, standard laptops, tablets, and mobile screens with adaptive sidebar drawer navigation and full-bleed data tables.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, Vite, Lucide React Icons |
| **Styling** | Modern Vanilla CSS, CSS Grid & Flexbox, CSS Custom Properties |
| **State & Sync** | Synchronized Browser Storage Engine & Reactive Custom Hooks |
| **Backend API** | Node.js, Express.js |
| **Database** | MongoDB & Mongoose ODM |
| **Authentication** | JWT (JSON Web Tokens) with Role-Based Access Control (Admin, Trainer, Trainee) |

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm
- MongoDB instance (local or MongoDB Atlas URI)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/uff-vexora/CAPACITY-CONNECT.git
   cd CAPACITY-CONNECT
   ```

2. **Install frontend dependencies**:
   ```bash
   npm install
   ```

3. **Install server dependencies**:
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Configure Environment Variables**:
   Create `server/.env` with:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/capacity_connect
   JWT_SECRET=your_super_secret_jwt_key
   CLIENT_URL=http://localhost:5173
   SEED_TRAINER_PASSWORD=your_trainer_password
   ```

5. **Seed Demonstrable Data (Optional)**:
   ```bash
   npm run seed --prefix server
   ```

6. **Start Development Servers**:
   - Start backend server:
     ```bash
     npm run dev --prefix server
     ```
   - Start frontend application:
     ```bash
     npm run dev
     ```
   The client will launch at `http://localhost:5173/`.

---

## 🌐 Production Deployment

- **Frontend (Vercel)**:
  - Root directory: `./`
  - Build command: `npm run build`
  - Output directory: `dist`
  - Set `VITE_API_URL` to your production backend endpoint.

- **Backend (Render / Railway)**:
  - Root directory: `./server`
  - Build command: `npm install`
  - Start command: `npm start`
  - Set environment variables: `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`.

---

## 📄 License & Attribution

Developed for **Smart India Hackathon (SIH 2026)**. Built by Team Vexora with a passion for human capability development and organizational excellence.
