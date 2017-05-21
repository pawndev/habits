import * as Hapi from 'hapi';
import { controller, get, post, put, cache, config, route, validate, Controller } from 'hapi-decorators';

@controller('/test')
export default class TestController implements Controller {
    baseUrl: string;
    routes: () => Hapi.RouteConfiguration[];

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
        reply({ success: true, msg: "billy" });
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