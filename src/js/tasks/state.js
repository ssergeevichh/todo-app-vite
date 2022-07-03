export default class TasksModel {
  removeTask(key) {
    localStorage.removeItem(key)
  }

  addTask({ name, id }) {
    const taskInfo = JSON.stringify({
      id,
      name,
      completed: false,
    })
    localStorage.setItem(id, taskInfo)
  }

  changeTaskState(key) {
    const task = this.getTask(key)
    task.completed = !task.completed
    localStorage.setItem(key, JSON.stringify(task))
  }

  getTask(key) {
    const task = localStorage.getItem(key)
    return JSON.parse(task)
  }

  updateTask(key, newValue) {
    const task = this.getTask(key)
    task.name = newValue
    localStorage.setItem(key, JSON.stringify(task))
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
