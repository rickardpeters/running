# TDDD27 - Advanced Web Programming

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