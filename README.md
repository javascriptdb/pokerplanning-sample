## A super simple, realtime poker planning app

Try it at https://planningpoker.day (it is free!)

It uses sveltekit for the frontend and https://javascriptdb.com for the **super simple realtime database**, it created this to demo jsdb realtime apis.

<img width="580" alt="Screen Shot 2022-04-25 at 12 25 13 PM" src="https://user-images.githubusercontent.com/3990044/165154737-16160e83-b162-4dd1-a496-2071b873cff5.png">


<img width="580" alt="Screen Shot 2022-04-25 at 12 25 39 PM" src="https://user-images.githubusercontent.com/3990044/165154587-7d76bd9f-cf19-4e4d-8254-f2fa9133eb66.png">


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



