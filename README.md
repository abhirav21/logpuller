# Log Puller
> For searching logs stored in aws s3.

## Table of Contents
* [General Info](#general-information)
* [Frameworks Used](#frameworks-used)
* [Features](#features)
* [Setup](#setup)
* [Usage](#usage)
* [Contact](#contact)


## General Information
- Contains REST Api for searching logs


## Frameworks Used
- Nestjs - version 10.0.0

## Features
- Search logs with a keyword within a range of dates
- Returns an array of strings(lines) conatining search keyword, otherwise returns an empty array
- Integrated Swagger for better api documentation (http://localhost:3000/logpuller/api)


## Setup
Please follow instructions for setup :

1. Clone this project and use the command `npm install` to initiate installation.

2. Start the project using `npm run start`. The default port is 3000. The project will be accessible on `http://localhost:3000/logpuller/api`

3. Create .env file with aws s3 credentials for `AWS_ACCESSKEY_ID` and `SECRET_ACCESS_KEY`


Swagger is available on {host}/api

## Usage

To search logs, the POST Curl looks like the following : 

Example curl for searching in logs 

curl -X 'POST' \
  'http://localhost:3000/' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json' \
  -d '{
  "searchKeyword": "ERROR",
  "from": "2023-11-22 14:55:45",
  "to": "2024-02-02 14:55:45"
}'


Alternatively swagger can be used for API reference (http://localhost:3000/logpuller/api).



## Contact
Created by abhirav - feel free to contact me at `abhirav_sharma@yahoo.com`!

