import { createContainer, asFunction, asClass, asValue } from 'awilix';

import {routerApp} from '../api/app'
import  { Server } from './server'
import  { config }  from './enviroment'
import { DataBase } from './database'

import {TaskRoutes} from '../api/routers'
import { TaskRepository } from '../api/repositories'
import { TaskController } from '../api/controllers'

const container = createContainer();

container.register({
  router: asFunction(routerApp).singleton(),
  app: asClass(Server).singleton(),
  config: asValue(config),
  db: asFunction(DataBase).singleton()
})
.register({ // Routes
  TaskRoutes: asFunction(TaskRoutes).singleton()
})
.register({ // Controllers
  TaskController: asClass(TaskController).singleton()
})
.register({ // Repository
  TaskRepository: asClass(TaskRepository).singleton()
})


export default container;