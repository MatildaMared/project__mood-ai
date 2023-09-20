# PlanetScale

To authenticate to planetscale, run the following command:

```bash
pscale auth login
```

To create a new branch in the planetscale database, run the following command:

```bash
pscale branch create <database name> <branch_name>
```

To connect to the planetscale database, run the following command:

```bash
pscale connect <database name> <branch_name> --port <port number>
```

---

# Prisma

To init prisma, run the following command:

```bash
npx prisma init
```

To push your schema to the database, run the following command:

```bash
npx prisma db push
```

To format your schema, run the following command:

```bash
npx prisma format
```

To open prisma GUI, run the following command:

```bash
npx prisma studio
```