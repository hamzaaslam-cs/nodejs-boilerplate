
# nodejs-boilerplate

It is pre-configured nodejs project  with jest testing to develop quickly clone and start wokring on business logic of the project.



## Authors

- [@hamzaaslam](https://github.com/hamzaaslam-cs)


## Installation

Install dependencies with npm

```bash
  npm install 
```
Create .env file in the root of project

Craete test.env file to create seperate environment for testing

Project is by default configured with Database MySql
and Mail Driver Mailtrap
change configrations according to your need in either env or in /config directory

```bash

NODE_ENV="local"

DATABASE_NAME="db_name"
DATABASE_USERNAME="db_username"
DATABASE_PASSWORD="db_password"
DATABASE_DRIVER="mysql"


JWT_EXPIRE_IN="1d"

MAIL_USER= "Your mail username"

MAIL_PASS= "Your mail password"

```

To host server:

```bash
  npm run dev 
```

To run tests:

```bash
  npm run test 
```

## API Reference

#### Login

```http
  POST /api/auth/login
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**.|
| `password` | `string` | **Required**.|

#### Registration

```http
  POST /api/auth/register
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**.|
| `password` | `string` | **Required**.|
| `name` | `string` | **Required**.|

#### Forget Password

```http
  GET /api/auth/forget/{email}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `email` | `string` | **Required**.|

#### Reset Password

```http
  POST /api/auth/reset/password
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `password` | `string` | **Required**.|
| `token` | `string` | **Required**.|

#### Refresh Token

```http
  POST /api/auth/refresh-token/{refresh_token}
```

Pass Header with key Authorization and value {access_token}

