import { IConfig } from './Interface/IConfig'
import DBConfig from './DBConfig';
import ServerSettings from './ServerSettings';
import Uri from './Uri';
import StaticPlugins from './StaticPlugins';
// import Routes from './Routes';
// import Plugins from './Plugins';
// import Decorations from './Decorations';

const env = process.env;

const Config : IConfig = {
    isProd: (env.NODE_ENV === "prod") ? true : false,
    DB: DBConfig,
    ServerSettings: ServerSettings,
    Uri: Uri,
    StaticPlugins: StaticPlugins
};

export default Config;