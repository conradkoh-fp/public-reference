# Getting Started
## Creating a new project
1. Run the command `npx create-next-app`
2. Enter the name of your project
3. Run the command `npm run dev` to start the server

## Creating your first page
1. Create a new file called `test.tsx` in the folder `pages`
2. Set a React component as the default export of the component
``` jsx
export default () => {
    return <div>Hello World</div>
}
```
3. Visit the page `http://localhost:3000/test`

## Creating your first serverless function
1. Create a new file called `deals.ts` in the folder of `pages/api`
2. Export a express middleware as a function 

## Deploying your project with Vercel
1. Install the Vercel command line with `npm install -g now`
1. Create an account with Vercel
1. If you have just created your account, run the command `now login`
1. Once done, you can deploy your project with the command `now`
