import '../styles/main.scss'
import Model from './tasks/Model'
import Controller from './tasks/Controller'
import View from './tasks/View'

const container = document.querySelector('.main-block')
const tasksView = new View(container)
const tasksModel = new Model()
const tasksController = new Controller(tasksModel, tasksView)
