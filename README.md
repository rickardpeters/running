# TDDD27 - Advanced Web Programming

## Project Screencast
https://clipchamp.com/watch/YTrgKh9wr92

**Martins Screencast:** https://youtu.be/ETQgq9322y0

**Rickards Screencast:** https://clipchamp.com/watch/97gkUkJtZOL

## Functional Specification

### Project vision

Our vision is to create an app for runners where Strava users can create "run communities" - private friend groups where they can reach common goals and compete with each other. The app will utilize the strava API to fetch information from users.

### Core functions

-   **Firebase Authentication:** Firebase authentication is implemented to ensure a secure connection to the page, and a well trusted and well proven authentication system.
-   **Connection to Strava API:** Using Strava oauth users will authenticate and connect their strava account to the service to use real life data from their runs.
-   **Create Community:** Users can create communities that other users can join.
-   **Goal and Challenge Creation:** Members in a community can create goal and challenge proposals for the rest of the community.
-   **See and Find Other Communities:** Users will be able to see and find other communities, see their respective stats, goals and challenges and ask to join.

## Technical Specification

-   **Client side:** React, TypeScript
    
-   **Server side:** Django, Python
    
-   **Database:** SQLite

## Run the Project
0. Get secret keys from Firebase project and Strava API project.
1. Clone the Project.
2. Create two ```.env```files, one in server and one in client.
3. Add your seceret keys from step 0 into the relevant env-file.
2. Create a virtual environment and install dependencies in ```requirements.txt```.
3. Install Node packages from ```/client``` with npm install.
4. Set up server by running ```python manage.py makemigrations``` and ```python manage.py migrate```from ```/server```.
5. Start server with ```python manage.py runserver``` from ```/server```.
6. In a different terminal start client with ```npm start```from ```/client```.
