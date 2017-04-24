import React from 'react';

class AddItem extends React.Component {

  constructor() {
    super();

    this.createItem = this.createItem.bind(this);
  }

  createItem(event) {
    event.preventDefault();

    const item = {
      text: this.text.value,
      priority: this.priority.value
    }

    this.props.createItem(item);
    this.itemForm.reset();
  }

  render() {
    return (
      <form className="add-item-form" ref={(input) => this.itemForm = input } onSubmit={this.createItem}>
        <input required ref={(input) => this.text = input} type="text" placeholder="Todo Item" />
        <div>
          <span>Priority:</span>
          <select ref={(input) => this.priority = input }>
            <option value="!">!</option>
            <option value="!!">!!</option>
            <option value="!!!">!!!</option>
          </select>
        </div>
        <button type="submit">+ Add Item</button>
      </form>
    )
  }

}

AddItem.propTypes = {
  createItem: React.PropTypes.func.isRequired
}

export default AddItem;

