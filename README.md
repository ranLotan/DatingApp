# Reports App

Upload and share geolocated reports upon google map

## Description
Application is a shared base geolocated information ( Geo-Report ), between users.

This project allows users register to the application.
as a regitered user, one can view all geo-reports that are already added.
user also can contribute Geo-Reports to the data base.

## Getting Started

### Dependencies

* Data base must be configured to service
* app uses a postgres that needs to be configured

* Used versions
Angular CLI: 16.2.10
Node: 18.18.2
Package Manager: npm 9.8.1
OS: win32 x64


### Executing program

After configuring DB, you can run program using Docker:
* first build client side: ./client> ng Build
* use Docker commands : ./API> 
```
docker build -t ranlo/reportapp .
docker run --rm -it -p 8080:80 ranlo/reportapp:latest
```
