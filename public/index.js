const body = document.querySelector('body')
const btnTheme = document.querySelector('.change-theme')
const allBtnCheck = document.querySelectorAll('.check-button')
const allBtnRemove = document.querySelectorAll('.remove-todo')

const allCompleted = []
const allActive = []

const changeTheme = async () => {
  if ( body.classList[0] == 'dark' ) {
    body.classList.remove('dark')
    body.classList.add('light')

  } else {
    body.classList.remove('light')
    body.classList.add('dark')

  }
}

const createTodo = (text) => {
  const mainContainer = document.querySelector('#mainContainer')

  const todoContainer = document.createElement('div')
  todoContainer.className = 'todo-container active'

  const checkBtn = document.createElement('check-button')
  checkBtn.className = 'check-button'
  checkBtn.addEventListener('click', completedChanger)

  const checkImg = document.createElement('img')
  checkImg.src = './assets/icon-check.svg'
  checkImg.alt = 'check icon'

  checkBtn.appendChild(checkImg)

  const todoText = document.createElement('h5')
  todoText.className = 'todo-text'
  todoText.innerHTML = text

  const removeBtn = document.createElement('span')
  removeBtn.className = 'remove-todo'
  removeBtn.addEventListener('click', removeTodo)

  todoContainer.append(checkBtn, todoText, removeBtn)

  mainContainer.appendChild(todoContainer)

}

const countAllTodos = () => {
  const allTodos = document.querySelectorAll('.todo-container')
  const allItensElement = document.querySelector('.allItens')

  allItensElement.innerHTML = `${allTodos.length} items left`

}

const showAllCompleted = () => {
  const completedTodos = document.querySelectorAll('.todo-container.completed')
  console.log(completedTodos)

}

const showAllActive = () => {
  const activeTodos = document.querySelectorAll('.todo-container.active')
  console.log(activeTodos)

}

function completedChanger() {
  const todo = this.parentElement
  todo.classList.toggle('active')
  todo.classList.toggle('completed')

  showAllCompleted()
  showAllActive()
}

function removeTodo() {
  const todoContainer = this.parentElement
  todoContainer.remove()

  showAllCompleted()
  showAllActive()
  return countAllTodos()
  
}

btnTheme.addEventListener('click', changeTheme)

body.addEventListener('keyup', (event) => {
  const createContainer = document.querySelector('.createTodoContainer')
  const inputValue = createContainer.childNodes[3]
  const inputText = inputValue.value
  
  if ( event.key === 'Enter' && inputText.length >= 3 ) { 
    createTodo(inputText)
    inputValue.value = ''
    
    return countAllTodos()
  }

})


allBtnCheck.forEach(button => {
  button.addEventListener('click', completedChanger)
})

allBtnRemove.forEach(button => {
  button.addEventListener('click', removeTodo)
})
