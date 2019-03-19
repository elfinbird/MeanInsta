# MeanInstaClient

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.4.

Instruction to deploy the application:
##Download the repository

##Server Configuration
Navigate to 'MeanInsta\server\config' and open config.json
Here, update the "MONGODB_URI" following the below example.
MONGODB_URI: This represent the MongoDB url you need to connect to. 
eg:
MONGODB_URL = "mongodb://localhost:27017/MeanInsta"; where
'mongodb://localhost:27017/' is the mongo database url
'MeanInsta' is the collection name where you need to save application related details.


##Server side
Navigate to 'MeanInsta\server' folder and run the following command on command prompt
`node app.js`

##Client side
Navigate to 'MeanInsta\MeanInstaClient' folder and run the following on command prompt
`ng build`
`ng serve -o`

##Running the application
Once the app is deployed, user will be navigated to the login screen.
For a new user, navigate to the 'Sign-up' option and create a new user.

Once a user is created, navigate to 'Sign-in' option and log into the application and there you go! 
Upload your images :)

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
