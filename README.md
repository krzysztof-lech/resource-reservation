# Resource Reservation System

## Overview

A full‑stack web application for managing resources and creating reservations.
Built with ASP.NET Core 6, Entity Framework Core, SQL Server, and Angular.
The project demonstrates a complete CRUD system with a simple domain model and SPA integration.

## Features

- Manage resources (add, edit, delete)

- Manage users and categories

- Create and remove reservations

- Angular SPA served by ASP.NET Core

- SQL Server database

- REST API architecture

- Implementation of Dependency Injection and Repository Pattern

## Technologies

| Layer | Technology |
|----------|----------|
| Backend  | ASP.NET Core 6 |
| Frontend | Angular     |
| Database | SQL Server  |
| ORM      | Entity Framework Core |
| Build tools | npm, Angular CLI


## Project Structure

```
/Project
 ├── Controllers/        # API endpoints
 ├── Models/             # EF Core models
 ├── Data/               # DbContext + Repository
 ├── ClientApp/          # Angular application
 ├── Program.cs
 ├── Startup.cs
 └── Project.csproj
```

## Running the Application

### 1. Install prerequisites

- .NET 6 SDK
- Node.js  + npm
- SQL Server

### 2. Install Angular dependencies
```bash
cd ClientApp
npm install
```
### 3. Run the backend

From the project root:
```bash
dotnet run
```

### 4. Open the app

```bash
https://localhost:5001
```

## Database

Connection string is located in appsettings.json:

```json
"ConnectionStrings": {
    "ZasobyConnection": "Server=(localdb)\\MSSQLLocalDB;Database=Zasoby;MultipleActiveResultSets=true"
  }
```
Adjust it to match your SQL Server instance.

## API Examples

### Resources

```
GET    /api/zasoby
POST   /api/zasoby
DELETE /api/zasoby/{id}
```
### Reservations

```
GET    /api/rezerwacje
POST   /api/rezerwacje
DELETE /api/rezerwacje/{id}
```







