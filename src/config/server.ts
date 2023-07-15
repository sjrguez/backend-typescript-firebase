import express, {  Express }  from 'express'

let _express: Express, _config: any;


export class Server {
    constructor({ config, router }: {  config: any, router: any  }) {
        _express = express().use(router);
        _config = config;
    }


    start() {
        return new Promise<void>((resolve) => {
            _express.listen(_config.PORT, () => {
                console.log(`APP is running on port: ${ _config.PORT }`);
                resolve();
            })
        })
    }
}