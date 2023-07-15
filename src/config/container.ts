import { createContainer, asFunction, asClass, asValue } from 'awilix';

import {routerApp} from '../api/app'
import  { Server } from './server'
import  { config }  from './enviroment'
import { DataBase } from './database'


const container = createContainer();

container.register({
  router: asFunction(routerApp).singleton(),
  app: asClass(Server).singleton(),
  config: asValue(config),
  db: asFunction(DataBase).singleton()
})


export default container;