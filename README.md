# Development
Paso para levantar la app en desarrollo

1. Levantar la DB
```
docker compose up -d
```

2. Renombrar el .env.template a .env

3. Reemplazar las variables de entorno

4. Ejecutar el comando ```npm install```

5. Ejecutar el comando ```npm run dev```

6. Ejecutar los comandos de prisma
```
npx prisma migrate dev
npx prisma generate
```

7. Ejecutar el SEED para crear la base de datos local: localhost:3000/api/seed

# Prisma commands

```
npx prisma init
npx prisma migrate dev
npx prisma generate
```
