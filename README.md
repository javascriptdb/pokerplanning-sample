## A super simple, realtime poker planning app

Try it at https://planningpoker.day (it is free!)

It uses sveltekit for the frontend and https://javascriptdb.com for the **super simple realtime database**, it created this to demo jsdb realtime apis.

## Or self-host it
Clone this repo
```shell
npm i
```

Install mongodb
https://www.mongodb.com/docs/manual/installation/

Create .env file
```dotenv
# Used to sign jwt tokens
JWT_SECRET="SUPER_SECRET_KEY"

# Mongodb connection string
MONGODB_URI="..."
```
Run your server
```shell
node .
```
Run sveltekit
```shell
npm run dev
```



