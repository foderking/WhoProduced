# WhoProduced

Uses the Genius api to retrieve producer credits.
Uses the spotify api to fetch information abount songs, artistes, and albums.
This project uses Client Credentials flow to access the spotify web api.

*Front Page*
![front-page](/examples/whoproduced-frontpage.jpg)

*Credit Page*
![credit-page](/examples/whoproduced-credit-page.jpg)

## Installation

Clone the repository
```sh
git clone https://github.com/foderking/WhoProduced_Backend.git

cd WhoProduced_Backend
```
edit .env file and add credentials
```
CLIENT_ID = 'GBf4j8....'
CLIENT_SECRET = 'HW3v9....'
```

### Prerequisites

+ A working shell
+ [Node.js](http://www.nodejs.org/download/) 
+ Git
+ A Spotify developer account 

Install Yarn

```sh
npm install -g yarn
```

Install dependencies
```sh
yarn
```

Run the server
```ssh
yarn start
```

You should see this on the terminal
```sh
yarn run v1.22.11
$ node src/app.js
Listening on 8888
```

### Using your own credentials
You will need to register your app and get your own credentials from the Spotify for Developers Dashboard.

To do so, go to [your Spotify for Developers Dashboard](https://beta.developer.spotify.com/dashboard) and create your application. 

Once you have created your app, replace the `client_id`, `redirect_uri` and `client_secret` in the examples with the ones you get from My Applications.



Then, open `http://localhost:8888` in a browser.

### CREDITS
[Spotify](https://github.com/spotify/web-api-auth-examples.git)
