import * as Hapi from 'hapi';
import { IPlugin } from '../Modules/Common/Interface/Hapi/IPlugin';

export default class App {
    private server: Hapi.Server;

    constructor(HapiSettings: Object) {
        this.server = new Hapi.Server();
        this.server.connection(<Hapi.ServerConnectionOptions>HapiSettings);
    }

    Start() {
        return this.server.start();
    }

    AddDecorations(decorationsArray: Array<IPlugin>) {
        this.server.register(decorationsArray);
        return this;
    }

    AddRoutes(routesConfig: Array<Hapi.RouteConfiguration>) {
        this.server.route(routesConfig);
        return this;
    }

    AddPlugins(pluginsArray: Array<IPlugin>) {
        this.server.register(pluginsArray);
        return this;
    }
}