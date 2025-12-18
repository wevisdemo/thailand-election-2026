# Thailand Election 2026

Monorepos of WeVis's Thailand National Election 2026

https://election69.wevis.info

## Directory Structure

- `/apps` Frontend web application for each sub projects
  - `/ballotready` Ballot ready
  - `/landing` Landing page
  - `/partymatch` Party match or red flag alert?
  - `/politicalflashback` A Political Flashback
- `/packages` Shared packages in the project
  - `/tailwind` Tailwind theme and utilities configuration
  - `/ui` Cross framework UI components library

## Getting Started

Requirements:

- [Node.js](https://nodejs.org/en/download) v22+
- [pnpm](https://pnpm.io/installation) v10+ (We've moved away from npm which has [a big security risk](https://betterstack.com/community/guides/scaling-nodejs/npm-supply-chain-attack/))

1. Install project dependencies

```sh
pnpm i
```

2. Start specific app on development mode

Since app depended on some package built step, running command in app directory alone might not works. Instead, run specific app command on the root directory.

```sh
pnpm run dev:[app-name]
# For example, start landing app in dev mode
pnpm run dev:landing
```

We use [turborepo](https://turborepo.com/) to manage build dependencies, to make sure that app has dependencies built before starting dev server.

## Working With the Code

- We do Trunk-based development: everyone work on the same main branch on git.
- Pull code often, at least once before you start working, and once before you push the code.
- Also push code often, at least once before you finish the day.
- Make a small commit of working code. Don't push broken code to the remote. It will break the deployment pipeline.
- Use [Conventional Commit](https://www.conventionalcommits.org/) standard for a commit message. Include your package name to the scope e.g. `feat(partymatch): add result page`
- We have pre-commit hooks. Your staged code will be formatted with prettier and commit message will be validated when committing code.
- Every time main branch is updated, the project will be built and deployed to production with [Github Actions](https://github.com/wevisdemo/thailand-election-2026/actions).
