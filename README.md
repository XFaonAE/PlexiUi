## PlexiUi
Welcome to PlexiUi framework! This framework was created to help make better desktop apps with ease with common languages such as TypeScript and HTML.

## Get Started
 - [Installation](#installation)
 - [Basic Usage](#basic-usage)
 - [Were to Next?](#were-to-next)

## Installation
Run the following command to install this library.
```bash
npm install github:AxeriDev/PlexiUi
```

To update the framework, just check the GitHub repository and then run the same command again, that's it!

## Basic Usage
Let's start by creating a basic application without any special configuration.
Create the following files and folders:
```
MyApplication:
├── render
│   ├── Main.vue
│   └── components
│       └── Test.vue
└── Main.js
```

If you prefer, you can always use TypeScript too.
For this basic tutorial, we will be using TypeScript.

```typescript
// Main.ts
const PlexiUi = require("@axeridev/plexi-ui").default;

const plexiUi = new PlexiUi({});
```

When compiled and executed, a blank window should open up with a little message.
If this is the case, then great job! You just created your first PlexiUi application!

## Were to Next?
Now let's dive deeper into the framework.

Here is a good list of resources used for learning PlexiUi:
 - [PlexiUi Docs](https://axeri.net/plexiui/docs)
 - More resources coming soon...
