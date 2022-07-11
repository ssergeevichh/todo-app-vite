/* eslint-disable quote-props */
import { createELement } from '../helpers/helper'

export default function createTodoWrapper() {
  const todoWrapper = createELement('div', {
    className: 'tasks-wrapper',
  })
  const todoBlock = createELement('div', {
    className: 'tasks tasks-wrapper__todo',
  })
  const todoTitle = createELement('div', {
    className: 'title',
    textContent: 'Tasks',
  })
  const todoList = createELement('ul', {
    className: 'tasks-list',
    'data-id': 'tasks-todo',
  })

  const completedBlock = createELement('div', {
    className: 'tasks tasks-wrapper__completed',
  })
  const completedTitle = createELement('div', {
    className: 'title',
    textContent: 'Completed',
  })
  const completedList = createELement('ul', {
    className: 'tasks-list',
    'data-id': 'tasks-completed',
  })

  todoBlock.append(todoTitle, todoList)
  completedBlock.append(completedTitle, completedList)
  todoWrapper.append(todoBlock, completedBlock)

  return todoWrapper
}
