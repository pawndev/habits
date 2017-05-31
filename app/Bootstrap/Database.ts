// import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions';
// import { createConnection}  from "typeorm";

// export default class Database {
//     constructor(public DBConfig: ConnectionOptions) { }

//     async Connect(lambda) {
//         const connection = await createConnection(this.DBConfig);

//         lambda(connection);
//     }
// }

import * as Iridium from 'iridium';
import { UserDocument, User } from '../Modules/Common/Model/User';
import {Container, Service, Inject} from "typedi";

export default class Database extends Iridium.Core {
    Users: Iridium.Model<UserDocument, User> = new Iridium.Model<UserDocument, User>(this, User);
}