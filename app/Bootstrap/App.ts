import * as Hapi from 'hapi';
import { IPlugin } from '../Modules/Common/Interface/Hapi/IPlugin';

export default class App {
    private server: Hapi.Server;
    private baseModulePath: string = `../Modules`;

    constructor(HapiSettings: Object) {
        this.server = new Hapi.Server();
        this.server.connection(<Hapi.ServerConnectionOptions>HapiSettings);
    }

    Start() {
        return this.server.start();
    }

    AddModules(ModulesObject) {

        for (let module in ModulesObject) {
            let currentController = require(`${this.baseModulePath}/Controller/`)
        }

        return this;
    }

    private AddDecorations(decorationsArray: Array<IPlugin>) {
        this.server.register(decorationsArray);
        
        return this;
    }

    private AddRoutes(ControllersArray: string[]) {
        let indexControllerArray = 0;
        let controllerArrayLength = ControllersArray.length;
        let controllersInstance: Array<Hapi.RouteConfiguration> = [];

        for (;indexControllerArray < controllerArrayLength; indexControllerArray++) {
            let currentControllerString: string = ControllersArray[indexControllerArray];
            let currentControllerImport = require(`${this.baseModulePath}/Controller/${currentControllerString}`);
            let currentController = new currentControllerImport();

            controllersInstance.push(currentController);
        }
        
        this.server.route(controllersInstance);

        return this;
    }

    private AddPlugins(pluginsArray: Array<IPlugin>) {
        this.server.register(pluginsArray);
        return this;
    }
}