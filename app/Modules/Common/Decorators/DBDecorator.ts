import { Container } from 'typedi';
import Database from '../../../Bootstrap/Database';

const DB = (target: Object, key: string | symbol) => {
    let value = Container.get(Database);
 
    const getter = () =>  {
        console.log("Getting value: ", value);
        return value;
    };

    Reflect.deleteProperty[key];
    Reflect.defineProperty(target, key, {
        get: getter,
    });
}

export default DB;