# HiddenSpots
## Steps to run the back-end API
\
Enter the next command inside server file

```
> npm install
```

Create a PostgreSQL database, default name is **HiddenSpots** 

Create a database user or you can use default **posgres**

Config parameters in .env file on root directory

---

To create the database´s tables for the very first time you must add a property in file named **app.js** before **app.listen()** there is a function called : **"database.sync() ..."**, add an object as this *"database.sync( **{force : true}** )"* and then run 
```
> npm start
```
to create all the tables in your database.

after that remove that property <**{force: true}**> and you can start testing your API!!

