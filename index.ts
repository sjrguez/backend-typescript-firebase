import containerApp from './src/config/container';


const Server = containerApp.resolve("app");

Server.start()
    .catch(console.log)