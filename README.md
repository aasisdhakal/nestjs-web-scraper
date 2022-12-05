## Scrapping Course From Coursera Using NestJs And Puppeteer
We're scraping data from coursera.org to list out course names, providers, descriptions, duration, and rating and converting those data into CSV format.

## Installation
* `clone this repo`
* `npm run start:dev`
* `curl localhost` now your app is up and running

## Endpoints
#### Courses
    Url : `http://localhost:3000/courses?category=name`
  
    Method: `GET`

## Structure

- 📁 `.github/workflows/test.yml` => Configured CI Pipelines
- 📁 `assets` => Contains Downloaded CSV File
- 📁 `src/courses` => Contains All The Logic Related To Courses Domain
- 📁 `vendor-services` => Contains Third Party Services
- 📁 `test/e2e/courses` => Contains e2e Testing For Courses  


## Things that could have been done
* Used queue for iterating all the pages data
* Dockerized the application
* Unit Tests for all the services rather than e2e



