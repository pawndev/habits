import {Container, Service} from "typedi";

@Service()
export default class LogService {
    log(message) {
        console.log(message);
    }
}