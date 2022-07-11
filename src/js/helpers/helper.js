export function createELement(tag, props) {
  const element = document.createElement(tag)

  Object.keys(props).forEach((key) => {
    if (key.startsWith('data-'))
      element.setAttribute(key, props[key])

    else
      element[key] = props[key]
  })

  return element
}

export function getRandomId() {
  return Math.floor(Math.random() * (100000 - 1 + 1)) + 1
}

export function isPromise(promise) {
  return !!promise && typeof promise.then === 'function'
}

export function createErrorMessage(message) {
  const errorMessage = document.createElement('div')
  errorMessage.classList.add('error-message')
  errorMessage.innerText = message

  return errorMessage
}
