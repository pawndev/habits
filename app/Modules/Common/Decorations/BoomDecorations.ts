import Boom = require("boom");
import { BoomError } from 'boom';
import { IPlugin } from '../Interface/Hapi/IPlugin'
import { IRegister } from '../Interface/Hapi/IRegister'

export default class BoomDecoration implements IPlugin {
    constructor() {
        this.register.attributes = {
            name: 'boom-reply-decorates',
            version: '0.1.0'
        };
    }

    register: IRegister = (server, options: Object, next: Function) => {
        server.bind(this);

        server.decorate('reply', 'notFound', this.notFound);
        server.decorate('reply', 'badImplementation', this.badImplementation);
        server.decorate('reply', 'unauthorized', this.unauthorized);
        server.decorate('reply', 'badRequest', this.badRequest);

        this._register(server, options);
        next();
    };
    
    notFound(message) : BoomError{
        return (this as any).response(Boom.notFound(message));
    }

    badImplementation(message) : BoomError{
        return (this as any).response(Boom.badImplementation(message));
    }

    unauthorized (message) : BoomError{
        return (this as any).response(Boom.unauthorized(message));
    }

    badRequest (message) : BoomError{
        return (this as any).response(Boom.badRequest(message));
    }

    protected _register(server, options) {
        return 'register';
    }
}