import React from 'react';

class TodoPicker extends React.Component {

  constructor() {
    super();
    this.goToTodo = this.goToTodo.bind(this);
  }

  goToTodo(event) {
    event.preventDefault();
    this.context.router.transitionTo(`/todo/${this.todoInput.value}`);
  }

  render() {
    return (
      <div className="todo-picker-container">
        <form onSubmit={this.goToTodo}>
          <h2>Please Enter A Todo List Name</h2>
          <input ref={(input) => {this.todoInput = input}} type="text" required placeholder="Todo Name" />
          <br />
          <button type="submit">GO</button>
        </form>
      </div>
    )
  }

}

export default TodoPicker;

