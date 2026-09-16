# Capacity Connect

SIH 2026 prototype for assessment-led competency analysis and targeted learning.

## Run locally

1. Create `server/.env` from `.env.example` and provide a MongoDB connection string and JWT secret.
2. Install packages with `npm install` in the project root and `npm install` in `server`.
3. Populate demonstrable courses and the benchmark assessment with `npm run seed --prefix server`.
4. Start the API with `npm run dev --prefix server` and the client with `npm run dev`.

The seeded trainer is `trainer@capacityconnect.demo` with password `Demo@123`.

The application uses score-based competency rules: only skills below the required score are returned as gaps and used to recommend courses.
