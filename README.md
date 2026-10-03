# Instamato

Instamato is a React/Vite frontend with an Express and MongoDB API.

## Run locally

Install dependencies from the repository root:

```sh
npm install
```

Create `back/.env` with `MONGO_URL`, `JWT_SECRET`, `IMAGEKIT_PUBLIC_KEY`,
`IMAGEKIT_PRIVATE_KEY`, and `IMAGEKIT_URL_ENDPOINT`. Start the API in one
terminal and the frontend in another:

```sh
npm run start:api
```

```sh
npm --prefix front/vite-project run dev
```

The Vite development server proxies `/api` requests to the local Express API.

## Deploy on Vercel

Import this repository as a single Vercel project using the repository root.
The root `vercel.json` builds the frontend and serves the Express API as
serverless functions. Add the five environment variables listed above in the
Vercel project settings before deploying. Keep their values private and do not
commit `back/.env`.
