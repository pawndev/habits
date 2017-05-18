const ServerSettings : Object = {
    Hapi: {
        port: process.env.BACKEND_PORT || 8080,
        host: "localhost"
    }
};

export default ServerSettings;