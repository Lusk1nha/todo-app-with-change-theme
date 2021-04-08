const body = document.querySelector('body')
const mainContainer = document.querySelector('#mainContainer')

const btnTheme = document.querySelector('.change-theme')
const allBtnCheck = document.querySelectorAll('.check-button')
const allBtnRemove = document.querySelectorAll('.remove-todo')

const ordersBtns = document.querySelectorAll('.order-btn')

const Todos = {
  All: [],
  Completed: [],
  Active: []
}

// ? This function changes the theme between Light or Dark.
const changeTheme = async () => {
  if ( body.classList[0] == 'dark' ) {
    body.classList.remove('dark')
    body.classList.add('light')

  } else {
    body.classList.remove('light')
    body.classList.add('dark')

  }
}

// ? This creates the scope of the to-do with the user text.
const createTodo = (text) => {
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

// ? This update and Count how many Todo's is created.

const countAllTodos = () => {
  const allActive = document.querySelectorAll('.todo-container.active')
  const allItensElement = document.querySelector('.allItens')

  allItensElement.innerHTML = `${allActive.length} items left`

}

// ? Remove all completed to-do.
const removeAllCompleted = () => {
  const allCompleted = document.querySelectorAll('.todo-container.completed')

  for ( todo of allCompleted ) todo.remove()

  return saveTodos()
}


// ? Saving all todo in Object "Todos" to be used then later.
const saveTodos = () => {
  const completedTodos = document.querySelectorAll('.todo-container.completed')
  const activeTodos = document.querySelectorAll('.todo-container.active')
  const allTodos = document.querySelectorAll('.todo-container')

  Todos.All = allTodos
  Todos.Active = activeTodos
  Todos.Completed = completedTodos
}

// ? Render a determined type of Todo as Active, Completed, and Both.
const renderTodos = selectedTodos => {
  const allTodos = document.querySelectorAll('.todo-container')

  allTodos.forEach(todo => {
    todo.hidden = true
  });

  selectedTodos.forEach(selectedTodo => {
    selectedTodo.hidden = false
  });
}

// ? Change the to-do to complete
function completedChanger() {
  const todo = this.parentElement
  todo.classList.toggle('active')
  todo.classList.toggle('completed')

  const actualOrderBtn = document.querySelector('.selected').innerHTML
  
  saveTodos()
  countAllTodos()
  renderTodos(Todos[actualOrderBtn])
}

// ? Remove a specific selected to-do
function removeTodo() {
  const todoContainer = this.parentElement
  todoContainer.remove()

  return countAllTodos()
  
}

// ? This button calls the function that changes the theme.
btnTheme.addEventListener('click', changeTheme)


// ? If the user press enter on the keyboard, it is created a new To-do.
body.addEventListener('keyup', (event) => {
  const createContainer = document.querySelector('.createTodoContainer')
  const inputValue = createContainer.childNodes[3]
  const inputText = inputValue.value
  
  if ( event.key === 'Enter' && inputText.length >= 3 ) { 
    createTodo(inputText)
    inputValue.value = ''

    const actualOrderBtn = document.querySelector('.selected').innerHTML
    
    saveTodos()
    renderTodos(Todos[actualOrderBtn])
    countAllTodos()
  }

})

countAllTodos()
saveTodos()

// ? Adding the event listeners in buttons Check and Remove
allBtnCheck.forEach(button => {
  button.addEventListener('click', completedChanger)
})

allBtnRemove.forEach(button => {
  button.addEventListener('click', removeTodo)
})

const clearCompleteBtn = document.querySelector('.clearCompleted')
clearCompleteBtn.addEventListener('click', removeAllCompleted)

// ? If some order button is clicked, is rendered to-do type as completed, active, or all to-dos.
ordersBtns.forEach(button => {

  button.addEventListener('click', (e) => {
    ordersBtns.forEach(button => { button.classList.remove('selected') })
    button.classList.add('selected')

    const buttonType = button.innerHTML

    renderTodos(Todos[buttonType])
  })
})
