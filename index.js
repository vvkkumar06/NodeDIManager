import NodeDIManager from './NodeDIManager.js';

exports.NodeDIManager = NodeDIManager;

/**
 * Usages
 * 
async function configure() {
    return await NodeDIManager.register([
        ['./repositories/user-repo.js', 'UserRepository'],
        ['./services/user-service.js', 'UserService']
    ])

}

configure()
    .then((data) => {
        console.log(data);
        let userController = new UserController();
        console.log(userController.getClientUsers());
    })
    .catch(err => {
        throw err;
    })
 */