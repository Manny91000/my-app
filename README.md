# RentCar — Plataforma para dealers

Proyecto Next.js (App Router + TypeScript) para gestión de flotas y reservas, pensado para vender a concesionarios (dealers).

Este repositorio contiene la aplicación principal y utilidades. Este README es un punto de partida para convertir el proyecto en un producto listo para clientes.

## Qué incluye
- Next.js 15 (App Router)
- TypeScript, TailwindCSS
- Prisma (Postgres) para DB
- NextAuth para autenticación
- Plantillas de UI y dashboard

## Instalación (desarrollo)

1. Clona el repositorio

2. Copia variables de entorno

```powershell
cp .env.example .env
```

3. Instala dependencias

```powershell
npm install
```

4. Ejecuta migraciones (Prisma)

```powershell
npm run prisma:migrate:dev
```

5. Levanta en modo desarrollo

```powershell
npm run dev
```

## Variables de entorno
Rellena `.env` a partir de `.env.example`. Las variables necesarias incluyen conexión a la base de datos, secretos de NextAuth, y configuración SMTP/Stripe.

## Scripts útiles
- `npm run dev` — desarrollo
- `npm run build` — build de producción
- `npm run start` — correr build
- `npm run lint` — ejecutar eslint
- `npm run prisma:generate` — generar cliente Prisma
- `npm run prisma:migrate:dev` — migraciones locales

## Recomendaciones para profesionalizar
1. Añadir `ENV.example` (implementado). Gestionar secretos en el hosting.
2. Añadir Dockerfile + compose para despliegue reproducible.
3. Añadir CI (GitHub Actions) que corra lint/build y despliegue a preview.
4. Implementar onboarding para dealers, roles y multi-tenant en la DB.
5. Añadir seed script para demo data y un procedimiento de entrega a clientes.

## Siguientes pasos que puedo implementar ahora
- Crear `Dockerfile` y `docker-compose.yml`.
- Añadir GitHub Action para CI.
- Añadir seed script Prisma y demo data.

Si quieres, empiezo por cualquiera de estos pasos — dime cuál prefieres.

---
_Generado: 2025_
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
