export interface IPlugin {
    register(server:any, options:any, next:any) : void;
}