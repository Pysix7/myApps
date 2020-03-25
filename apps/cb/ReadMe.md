## Usage

## Frontend
- unfortunately i Was not able to dockerize it
- so we have to run it on dev server.

- clone the repo 
- inside carbooking-frontend run 

#### Commands  
    git clone https://github.com/Pysix7/myApps.git ic-frontend
    
    cd ic-frontend
    
    npm i
    
    npm start

## Backend 
- There's `docker-compose.yml` file for backed inside carbooking-backend folder , need to run the command.

#### Command

    docker-compose up

- Now you can use the app.

- Sign up

- Log in

- select Roundtrip

- type atleast 3 charcters to search for the destinaton.

- select driver

- Complete the payment, for the payment process you can use `4242424242424242` card number with any future date, cvv, and 5 digit zip.

#### Notes

- i was not able to use Google places api, so i stored some data manually to database, For Reference: the cities data is in `cities-data.txt` file.
