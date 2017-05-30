// import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions';

// const DBConfig : ConnectionOptions | ConnectionOptions[] = {
//     driver: {
//         type: process.env.TYPEORM_DRIVER_TYPE || "mysql",
//         host: process.env.TYPEORM_HOST || "localhost",
//         port: process.env.TYEPROM_PORT || 3306,
//         username: process.env.TYPEORM_USERNAME || "root",
//         password: process.env.TYPEORM_PASSWORD || "root",
//         database: process.env.TYPEORM_DATABASE || "habits",
//     },
//     logging: {
//         logQueries: true,
//         logFailesQueryError: true
//     },
//     autoSchemaSync: true,
//     entities: [`${__dirname}/../Modules/**/Entity/{*.ts,*.js}`],
//     subscribers: [`${__dirname}/../Modules/**/Subscriber/{*.ts,*.js}`]
// };
import { Configuration as IridiumConfiguration } from 'iridium';

const DBConfig: IridiumConfiguration = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    username: process.env.DB_USERNAME || "",
    password: process.env.DB_password || ""
};

export default DBConfig;