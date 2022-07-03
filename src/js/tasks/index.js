import createForm from '../form/create-form'
import TasksModel from './State'
import Tasks from './Tasks'
import Controller from './Controller'

export default function todoInit(formClassName, todoSelector, completedSelector, todoAnchor) {
  const form = createForm(formClassName)
  const todoContainer = document.querySelector(todoSelector)
  const completedContainer = document.querySelector(completedSelector)
  const todoAnchorEl = document.querySelector(todoAnchor)

  const tasks = new Tasks(form, todoContainer, completedContainer, todoAnchorEl)
  const tasksState = new TasksModel()
  const controller = new Controller(tasksState, tasks)

  const storagedTasks = tasksState.getTasks()
  storagedTasks.forEach(task => tasks.renderTask(task))
}
