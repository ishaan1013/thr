# Threads

An open-source clone of Threads using Next.js server components, Vercel Postgres, shadcn UI, Clerk, and Prisma.


https://github.com/ishaan1013/thr/assets/69771365/f1ca7104-0fa0-4825-ab83-06deeec5cc3f


[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fishaan1013%2Fthr&env=CLERK_SECRET_KEY,NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,NEXT_PUBLIC_CLERK_SIGN_IN_URL,NEXT_PUBLIC_CLERK_SIGN_UP_URL&envDescription=Clerk%20is%20recommended%20to%20work%20with%20this%20project.%20Vercel%20Postgres%20is%20optional%2C%20and%20is%20what%20was%20used%20in%20the%20original%20project.&project-name=clone&repository-name=clone&demo-title=Clone&demo-description=A%20Next.js%20clone%20of%20Meta%27s%20new%20app&demo-url=https%3A%2F%2Ft.ishaand.co%2F&demo-image=https%3A%2F%2Fgithub.com%2Fishaan1013%2Fthr%2Fblob%2Fmaster%2Fassets%2Fthreads-screenshot.png%3Fraw%3Dtrue)

## Running Locally

### Cloning the repository the local machine.

```bash
git clone https://github.com/ishaan1013/thr
```

### Create a Postgres database on Vercel (optional, can use other provider)

- Add the environment variables in .env
- (This project uses Prisma as an ORM for the database)

### Create a project on Clerk

- Add the environment variables in .env
- Ensure you have the following variables:
```
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/onboarding"
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
```

### Installing the dependencies.

```bash
npm install
```

### Running the application.

Then, run the application in the command line and it will be available at `http://localhost:3000`.

```bash
npm run dev
```
