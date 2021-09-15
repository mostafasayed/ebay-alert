# Ebay Alert

Create a services to manage alerts for products on Ebay.com, User can create (as well as Edit, Update and Delete) an alert , and he will receive updates about specific products based on his/her search phrases, The user will be notified through email.

## Table of content

- [Features](#features)
- [Architecture](#architecture)
- [Services](#services)
- [Running](#running)
- [Testing](#testing)
- [Enhancement ToDo](#enhancement-todo)

## Features

User can perform CRUD operation on alert, each alert can be defined by email, search term and interval time (2 Mins, 10 Mins, 30 Mins).

User will receive email with top 20 results (sorted by price from low to high) based on his/her search criteria.

The user will be notified with some insights email (Like cheapest product).

## Architecture

You can check architecture draw from [Here](https://drive.google.com/file/d/1RgsDZjIZNS2mBoZGKrpz0rrR1MpTEn16/view?usp=sharing)

For the main service we have:

- Alert-Backend (Django) that saves the alerts, make scheduler to send email, send results email and insights email
- Alert-Frontend (Reactjs) that manage CRUD operations for alerts

For insight service we used (Nodejs) for sending the insights

For message queue we used (RabbitMQ):

- Insight service as Publisher
- Alert-backend as Consumer

## Services

We have main three services:

- [Alerts](#alerts)
- [Insights](#insights)
- [Message Queue](#message-queue)

### Alerts

Backend Django and I used the following libraries:

- [djangorestframework](http://django-rest-framework.org/) to expose API for frontend part
#### `GET list of alerts`

Request

    `GET /api/alerts`
    
Response

    `[{id, email, search_term, interval_time}, {} ...]`

#### `Create alert`
    
Request
        
        `
        POST /api/alerts
        body: {
            email: "test@example.com",
            search_term: "shoe",
            interval_time: 2
        }
        `
Response

        `
        {id, email, search_term, interval_time}
        `

#### `Edit alert`
    
Request
        
        `
        PUT /api/alerts/:id
        body: {
            email: "test@example.com",
            search_term: "shoe",
            interval_time: 2
        }
        `
Response

        `
        {id, email, search_term, interval_time}
        `

#### `Delete alert`
    
Request
        
        `
        DELETE /api/alerts/:id
        `
Response

        `
        id
        `
- [django-crontab](https://pypi.org/project/django-crontab/) to create crontab that loop over alerts and get results of each alert based on the search term and interval
- [django.core.mail](https://docs.djangoproject.com/en/3.2/topics/email/) to send email
- [pika](https://github.com/pika/pika) to consume message from message queue and forward data to other function that check validaty of the insights an send emails to users

Frontend Reactjs and I used the following libraries:

- [react-router](https://reactrouter.com/web/guides/quick-start) to manage routing
- [react-redux](https://react-redux.js.org/) and [redux-thunk](https://www.npmjs.com/package/redux-thunk) for managing state and calling APIs
- bootstrap for styling

### Insights

Nodejs and I used the following libraries:

- express to handle end point and receive data

#### `End point`
    
Request
        
        `
        POST /events
        body: {
            type: "CheapestProductInsight",
            data: {
                subject: "Email Subject",
                body: "Email Body"
            }
        }
        `
Response

        `
        {
            "status": "ok"
        }
        `

- amqplib to publish insights message to RabbitMQ

### Message Queue

I used the RabbitMQ to make the services independent and use async processing that make the system more scalable and more resiliant

## Running

You should install [docker-compose](https://docs.docker.com/compose/), also go to backend/backend/.env and change value of the environment variables and add your own ebay app id and your email credential.

```
EBAY_APPID='your app id'
EMAIL_BACKEND='django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST='mail host smtp.gmail.com if you are using google'
EMAIL_USE_TLS=True
EMAIL_PORT='mail port 587 if you use google'
EMAIL_HOST_USER='your email'
EMAIL_HOST_PASSWORD='your email password'
```

and now you can run the system using this command and you have to be in the root directory of the project.

```
docker-compose up
```

Then open http://localhost:3000 to access the frontend

## Testing

There are test cases for alert-backend alert-frontend insights, you can run test cases by run

```
docker-compose exec backend python manage.py test
docker-compose exec front npm test
docker-compose exec insights npm test
```

## Enhancement ToDo

I need to separate the sending email function to stand alone service that consumes to RabbitMQ so whenever any other service need to send email just publish the message with email details (email address, subject, body) and this email service will consume those messages and send the emails.

