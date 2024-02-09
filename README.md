# Welcome to my personal project 

orignal source = https://images.nasa.gov
deployed site = https://nasa-image.onrender.com/

### please follow below steps to configure the project

1. Node version = v20.3.1 & React version = 18.2.0 
to make sure the project run in your local environment please install above versions of node and React
2. Git clone the project into your main folder by running the command
```
git clone https://github.com/Vipul-Wakodikar/Nasa-IMG-Clone.git
```
3. from main folder enter below command to concurrently install required dependency in client and server folder
```
npm run install
```
4. get a secret key by signing up from the link https://api.nasa.gov
5. create a .env file within server folder and add below key value pair
```
API_KEY =/*enter the key that you will get after signingup*/
```
6. please note that vite.config.js should look like below

```
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'
    import dotenv from 'dotenv';

    // Load and parse .env file
    dotenv.config({ path: './src/.env' });

    export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
        dotenv: 'dotenv', // Resolve dotenv package
        '@env': './.env',  // Resolve .env file
        },
    },
    });
```
7. run below command within the main folder to concurrently run both client and server

please make sure with in terminal you are in main / root folder and type below command to run the web app

```
npm run dev
```
