# WebSockets Server/Client Application

Admin setup:

```bash
touch README.md
npm init -y
git init
touch .gitignore # and add node_modules, dist, .env

# init typescript project
tsc --init
```

Install starter dependencies:

```bash
npm i ts-node ts-node-dev tsconfig-paths typescript express ws
```

Install some types:

```bash
npm i -D @types/node @types/express @types/ws
```

Add this to TypeScript `tsconfig.json` file (for now we will set the target to `es6` but this may need to be changed depending on whether it causes unexpected errors with the server):

```json
{
  "ts-node": {
    "files": true
  },
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "strict": true,
    "rootDir": "src",
    "outDir": "dist",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitReturns": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": false,
    "resolveJsonModule": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "baseUrl": "./",
    "paths": {
      "@src/*": ["src/*"],
      "@middleware/*": ["src/middleware/*"],
      "@services/*": ["src/services/*"],
      "@routes/*": ["src/routes/*"],
      "@controllers/*": ["src/controllers/*"],
      "@exchanges/*": ["src/api/exchanges/*"],
      "@utils/*": ["src/utils/*"],
      "@api/*": ["src/api/*"],
      "@lib/*": ["src/lib/*"],
      "@app": ["src/app/index.ts"],
      "@singleton/*": ["src/singleton/*"],
      "@constants/*": ["src/constants/*"]
    }
  },
  "exclude": ["junk"]
}
```

Add the following to the `package.json` scripts:

```json
    "dev": "NODE_ENV=development npm run start:dev",
    "start:dev": "ts-node-dev -r tsconfig-paths/register ./src/index.ts",
    "build": "./node_modules/.bin/tsc",
    "debug": "ts-node -r tsconfig-paths/register"
```
