import * as Hapi from 'hapi';
import { IPlugin } from '../Modules/Common/Interface/Hapi/IPlugin';
import { IModuleObject } from './Interface/IModuleObject';

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

    AddModules(ModulesObject: Array<IModuleObject>) {
        for (let currentModuleString in ModulesObject) {
            let currentModule: IModuleObject = ModulesObject[currentModuleString];

            this.AddRoutes(currentModule.Controller, currentModuleString)
            this.AddDecorations(currentModule.Decorations, currentModuleString);
            this.AddPlugins(currentModule.Plugins, currentModuleString);
        }

        return this;
    }

    private AddDecorations(DecorationsArray: string[], moduleName: string) {
        let indexDecorationArray = 0;
        let decorationArrayLength = DecorationsArray.length;
        let decorationsInstance: Array<IPlugin> = [];

        for (;indexDecorationArray < decorationArrayLength; indexDecorationArray++) {
            let currentDecorationsString: string = DecorationsArray[indexDecorationArray];
            let currentDecorationsImport = require(`${this.baseModulePath}/${moduleName}/Decorations/${currentDecorationsString}`);
            let currentDecoration = new currentDecorationsImport.default();

            decorationsInstance.push(currentDecoration);
        }
        
        this.server.register(decorationsInstance);

        return this;
    }

    private AddPlugins(PluginsArray: string[], moduleName: string) {
        let indexPluginArray = 0;
        let pluginArrayLength = PluginsArray.length;
        let pluginsInstance: Array<IPlugin> = [];

        for (;indexPluginArray < pluginArrayLength; indexPluginArray++) {
            let currentPluginString: string = PluginsArray[indexPluginArray];
            let currentPluginImport = require(`${this.baseModulePath}/${moduleName}/Plugins/${currentPluginString}`);
            let currentPlugin = new currentPluginImport.default();

            pluginsInstance.push(currentPlugin);
        }
        
        this.server.register(pluginsInstance);

        return this;
    }

    private AddRoutes(ControllersArray: string[], moduleName: string) {
        let indexControllerArray = 0;
        let controllerArrayLength = ControllersArray.length;
        let controllersInstance: Array<Hapi.RouteConfiguration> = [];

        for (;indexControllerArray < controllerArrayLength; indexControllerArray++) {
            let currentControllerString: string = ControllersArray[indexControllerArray];
            let currentControllerImport = require(`${this.baseModulePath}/${moduleName}/Controller/${currentControllerString}`);
            let currentController = new currentControllerImport.default();
            this.server.route(currentController.routes());
            // controllersInstance.push(currentController.routes());
        }
        
        // this.server.route(controllersInstance);

        return this;
    }
}