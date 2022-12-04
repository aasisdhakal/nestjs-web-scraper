## Scrapping Course From Coursera Using NestJs And Puppeteer
We're scraping data from coursera.org to list out course names, providers, descriptions, duration, and rating and converting those data into CSV format.

## Installation
* `clone this repo`
* `npm run start:dev`
* `cp .env.example .env`
* `curl localhost` now your app is up and running

## Endpoints
#### Courses
    Url : `http://localhost:3000/courses?category=name`
  
    Method: `GET`
