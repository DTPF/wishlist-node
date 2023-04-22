`#node` `#express` `#mongodb` `#auth0` `#master-in-software-development`

# Dalist - Wishlist notes
This is a backend built with Node.js, Express.js, and MongoDB that allows users to create and manage their wishlists. The application features a user authentication system, allowing users to securely create and manage their own wishlists.

### Features
The Dalist application provides the following features:

- User registration and authentication
- User profile management
- Wishlist creation and management
- Item addition, editing, and deletion within wishlists
- Secure password storage using Auth0

### Installation
To install the application and its dependencies, follow these steps:

```bash
$ git clone https://github.com/DTPF/wishlist-node.git
$ cd wishlist-node
$ npm install
$ npm run dev
```

Now is running on http://localhost:4000 and is ready to recive requests.

Note that the application requires a MongoDB instance to be running on your local machine or accessible via a remote connection. The application will look for a WISHLIST_DB_URI environment variable containing the URI of the MongoDB instance to connect to.

### Contributing
Contributions to Wishlist Node are welcome and encouraged! If you encounter any issues or have ideas for new features, please submit an issue or pull request on the repository.

### License
This application is licensed under the MIT License.