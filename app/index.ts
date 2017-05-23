import 'reflect-metadata';
import Config from './Config';
import App from './Bootstrap/App'

let ModulesObject = require('../modules.json');

const Application = new App(Config.ServerSettings.Hapi);
Application
	.AddStaticPlugins(Config.StaticPlugins)
	.LoadAssets(Config.Assets)
	.AddModules(ModulesObject, Config.Views)
	.Start().then(() => {
		console.info(`Server started successfully on port ${Config.ServerSettings.Hapi.port}`);
	}).catch((err) => {
		console.error("An error occured : ", err);
});