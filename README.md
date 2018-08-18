# GraphQL with MongoDB

## Before you start

The app uses environment variable for the database uri address for connection, so before
you start export the variable DB_URI with the connection address for you MongoDB database. Example:
```
export DB_URI="mongodb+srv://<username>:<password>@testcluster-ctovx.gcp.mongodb.net/test?retryWrites=true"
```

## Install packages

```
yarn
```

## Start server

```
yarn start
```

Your server will run on port 4000.
