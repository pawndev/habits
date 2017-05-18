const DBConfig : Object = {
    isEnable: process.env.DB_ENABLE || true,
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    url: "mongo",
    port: "27017",
    database: "hapits"
};

export default DBConfig;