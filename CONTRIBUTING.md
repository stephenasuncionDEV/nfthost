# Contributing

To get up and running, install the dependencies using npm.

```
yarn install
```

In the root folder, create a new env file called `.env.local` with environment variables from `.env.local.example`.

## Running the App

To run the app:

```
npm run dev
```

or with no cache

```
npm run dev:no-cache
```

## Analyzing Bundle

To analyze bundle size:

```
npm run build:analyze
```

## Linting

List of lint commands:

```
npm run lint - default next.js linter
npm run lint:types - Checks type of the whole codebase
npm run lint:format - Checks format of the whole codebase
npm run lint:staged - Runs all 3 commands
```

## Pull Requests

When submitting a pull request, make sure that your branch name is `YOUR_GITHUB_USERNAME/TITLE_OF_PR`

Example: `stephenasuncionDEV/github-update`