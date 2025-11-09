# Weather Dashboard - Full Stack Application

## How to Run Locally

### Backend (.NET API)
- Navigate to the `backend` folder
- Run:
  ```bash
  dotnet restore
  dotnet run
Runs at https://localhost:7085

Frontend (React + TypeScript)
Navigate to the frontend folder

Run:

bash
Copy code
npm install
npm start
Open in browser: http://localhost:3000

Design & Architectural Choices
Frontend: React + TypeScript, reusable components

Backend: ASP.NET Core 8 Web API

State management: React hooks + localStorage

Dynamic UI: Background gradient changes with weather

Offline support: Shows cached weather when offline

Things I’d Improve With More Time
Complete 5-day forecast UI

Weather icon animations

Dark/light theme toggle

Better error handling

State management improvements (Context/Redux)

Unit testing

CI/CD pipelines
