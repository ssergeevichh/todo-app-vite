import EventBus from 'js-event-bus'
import createForm from '../todo-elements/form-element'
import createTodoWrapper from '../todo-elements/todo-wrapper'
import createTodoItem from '../todo-elements/todo-item'
import { createELement } from '@/js/helpers/helper'

export default class View {
  constructor(container) {
    this.container = container
    this.hooks = new EventBus()

    this.initTodo()
  }

  completedContainer = null
  todoContainer = null

  initTodo() {
    const todoWrapper = createTodoWrapper()
    this.addListenersToTasks(todoWrapper)
    this.container.appendChild(todoWrapper)

    this.completedContainer = this.container.querySelector('[data-id="tasks-completed"]')
    this.todoContainer = this.container.querySelector('[data-id="tasks-todo"]')

    todoWrapper.before(createForm({
      onSubmit: (taskName) => {
        this.hooks.emit('task-add', null, {
          name: taskName,
        })
      },
    }))

    setTimeout(() => {
      this.hooks.emit('page-render')
    }, 0)
  }

  createTaskItem(taskInfo) {
    return createTodoItem(taskInfo)
  }

  addListenersToTasks(todoBlock) {
    let isUpdatated = true
    todoBlock.addEventListener('click', ({ target }) => {
      const taskItem = target.closest('.task-item')
      if (taskItem) {
        if (target.closest('.task-item__checkbox')) {
          this.hooks.emit('task-state-change', null, {
            id: +taskItem.dataset.id,
          })
        }
        else if (target.closest('.btn--type-edit')) {
          isUpdatated = !isUpdatated
          this.toggleEditMode(taskItem)
          if (isUpdatated) {
            const newTaskName = this.getEditingFieldValue(taskItem)

            this.hooks.emit('task-update', null, {
              id: +taskItem.dataset.id,
              newValue: newTaskName,
            })
          }
        }
        else if (target.closest('.btn--type-delete')) {
          this.hooks.emit('task-remove', null, +taskItem.dataset.id)
        }
      }
    })
  }

  renderTask(taskInfo) {
    const taskItem = this.createTaskItem(taskInfo)
    if (taskInfo.completed)
      this.completedContainer.appendChild(taskItem)
    else
      this.todoContainer.appendChild(taskItem)
  }

  removeTask(id) {
    const task = document.querySelector(`[data-id="${id}"]`)
    task.remove()
  }

  displayTaskState({ id, completed }) {
    const taskItem = document.querySelector(`[data-id="${id}"]`)
    const editButton = taskItem.querySelector('.btn--type-edit')
    if (completed) {
      this.completedContainer.appendChild(taskItem)
      editButton.style.display = 'none'
    }
    else {
      this.todoContainer.appendChild(taskItem)
      editButton.style.display = 'block'
    }
  }

  editTask({ name, id }) {
    const taskItem = document.querySelector(`[data-id="${id}"]`)
    const taskItemText = taskItem.querySelector('.task-item__name')
    taskItemText.textContent = name
  }

  toggleEditMode(taskItem) {
    const taskItemText = taskItem.querySelector('.task-item__name')
    const editingField = taskItem.querySelector('.task-item__editing-field')
    const editBtn = taskItem.querySelector('.btn--type-edit')
    const checkbox = taskItem.querySelector('.task-item__checkbox')

    taskItemText.classList.toggle('task-item__name--hidden')
    editBtn.classList.toggle('btn--type-edit-active')
    editingField.classList.toggle('task-item__editing-field--active')

    if (editBtn.classList.contains('btn--type-edit-active')) {
      editBtn.innerHTML = '<img src="/icons/save.svg" alt="">'
      editingField.value = taskItemText.textContent
      checkbox.setAttribute('disabled', 'disabled')
    }

    else {
      editBtn.innerHTML = '<img src="/icons/options.svg" alt="">'
      taskItemText.textContent = editingField.value
      checkbox.removeAttribute('disabled')
    }
  }

  getEditingFieldValue(element) {
    const editingField = element.querySelector('.task-item__editing-field')
    let taskName = null
    if (editingField)
      taskName = editingField.value

    return taskName
  }

  createErrorMessage() {
    const errorMessage = createELement('div', {
      className: 'error-message',
      textContent: 'Something went wrong, try again later',
    })
    this.container.appendChild(errorMessage)
    errorMessage.classList.add('error-message--active')

    setTimeout(() => {
      errorMessage.classList.remove('error-message--active')
      setTimeout(() => {
        errorMessage.remove()
      }, 1000)
    }, 4000)
  }
}
