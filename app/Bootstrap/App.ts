import * as Hapi from 'hapi';
import { Connection } from 'typeorm';
import { IPlugin } from '../Modules/Common/Interface/Hapi/IPlugin';
import { IModuleObject } from './Interface/IModuleObject';
import Database from './Database';

const Path = require('path');

export default class App {
    private server: Hapi.Server;
    private baseModulePath: string = `../Modules`;
    private connection: Connection;

    constructor(HapiSettings: Object) {
        this.server = new Hapi.Server();
        this.server.connection(<Hapi.ServerConnectionOptions>HapiSettings);
    }

    Start() {
        return this.server.start();
    }

    LoadAssets(AssetsObject: any) {
        let AssetsDir = AssetsObject.dir,
            assetsDirIndex = 0,
            assetsDirLength = AssetsDir.length;
        let assetsFiles = AssetsObject.file,
            assetsFilesIndex = 0,
            assetsFilesLength = assetsFiles.length;

        for (;assetsDirIndex < assetsDirLength; assetsDirIndex += 1) {
            this.LoadAssetDir(AssetsDir[assetsDirIndex].path, AssetsDir[assetsDirIndex].pathDir);
        }

        for (;assetsFilesIndex < assetsFilesLength; assetsFilesIndex += 1) {
            this.LoadAssetFile(assetsFiles[assetsFilesIndex].path, assetsFiles[assetsFilesIndex].pathFile);
        }

        return this;
    }

    AddStaticPlugins(StaticPlugins: Array<any>) {
        this.server.register(StaticPlugins, (err) => {
            if (err) throw err;
        });

        return this;
    }

    AddModules(ModulesObject: Array<IModuleObject>, ViewsConfig: Object) {
        for (let currentModuleString in ModulesObject) {
            let currentModule: IModuleObject = ModulesObject[currentModuleString];

            this.AddRoutes(currentModule.Controller, currentModuleString)
            this.AddDecorations(currentModule.Decorations, currentModuleString);
            this.AddPlugins(currentModule.Plugins, currentModuleString);
        }
        let moduleNameList = Object.keys(ModulesObject);
        this.SetTemplateEngine(moduleNameList, ViewsConfig);

        return this;
    }

    LoadDatabase(database: Database) {
        database.Connect(this.LoadConnection);

        return this;
    }

    private LoadConnection(connection: Connection) {
        this.connection = connection;
    }

    private LoadAssetDir(path: string, dirPath: string) {
        this.server.route({
            method: 'GET',
            path: `${path}/{param*}`,
            handler: {
                directory: {
                    path: Path.join(__dirname, dirPath),
                    listing: false,
                    index: false
                }
            }
        });

        return this;
    }

    private LoadAssetFile(path: string, pathFile: string) {
        this.server.route({
            method: 'GET',
            path: path,
            handler: function (request, reply) {
                (reply as any).file(Path.join(__dirname, pathFile));
            }
        });

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

        for (;indexControllerArray < controllerArrayLength; indexControllerArray++) {
            let currentControllerString: string = ControllersArray[indexControllerArray];
            let currentControllerImport = require(`${this.baseModulePath}/${moduleName}/Controller/${currentControllerString}`);
            let currentController = new currentControllerImport.default();

            this.server.route(currentController.routes());
        }
        
        return this;
    }

    private SetTemplateEngine(ModulesNameList: string[], ViewsConfig: Object) {
        let templateDirectories: string[] = [];

        ModulesNameList.forEach(key => {
            templateDirectories.push(Path.join(__dirname, this.baseModulePath, key, 'Views'));
        });

        let ViewsConfigFork: Object = Object.assign({
            path: templateDirectories,
            layoutPath: Path.join(__dirname, this.baseModulePath, "Common/Views/layout"),
            helpersPath: Path.join(__dirname, this.baseModulePath, "Common/Views/helpers"),
        }, ViewsConfig);

        (this.server as any).views(ViewsConfigFork);
    }

    private AddToDIContainer() {
        
    }
}
