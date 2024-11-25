# Dash - Modern Payment Solution

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Database Setup](#database-setup)
  - [Running the Application](#running-the-application)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Dash is a modern payment solution built as a monorepo using Turborepo. It consists of three main applications: Customer, Merchant, and Bank Webhook, along with shared packages for database operations and UI components.

This application aims to provide a seamless payment experience for both customers and merchants, with integrated bank webhook functionality for real-time transaction processing.

## Features

- Customer application for end-users to manage their accounts and make payments
- Merchant application for businesses to accept payments and manage their accounts
- Bank webhook service for processing real-time banking events
- Shared UI components for consistent design across applications
- Prisma ORM for database operations
- Authentication using NextAuth.js
- Responsive design with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15.0.3
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Recoil
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Monorepo Tool**: Turborepo
- **Package Manager**: npm
- **Build Tool**: esbuild (for bank-webhook)
- **Server**: Express.js (for bank-webhook)

## Project Structure

The project is structured as a Turborepo monorepo with the following main directories:

- `apps/`
  - `customer/`: Next.js application for customer-facing features
  - `merchant/`: Next.js application for merchant-facing features
  - `bank-webhook/`: Express.js application for handling bank webhooks
- `packages/`
  - `db/`: Prisma schema and database client
  - `ui/`: Shared React components
  - `store/`: (Assumed) Shared state management
  - `eslint-config/`: Shared ESLint configuration
  - `typescript-config/`: Shared TypeScript configuration

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm (version 10.8.3 or higher)
- PostgreSQL database

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/FahimJadid/dash.git
   cd dash
   ```

2. Install dependencies
   ```sh
   npm install
   ```
3. Environment Variables
   Copy over all .env.example files to .env

   ```sh
   DATABASE_URL=postgresql://user:password@localhost:5432/dash
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_secret
   ```

4. Database Setup
    - Update .env files everywhere with the right db url
    - Run postgres either locally or on the cloud (neon.tech or Aiven)
    - Go to packages/db
    - Run the following commands
    ```sh
    npx prisma migrate dev
    npx prisma db seed
    ```
## Development
To start developing, run the following command to start the development server:
    
    ```sh
    npm run dev
    ```

## Test Login
Try logging in using 
- Select +880 or default
- phone - 9999999999 
- password - moon (See seed.ts)    