# Contact Identifier

The project is an Express.js-based API application for managing contacts. It provides various functionalities for creating, updating, and retrieving contact information. The API supports operations such as identifying contacts, transitioning contact precedence, and creating new contacts.

The application follows a modular architecture, with separate service modules for handling contact-related operations. It utilizes Sequelize as the ORM (Object-Relational Mapping) library to interact with a PostgreSQL database.

The project includes middleware for logging incoming requests, including the request path, request body, and response time latency and also a separate logger which works on LOG_LEVEL (defined in the env). The logging middleware is implemented without any external dependencies and provides a compact, JSON-like format for each log entry.

The codebase incorporates decorators and comments to improve code readability and maintainability. Decorators are used to annotate functions with metadata, such as route handlers and middleware, allowing for easy configuration and extension of the application. Comments are added to provide explanations and details about the purpose and behavior of different functions and modules.

Overall, the project aims to provide a robust and scalable API for managing contacts, with a focus on code organization, modularity, and efficient logging of request and response information.

## Sample Curl Request when running locally using sample .env

```
curl --location --request POST 'localhost:3000/identify' \
--header 'Content-Type: application/json' \
--data-raw '{
    "phoneNumber":"+1234567890",
    "email":"abcferf@gtr.com"
}'
```

## Sample Curl Request for deployed version

```
curl --location --request POST '<pending>/identify' \
--header 'Content-Type: application/json' \
--data-raw '{
    "phoneNumber":"+1234567890",
    "email":"abcferf@gtr.com"
}'
```

## To start the program

```
npm start
```

## To start the program in development mode

```
npm run dev
```

## To insert sample data to DB

```
npm run seed
```

### Sample .env file

```
PORT=3000
PG_PORT=5432
PG_DATABASE=TestDB
PG_PASSWORD=VjQ8KnxsR1d3T3ZqLT0l
PG_USER=admin
PG_HOST=localhost
LOG_LEVEL=debug
```
