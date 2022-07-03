export default class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view

    this.view.hooks.on('task-add', ({ name, id }) => {
      this.model.addTask({ name, id })
      this.view.renderTask(this.model.getTask(id))
    })

    this.view.hooks.on('task-remove', (id) => {
      this.model.removeTask(id)
      this.view.removeTask(id)
    })

    this.view.hooks.on('task-state-change', (id) => {
      this.model.changeTaskState(id)
      this.view.displayTaskState(this.model.getTask(id))
    })

    this.view.hooks.on('task-update', (id, newValue) => {
      this.model.updateTask(id, newValue)
      this.view.editTask(newValue, this.model.getTask(id))
    })
  }
}
