import * as Hapi from 'hapi';
import { controller, get, post, put, cache, config, route, validate, Controller } from 'hapi-decorators';
import {Container, Service, Inject} from "typedi";
import LogService from '../Services/LogService';

@controller('/test')
export default class TestController implements Controller {
    baseUrl: string;
    routes: () => Hapi.RouteConfiguration[];
    
    @Inject()
    logService: LogService;


    @get('/')
    @config({
        auth: false
    })
    @cache({
        expiresIn: 42000
    })
    @validate({
        payload: false
    })
    getHandler(request: Hapi.Request, reply: Hapi.ReplyWithContinue) {
        this.logService.log("message");
        
        (reply as any).view("index", {
            title: request.server.version,
            message: 'Index'
        });
        // reply({ success: true, msg: "billy" });
    }

    @post('/')
    postHandler(request: Hapi.Request, reply: Hapi.ReplyWithContinue) {
        reply({ success: true });
    }

    @put('/{id}')
    putHandler(request: Hapi.Request, reply: Hapi.ReplyWithContinue) {
        reply({ success: true });
    }

    @route('delete', '/{id}')
    deleteHandler(request: Hapi.Request, reply: Hapi.ReplyWithContinue) {
        reply({ success: true });
    }

    @get('/{id}')
    getOneHandler(request: Hapi.Request, reply: Hapi.ReplyWithContinue) {
        reply({ success: true, param: request.params.id });
    }
}