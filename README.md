# TDDD27 - Advanced Web Programming

## Functional Specification

### project vision

Our vision is to create an app for runners where Strava users can create "run clubs" - private friend groups where they can reach common goals and compete with each other. The app will utilize the strava API to fetch information from users.

### Core functions

-   **User Authentication and connection to Strava account:** Using Strava oauth users will authenticate and connect their strava account to the service.
-   **Create Community:** Users will be able to create communities and invite other users to them.
-   **Community Page:** Communities will have their own community page displaying recent activites, statistics, and current goals and challenges.
-   **Goal and Challenge Creation:** Members in a community can create goal and challenge proposals for the rest of the community.
-   **Route invitation:** Members in a community can send invitation to a running route which other users can accept if they want to join.
-   **Messaging functionality:** Communities will include a chat function for members to chat.
-   **See and Find Other Communities:** Users will be able to see and find other communities, see their respective stats, goals and challenges and ask to join.

## Technical Specificaiton

For this project we have chosen to use the MERN stack (MongoDB, Express.js, React, Node.js). We made this choice for a multitude of reasons including the high performance and scalability needed for a "social media" type application, but also since MERN is widely used with easy to find resources online which will help during development.

-   **Client side:** React

-   **Server side:** Node.js and Express.js

-   **Database:** MongoDB
