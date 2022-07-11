export default class ModelApi {
  async getTasks() {
    const response = await fetch('http://localhost:8080/list')
    return await response.json()
  }

  async addTask({ name }) {
    const response = await fetch('http://localhost:8080/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })
    return await response.json()
  }

  async removeTask(id) {
    const response = await fetch('http://localhost:8080/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    })
  }

  async getTask(id) {
    const tasks = await this.getTasks()
    return tasks.data.find(task => task.id === id)
  }

  async updateTask({ id, newValue }) {
    const task = await this.getTask(id)
    if (newValue)
      task.name = newValue
    else
      task.completed = !task.completed

    const response = await fetch('http://localhost:8080/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...task }),
    })

    return await response.json()
  }
}
