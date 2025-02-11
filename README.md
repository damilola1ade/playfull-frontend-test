## Screenshots

### Card glows on hover and card content changes



https://github.com/user-attachments/assets/6da29dc3-f289-4901-8b84-04124b4d740e


### Search by game name


https://github.com/user-attachments/assets/c46c827f-ca6f-45ae-96c1-cf9137e6ed58


### Filter by genre


https://github.com/user-attachments/assets/d22c4cea-932f-4aba-83fa-0eaf73e134bb


### Show Live or Non-live Games or both

![01-34-25-ezgif com-speed](https://github.com/user-attachments/assets/cf5b945c-3c23-4280-8f38-e39a87b0962a)

### Multiple variable filtering

![01-35-43-ezgif com-speed](https://github.com/user-attachments/assets/8607052a-9c42-4f4c-a8b7-1117a6adc265)


### Required Functionality

The user should be able to organise the directory content by:

- Searching for games by name ✅
- Filter by selecting a category from a dropdown ✅
- Toggling live/non-live games ✅

When the user hovers over a game module in the directory it should:

- Smoothly scale up module slightly with an ease-in / ease-out transition effect ✅
- At the same time as the scale up - fade in a light glow behind the selected module and add stroke around it ✅
- At the same time as the scale-up - fade out the “live” and genre. Move the game title up. ✅
- At the same time as the scale-up - reveal a short 1 line description below the title. ✅
- At the same time as the scale-up - play animated gif in the area where the key art normally resides. ✅

## Environment Setup

### Frontend

Install dependencies

`npm install`

Start project

`npm run dev`

Frontend url: `http://localhost:5173`

### Backend

`docker-compose` file to help you setup your backend. The docker-compose file will spin up a Postgres container and a Hasura graphql engine container.

Run your environment with `docker-compose up -d`.

To check the status of the containers, run `docker-compose ps`.

To check the logs of the containers, run `docker-compose logs -f`.

You can browse the Hasura interface at `http://localhost:8080`. You will need the `admin` password to access the admin interface. The password can be found in the `docker-compose.yml` file under `HASURA_GRAPHQL_ADMIN_SECRET`

To run a simple query in the GraphQL console, you can navigate the GraphiQL panel in the console. At the top of the console under **GraphQL Endpoint** you will see the endpoint for both http and websocket queries for your frontend to use.

Please define the request header before calling api endpoints

1. key: `x-hasura-admin-secret`, value: in the `docker-compose.yml` file under `HASURA_GRAPHQL_ADMIN_SECRET`

To list all games in the postgres database, you can run :

```gql
query MyQuery {
  games {
    name
  }
}
```

This will return a list something like so :

```json
{
  "data": {
    "games": [
      {
        "name": "Stella Fantasy"
      },
      {
        "name": "Phantom Galaxies"
      }
    ]
  }
}
```

Another sample query to return a specific game genre :

```gql
query MyQuery {
  game_genre_types(where: { genre_name: { _eq: "FPS" } }) {
    genre_name
  }
}
```

This will return only the game genre for First Person Shooter (FPS).

To stop the containers, run `docker-compose down`.
