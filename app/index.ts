import 'reflect-metadata';
import Config from './Config';
import App from './Bootstrap/App'
import Database from './Bootstrap/Database';

let ModulesObject = require('../modules.json');

const Application = new App(Config.ServerSettings.Hapi);
const db  = new Database(Config.DB);

db.connect().then(() => {
	Application
	.LoadDatabase(db)
		.AddStaticPlugins(Config.StaticPlugins)
		.LoadAssets(Config.Assets)
		.AddModules(ModulesObject, Config.Views)
		.Start().then(() => {
			console.info(`Server started successfully on port ${Config.ServerSettings.Hapi.port}`);
		}).catch((err) => {
			console.error("An error occured : ", err);
		});
}).catch((err) => {
	console.error("Couldn't  connect to the database, please see the following error : ", err);
});