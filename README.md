This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Test files will be added. Any contribution will be appreciated.

## Getting Started

This template has been created according to the official/supported documentation. You may find basic NEXT.js usage below.
Other than that, you should run

```bash
npm install
# or
yarn install
```

when you clone the repository.

After installing dependencies, you should create a ".env.local" file in the root folder of the project and provide your MongoDB URI and DB Name to that file. Your ".env.local" file should look like this:

```bash
MONGODB_URI=mongodb+srv://<USERNAME>:<PASSWORD>@cluster0.tdm0q.mongodb.net/<DBNAME>?retryWrites=true&w=majority
MONGODB_DB=<DBNAME>
```

! You do not need to install any other packages to reach ".env" files as Next.js supports them by default. !

After saving your .env file, you should be able to follow the steps below to run Next.js app normally. If you have done everything correctly, you should see a message that shows you have connected to MongoDB.

## Legend:

./components ==> React Components
./configs ==> MongoDB Connection
./pages ==> Next.js api routes & Next.js routes
./redux ==> Redux store
./redux/features ==> Reducers (Slices)

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
