import Config from './Config';
import App from './Bootstrap/App'

const Application = new App(Config.ServerSettings.Hapi);
Application
	.AddPlugins(Config.Plugins)
	.AddDecorations(Config.Decorations)
	.AddRoutes(Config.Routes)
	.Start().then(() => {
		console.info(`Server started successfully on port ${Config.ServerSettings.Hapi.port}`);
	}).catch((err) => {
		console.error("An error occured : ", err);
});