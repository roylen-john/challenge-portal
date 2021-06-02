# Hack Ideas

A web application which lets employees of an organisation to add/manage challenges for internal hackathons which they organise every month.

Features

- Written in [Typescript](https://www.typescriptlang.org/) with [Next JS](https://nextjs.org/)
- Linting with [ESLint](https://eslint.org/)
- Formatting with [Prettier](https://prettier.io/)
- Linting, typechecking and formatting on by default using [`husky`](https://github.com/typicode/husky) for commit hooks
- Testing with [Jest](https://jestjs.io/) and [react-testing-library](https://testing-library.com/docs/react-testing-library/intro)
- Styled using [Tailwind Css](https://tailwindcss.com/)
- Mock server using [json-server](https://github.com/typicode/json-server)
- JWT based authentication
- Fully accessible ui navigatable using the keyboard
- Client side cache-first data fetching using [swr](https://swr.vercel.app/)

## Run locally

1. Install dependencies using

   ```shell
   npm install
   ```

2. Create a `.env.local` file in the root directory with the following content:

   ```env
   HOSTNAME=localhost
   PORT=8000
   HOST=http://$HOSTNAME:$PORT
   CHALLENGE_PAGE_LIMIT=12
   ```

3. Run the client application by running:

   ```shell
   npm run dev
   ```

4. Open a second terminal and navigate to `mock-server` folder

   ```shell
   cd .\mock-server
   ```

5. Install mock-server dependencies using

   ```shell
   npm install
   ```

6. Start the mock server by running:

   ```shell
   npm start
   ```

7. The application should be accessible at <http://localhost:3000/>
