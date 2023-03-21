# SAIM-MESSENGER
<a href="https://saim-messenger-frontend.onrender.com/">Live Demo</a>
<hr/>
A redesigned chat application that reminisces the original AOL Instant Messenger.  This is a safe and fun place for Millennials to come chat and share their most hilarious Away Messages just like the gold old days. 
<hr/>

# Features

<ul>Authentication and Validation</ul>
<ul>Simple user interface design<ul>
<ul>Private conversations</ul>
<ul>Group conversations</ul>
<ul>CRUD features for Away Messages</ul>
<ul>Simple upbeat animations and sounds to promote a positive user's experience.</ul>
<hr/>

![image](https://user-images.githubusercontent.com/107096694/226524288-d809209f-501b-4095-89f6-76fca81d7c3f.png)
![image](https://user-images.githubusercontent.com/107096694/226524401-9807f791-fc31-4275-bf11-658fa39e2dc8.png)
![image](https://user-images.githubusercontent.com/107096694/226524665-22d21138-de50-4723-8fee-0d070c88d44b.png)
<hr/>
Setup
Install dependencies
Install the dependencies for the client and server.

# in one terminal window
cd server && npm i
# in another terminal window
cd client && npm i
Start server
An Express server is maintaining a Socket.io connection, persisting data short-term in memory, and exposes an API for accessing persistent data.

# in /server
npm start
Server is running on localhost:5000.

Start client
A React server with Redux for the front end.

# in /client
npm start
Client dev server is running on localhost:3000.

You can view the app at localhost:3000. Log in with any valid email and username, and you'll enter into the chatroom, which will display all users (noting which are currently online) and all messages.

Production build
Run npm run build on client and server to compile to JavaScript.

<hr/>
Hope you liked this project, don't forget to ⭐ the repo.  Thank you!
