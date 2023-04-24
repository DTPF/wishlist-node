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
```

Before running the application, rename the .env.example file to <b>.env</b> and configure this file based on your computer and <b>auth0</b>.  You can now run the application:

```bash
$ npm run dev
```

Now is running on http://localhost:4000 and is ready to recive requests but not for login.

### Contributing
Contributions to Wishlist Node are welcome and encouraged! If you encounter any issues or have ideas for new features, please submit an issue or pull request on the repository.

### License
This application is licensed under the MIT License.