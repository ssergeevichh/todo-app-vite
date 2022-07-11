import { isPromise } from '../helpers/helper'

export default class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view

    this.view.hooks.on('task-add', ({ name }) => {
      const data = {
        name,
      }
      this.handleEvent({
        modelFunction: this.model.addTask.bind(this.model),
        viewFunction: this.view.renderTask.bind(this.view),
      }, data)
    })

    this.view.hooks.on('task-remove', (id) => {
      this.model.removeTask(id)
      this.view.removeTask(id)
    })

    this.view.hooks.on('task-state-change', ({ id }) => {
      const data = {
        id,
      }
      this.handleEvent({
        modelFunction: this.model.updateTask.bind(this.model),
        viewFunction: this.view.displayTaskState.bind(this.view),
      }, data)
    })

    this.view.hooks.on('task-update', ({ id, newValue }) => {
      const data = {
        id,
        newValue,
      }
      this.handleEvent({
        modelFunction: this.model.updateTask.bind(this.model),
        viewFunction: this.view.editTask.bind(this.view),
      }, data)
    })

    this.view.hooks.on('page-render', () => {
      this.handleEvent({
        modelFunction: this.model.getTasks.bind(this.model),
        viewFunction: this.view.renderTask.bind(this.view),
      })
    })
  }

  handleEvent({ modelFunction, viewFunction }, data) {
    const tasks = modelFunction(data)

    if (isPromise(tasks)) {
      tasks.then((responce) => {
        const tasksData = Array.isArray(responce.data) ? responce.data : [responce.data]
        tasksData.forEach(task => viewFunction(task))
      }).catch(() => {
        this.view.createErrorMessage()
      })
    }
    else {
      const tasksData = Array.isArray(tasks) ? tasks : [tasks]
      tasksData.forEach(task => viewFunction(task))
    }
  }
}
