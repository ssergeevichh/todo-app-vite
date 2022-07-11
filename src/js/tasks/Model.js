import { getRandomId } from '../helpers/helper'

export default class Model {
  removeTask(key) {
    localStorage.removeItem(key)
  }

  addTask({ name }) {
    const taskInfo = {
      name,
      id: getRandomId(),
      completed: false,
    }
    localStorage.setItem(taskInfo.id, JSON.stringify(taskInfo))

    return [taskInfo]
  }

  getTask(key) {
    const task = localStorage.getItem(key)
    return JSON.parse(task)
  }

  updateTask({ id, newValue }) {
    const task = this.getTask(id)
    if (newValue)
      task.name = newValue
    else
      task.completed = !task.completed
    localStorage.setItem(id, JSON.stringify(task))

    return task
  }

  getTasks() {
    const tasks = []
    for (let i = 0; i < localStorage.length; i++) {
      const task = this.getTask(localStorage.key(i))
      tasks.push(task)
    }
    return tasks
  }
}
