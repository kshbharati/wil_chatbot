Buy With Us Chatbot

PRODUCTION Website URL: [https://www.helisrory.com]

PRODUCTION API URL: [https://www.helisrory.com/api]

## DO NOT ```PUSH``` INTO ```main``` branch. CREATE A ```BRANCH``` AND CREATE A ```PULL REQUEST``` FOR ```PRODUCTION``` READY FEATURES.
### Any ```push``` into ```main``` trigger ```Vercel``` rebuilding ```production``` code and will not ```build``` properly if ```tests``` fail.

## Getting Started

First create ```.env``` file on ```Root Folder```
```bash
DATABASE_URL="mysql://user:password@host/database"
```

Install Node Modules:
```bash
yarn 
# or
npm install
```
Generate Prisma ORM Client:
```bash
yarn prisma generate
```
Run the development server:

```bash
npm run dev
# or
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Testing
Use folder ```__test__``` for all test.

Any file with ```filename.test.ts``` are Jest Files.

Any file with ```filename.spec.ts``` are Playwright (End to End) files.

Integration of Vercel and Checkly helped vastly with End To End Testing and is automated on each production build.

## Database and Acess

Prisma Schema file is used to model the Database.
Path to file: ```prisma/prisma.schema ```

Single instance of PrismaClient is created and provided with ```PrismaContext``` object.
Usage:
```
import {PrismaContext} from "prisma/prismaContext.ts";

let users = PrismaContext.users.findMany();
```

### Accessing Prisma Studio
Edit Database data using Prisma Studio

- Open Another Terminal


Run
```bash
yarn prisma studio
```


- Access prisma studio on given port number usually 5555. [http://localhost:5555](http://localhost:5555)


## Config Files

Next: ```next.config.js```

TypeScipt: ```tsconfig.json #Do not edit.```

Jest: ```jest.config.ts```

Playwright: ```playwight.config.ts```

PostCss: ```postcss.config.js```

Tailwind: ```tailwind.configjs```



## Helpful Links
To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
