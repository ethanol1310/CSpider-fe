# React + Vite Project

This project is a React application built with Vite. It includes a minimal setup to get React working with Vite, Hot Module Replacement (HMR), and some ESLint rules.

## Prerequisites

- Node.js (version 20 or later)
- npm (version 6 or later)
- Docker (optional, for containerization)

## Getting Started

1. **Install dependencies**:
    ```sh
    npm install
    ```

2. **Run the development server**:
    ```sh
    npm run dev
    ```

3. **Build for production**:
    ```sh
    npm run build
    ```

4. **Run the production build**:
    ```sh
    npm run serve
    ```

## Docker

To build and run the application using Docker:

1. **Build the Docker image**:
    ```sh
    docker build -t <image_name> .
    ```

2. **Run the Docker container**:
    ```sh
    docker run -p 80:80 <image_name>
    ```

## Environment Variables

Create a `.env.production` file in the root of the project to configure environment variables:

```
VITE_API_URL=abc.xyz
```

## Project Structure

```
├── src
│   ├── components
│   │   ├── ArticleList.jsx
│   │   ├── DateRangePicker.jsx
│   ├── services
│   │   └── api.js
│   ├── App.jsx
│   ├── main.jsx
├── public
│   └── index.html
├── Dockerfile
├── package.json
├── vite.config.js
├── README.md
```

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run serve`: Serves the production build.
- `npm run lint`: Runs ESLint to check for linting errors.
