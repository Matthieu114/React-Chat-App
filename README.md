# Chat application - final project

### Login page (purely decorative can only login with github through oauthv2)
![Optional Text](../master/appScreenshot/Home.png)

### Can Add users to a Channel
![Optional Text](../master/appScreenshot/ChatApp.png)

### Can see channel Info (users, name)
![Channel Info showing users and options](../master/appScreenshot/ChannelInfo.png)

### Can add a user to a channel
![Can add a user to a Channel](../master/appScreenshot/AddUser.png)

## Important

we are aware of a problem when first signing in with GitHub oauth that there isnt a correct redirection
In case this happens you must go back to the login page and sign in again

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
 
  The code quality is ok but not incredible. We tried to use clean code and avoid repeating code. It isnt as simpled and optimised as we would of liked
  but the code is readable and ok to understand.
- Design, UX  
  We were heavily inspired by messenger as it has a simple yet effective UI/Ux design
- Git and DevOps  
  We used git to share our implementation

Application development

- Welcome screens  
  Our first welcome screen is the login screen, you can access the sign up screen by clicking signup
  For now you can only signup with a github account through oauth
- New channel creation  
  We used a common MUI component (TopLeftSide next to discussions and before logout) who allowed us to add database users of your choice to a channel,
  You can search through the users with the real time search search bar
- Channel membership and access  
  Only the users of the channel have access to that channel, right now there are no admin priviledges. People get access to a channel when it is created.
  There is no friend system yet so we add users from the Db and not from a friends list.
  A channel name can be modified by any user in it by cliking on the edit channel button in the channel settings drawer
- Invite users to channels 
  Users can be invited to a channel by anyone in that channel by clicking on the add new member button in the channel settings drawer. You can then invite any active users not currently in the channel
- Message modification  
  Hovering over your own message will make a more info icon appear, by clicking on it you can select the edit message property
  it will open a textinput right on your message where you can enter the new desired message.
  A user can only modify his message
- Message removal  
  Same as for the message modification by hovering over the message you and clicking on the icon you get a delete option
  clicking on it opens up a deletion confirmation pop-up with the message info.
  A user can only delete his own message
- Account settings  
  (TopLeftSide) By clicking on the avatar, you will open a modal then you can change the username, and add a new image to your avatar.
- Gravatar integration
  We have not implemented gravatar integration yet
- Personal custom avatar  
  Implemented by a Input change event -> transformed in Base64 to put it in DB. Image size up to 50mb
  This custom avatar will disapear when we refresh the webpage as only the user info without the image avatar is stored in the cookies beacause failed to manege the cookies.
  However the image is stored in the back end and will be there if you logout and log back in
  For a new user, the avatar image is the first letter of his username. To change it you need to go in the account settings

## Bonus

- We added Search bars on the channel page and on the user selection at the creation of a channel
- We tried to implement an other login than the Oauth way, by signing up in DB.  We can create new users in db but the login is impossible because we will need a JWS token to get the Barear Autorization to CRUD channel or message. Currently we can just create a new user by signing in.
The user will be visible in the users when we log in with oauth
