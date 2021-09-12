# Node DI Manager
## Light Weight, Easy To Use, Dependency Injection Container

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Compatiable with any javascript library.

## Features

- Add a list of service classes as dependencies
- Easy to fetch the current instance of any dependency


## Installation

Node DI Manager requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
npm i node-di-manager
```

For production environments...

## Development
### index.js
```sh

async function configure() {
    return await NodeDIManager.register([
        //[path, alias]
        ['./repositories/user-repo.js', 'UserRepository'],
        ['./services/user-service.js', 'UserService']
    ])

}

configure()
    .then((data) => {
        // Data is the list of dependencies initialized
        let userController = new UserController();
        console.log(userController.getClientUsers());
    })
    .catch(err => {
        throw err;
    })
```
### UserController.js
```sh
import NodeDIManager from "../NodeDIManager.js";

export default class UserController {
    #userService = NodeDIManager.get('UserService');
    constructor(){}

    getClientUsers() {
        return this.#userService.getAllUsers();
    }
}
```

### UserService.js
```sh
import NodeDIManager from "../NodeDIManager.js";

export default class UserService {
    #userRepo = NodeDIManager.get('UserRepository');
    constructor(){
    }

    getAllUsers() {
      return this.#userRepo.getUsers();
    }

}
```

### UserRepository.js
```sh
export default class UserRepository {
    constructor(){}

    getUserById(id){
        return {
            name: 'Vivek',
            designation: 'Developer'
        }
    };
    
    getUsers() {
        return [
            {
                name: 'Sam',
                designation: 'Developer'
            },
            {
                name: 'Devid',
                designation: 'Developer'
            },
            {
                name: 'Vivek',
                designation: 'Developer'
            }
        ]
    }
}
```

