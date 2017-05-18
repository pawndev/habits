import * as Hapi from 'hapi';
import { IPlugin } from '../../Modules/Common/Interface/Hapi/IPlugin';

export interface IConfig {
    isProd: Boolean;
    DB: Object;
    ServerSettings: any;
    Uri: any;
    Routes: Array<Hapi.RouteConfiguration>;
    Plugins: Array<IPlugin>,
    Decorations: Array<IPlugin>
}