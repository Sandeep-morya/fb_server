Code Explanation
The given code is a Node.js application that creates an HTTP server using the Express framework, sets up some routes, and establishes a WebSocket server using the Socket.IO library.

Dependencies
The application has the following dependencies:

express: A Node.js web application framework that provides a set of features for building web and mobile applications.
cors: A middleware that enables Cross-Origin Resource Sharing (CORS) for the web server.
http: A Node.js module that provides an HTTP server and client.
socket.io: A library that enables real-time, bidirectional, and event-based communication between the browser and the server.
dotenv: A module that loads environment variables from a .env file.
Socket.IO Server
The Socket.IO server is created using the http.createServer() method provided by the Node.js http module. The socket.io library is then used to create a new instance of the Server class, passing in the http server and a configuration object that enables Cross-Origin Resource Sharing (CORS).

The io.on() method is used to listen for socket connections. When a new socket connection is established, the server receives a connection event, and a callback function is executed. The callback function takes a socket object as its argument, which represents the new socket connection.

The socket object is used to listen for various events emitted by the client, such as client:join-room, client:send-message, and disconnect. When a client:join-room event is received, the socket joins the specified room using the socket.join() method. When a client:send-message event is received, the socket broadcasts the message to all other sockets in the same room using the socket.to().emit() method. When a disconnect event is received, the socket is removed from the activeUsers array and the updated array is broadcasted to all other sockets.

Express Server
The Express server is created using the express() function. The cors() middleware is used to enable Cross-Origin Resource Sharing (CORS) for the web server. The express.json() middleware is used to parse incoming JSON payloads.

The app.get() method is used to define the following routes:

/: Returns a JSON object with the message "Server is running".
/profile/:id: Calls the getUserDocument() function from ./controller/userController.js when a GET request is made to this route. The :id parameter in the URL is passed as an argument to the function.
/posts/single/:id: Calls the getSinglePost() function from ./controller/postController.js when a GET request is made to this route. The :id parameter in the URL is passed as an argument to the function.
/posts/all: Calls the getAllPosts() function from ./controller/postController.js when a GET request is made to this route.
/users/all: Calls the getAllUsers() function from ./controller/userController.js when a GET request is made to this route.
The app.use() method is used to define the following routes:

/account: Uses the accountRoute module from ./routes/accountRoute.js.
/post: Uses the postRoute module from ./routes/postsRoute.js.
/jwt: Uses the jwtRoute module from ./routes/jwtRoute.js.
/user: Uses the userProfileRoute module from ./routes/profileRoute.js.
/friend: Uses the friendRoute module from ./routes/friendRoute.js.
/chat: Uses the
