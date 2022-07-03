import { createELement } from '../helpers/helper'

export default function createForm(formClassName) {
  const form = createELement('form', {
    className: formClassName,
    action: '#',
  })
  const formTitle = createELement('div', {
    className: 'add-task-form__title',
    textContent: 'Enjoy your day, add something...',
  })
  const inputBlock = createELement('div', {
    className: 'input-block',
  })
  const input = createELement('input', {
    className: 'input-block__input',
    type: 'text',
    name: 'task',
    placeholder: 'Task name',
  })
  const sumbitBtn = createELement('button', {
    className: 'btn add-task-form__btn',
    textContent: 'add',
  })

  form.appendChild(formTitle)
  form.appendChild(inputBlock)
  inputBlock.appendChild(input)
  inputBlock.appendChild(sumbitBtn)

  return form
}
