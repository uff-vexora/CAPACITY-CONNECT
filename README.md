# Capacity Connect

SIH 2026 prototype for assessment-led competency analysis and targeted learning.

## Run locally

1. Create `server/.env` from `server/.env.example` and provide a MongoDB connection string and JWT secret.
2. Install packages with `npm install` in the project root and `npm install` in `server`.
3. Set `SEED_TRAINER_PASSWORD` in `server/.env`, then populate demonstrable courses and the benchmark assessment with `npm run seed --prefix server`.
4. Start the API with `npm run dev --prefix server` and the client with `npm run dev`.

The application uses score-based competency rules: only skills below the required score are returned as gaps and used to recommend courses.

## Deployment

Deploy the frontend to Vercel. It uses `https://capacity-connect-1-qmzj.onrender.com/api` by default; alternatively set `VITE_API_URL` to that same URL in Vercel.

Deploy the `server` directory as a Render Node service with build command `npm install` and start command `npm start`. Configure `MONGO_URI`, `JWT_SECRET`, and `CLIENT_URL` in Render. Set `CLIENT_URL` to the production Vercel URL (without a trailing slash). `PORT` is supplied by Render; the server falls back to `5000` for local development.
