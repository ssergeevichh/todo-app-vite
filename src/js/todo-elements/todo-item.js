/* eslint-disable quote-props */
import { createELement } from '../helpers/helper'

export default function createTodoItem(taskInfo) {
  const taskItem = createELement('li', {
    'className': 'task-item tasks-list__item',
    'data-id': taskInfo.id,
  })

  const taskItemControlsWrapper = createELement('div', {
    className: 'task-item-controls',
  })

  const taskItemEditButton = createELement('button', {
    className: 'btn btn--type-edit',
    innerHTML: '<img src="/icons/options.svg" alt="">',
    'data-name': 'edit',
  })

  const taskItemDeleteButton = createELement('button', {
    className: 'btn btn--type-delete',
    innerHTML: '<img src="/icons/icons8-delete.svg" alt="">',
    'data-name': 'delete',
  })

  const taskItemCheckbox = createELement('input', {
    className: 'task-item__checkbox',
    checked: taskInfo.completed,
    type: 'checkbox',
    'data-name': 'checkbox',
  })

  const taskItemText = createELement('div', {
    className: 'task-item__name',
    textContent: taskInfo.name,
  })

  const editingField = createELement('input', {
    className: 'task-item__editing-field',
    type: 'text',
  })

  taskItemControlsWrapper.appendChild(taskItemEditButton)
  taskItemControlsWrapper.appendChild(taskItemDeleteButton)
  taskItem.appendChild(taskItemCheckbox)
  taskItem.appendChild(taskItemText)
  taskItem.appendChild(editingField)
  taskItem.appendChild(taskItemControlsWrapper)

  return taskItem
}
