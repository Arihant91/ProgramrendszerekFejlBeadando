# ProgramrendszerekFejlBeadando

Dokumentáció:


alapból kettő felhasználó van:
basic felhasználó:
    username : "111",
    password : "111"
frontenden mindenhez van joga 

admin felhasználó:
    username : "admin"
    passowrd : "admin@admin.com"
backenden lévő plusz endpointokhoz is hozzáfér.

    postmannel login:

    POST: http://localhost:3000/login

    body, raw JSON:
    {
        "username": "admin",
        "password": "admin@admin.com"
    }

    postmannel hozzáadni a listinghez:

    POST: http://localhost:3000/products

    body, raw JSON:
    {   
        "id" : 6,
        "name": "headset",
        "price": "399"
    }

    postmannel updatelni a listing egy elemét:

     PUT: http://localhost:3000/products

    body, raw JSON:
    {   
        "id" : 6,
        "name": "headset",
        "price": "329"
    }

    postmannel updatelni a listing egy elemét:

     PUT: http://localhost:3000/products

    body, raw JSON:
    {   
        "id" : 6,
        "name": "headset",
        "price": "329"
    }
    (ID is elég neki)