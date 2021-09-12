
/**
 * NodeDIManager: Light weight library for dependency injection
 */
export default class NodeDIManager {
    constructor() {}
    /**
     * Register all the dependencies
     * e.g.
     * [
     *   ['./repositories/user-repo.js', 'UserRepository'],
         ['./services/user-service.js', 'UserService']
     * ]
     * 
     *  or 
     * 
     * let services = new Map();
     * services.set(path, className)
     * 
     * @param {[[path: string, className: string]]} services 
     */
    static async register(services) {
        this.diContainer = {};
        let serviceMap = new Map(services);
        let serviceFilePromises = Array.from(serviceMap.keys()).map(key => import(key));

        let classNames = Array.from(serviceMap.values());

       try {
            const result = await Promise.allSettled(serviceFilePromises);
            result.filter(service => service.status === 'fulfilled').map(({ value: service }, index) => {
                this.diContainer[classNames[index]] = new service.default();
                return service;
            });
            return this.diContainer;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Get the instance of registered service
     * @param {string} className 
     * @returns 
     */
    static get(className) {
        return this.diContainer[className]
    }
}