# CSpider

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

1. Create a `.env.production` file in the root of the project to configure environment variables:

```
VITE_API_URL=abc.xyz
```

## Project Structure

```
├── App.css
├── App.jsx
├── components
│   ├── ArticleList.jsx
│   ├── DateRangePicker.jsx
│   ├── OptionSelector.jsx
│   └── StatsCard.jsx
├── index.css
├── main.jsx
├── services
│   └── api.js
└── styles
    ├── App.css
    └── StatsCard.css
```

## Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run serve`: Serves the production build.
- `npm run lint`: Runs ESLint to check for linting errors.
