# Thailand Election 2026

Monorepos of WeVis's Thailand National Election 2026

## Directory Structure

- `/apps` Frontend web application for each sub projects
  - `/landing` Landing page
  - `/partymatch` Party match or red flag alert?
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
