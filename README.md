# Chat application - final project

## Usage

- To get the best CSS use, Mozilla or Chrome

_how to start and use the application_

- Clone this repository, from your local machine:
  ```
  git clone https://github.com/adaltas/ece-webtech-2021-fall.git webtech
  cd webtech/courses/webtech/project
  ```
- Install [Go](https://golang.org/) and [Dex](https://dexidp.io/docs/getting-started/). For example, on Ubuntu, from your project root directory:
  ```
  # Install Go
  apt install golang-go
  # Download Dex
  git clone https://github.com/dexidp/dex.git
  # Build Dex
  cd dex
  make
  make examples
  ```
  Note, the provided `.gitignore` file ignores the `dex` folder.
- Register your GitHub application, get the `clientID` and `clientSecret` from GitHub and report them to your Dex configuration. Modify the provided `./dex-config/config.yml` configuration to look like:
  ```yaml
  - type: github
    id: github
    name: GitHub
    config:
     clientID: xxxx98f1c26493dbxxxx
     clientSecret: xxxxxxxxx80e139441b637796b128d8xxxxxxxxx
     redirectURI: http://127.0.0.1:5556/dex/callback
  ```
- Inside `./dex-config/config.yml`, the front-end application is already registered and CORS is activated. Now that Dex is built and configured, you can start the Dex server: (You will need to swap your dex config by our config-dev.yaml)
  ```yaml
  cd dex
  bin/dex serve dex-config/config-dev.yaml
  ```
- Start the back-end
  ```bash
  cd back-end
  # Install dependencies (use yarn or npm)
  yarn install
  # Required is to init, fill the database with initial data, and start:
  yarn develop
  # Start the back-end if you didn't used develop
  yarn start
  ```
- Start the front-end
  ```bash
  cd front-end
  # Install dependencies (use yarn or npm)
  yarn install
  # Start the front-end
  yarn start
  ```

## Author

- Brice Benjamin: benjamin.brice@edu.ece.fr SI Inter Gr3
- Denis Matthieu: matthieu.denis@edu.ece.fr SI Inter Gr3

## Tasks

Project management

- Naming convention  
  We will use camelCase for normal variables
  and VARIABLE_VAR caps lock for constants.
  React functionnal and class components -> Component MyComp
- Project structure  
  We tried to structure the project with as many functionnal components as possible.
- Code quality  
  We are in medium quality code because it's not always the best option, or the more otpimise
- Design, UX  
  We inspired a lot of Messenger because it's our favorite UX application and she have a clean design without to much button
- Git and DevOps  
  We used git to share our implementation

Application development

- Welcome screens  
  Our first welcome screens is the login or sign in screen, then the second one, is after the connexion it's here to show you our possibilities
- New channel creation  
  We used a common MUI component (TopLeftSide next to discussions and before logout) who permited to add DB users in a channel by listing them with checkBox, we also used a search bar to find a user
- Channel membership and access  
  The acces is done on the creation or if you open the channel option drawer (TopRightSide) you can manage the actif user, currently we don't have friends on the app you can just add any users that are in DB
- Invite users to channels  
  At the creation or in the channel option drawer
- Message modification  
  If you slide on a message, a button will appear, by clicking you gonna open a dialog then you can choose between Delete, or modify the message you can also cancel your action.
- Message removal  
  Same component than message modification,and well styled
- Account settings  
  (TopLeftSide) By clicking on the avatar, you will open a modal then you can change the username, and add a new image to your avatar.
- Gravatar integration
  User have a letter avatar corresponding to their first letter username, if you are uploading an image it will be change by this one
- Personal custom avatar  
  Implemented by a Input change event -> transformed in Base64 to put it in DB. Image size up to 50mb
  This custom avatar will disapeard when we actualise the webpage beacause failed to manege the cookies on the avatar but if your logout then login the image will be there.
  For a new user, the avatar image is the first letter of the username. To change it you need to go on the account settings

## Bonus

- We add Search bar on the channel page and on the user selection a the creation of a channel
- Many of our TextField like the message form can be executed by pres ENTER or clicking on a button
- Like message we manage our channel on the same way, it's possible to delete or rename them
- We tried to implement an other login than the Oauth way, by sign up in DB. So we can create new users in db but the login is impossible because we will need a JWS token to get the Barear Autorization to CRUD channel or message. Currently we can just add new user by signing in
