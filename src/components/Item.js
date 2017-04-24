import React from 'react';

class Item extends React.Component {

  render() {
    const { details, index } = this.props;

    return (
      <li>
        <span className="item-priority">{details.priority}</span>
        <span className="item-text">{details.text}</span>
        <button onClick={() => this.props.deleteItem(index)}>&times;</button>
      </li>
    )
  }

}

Item.propTypes = {
  details: React.PropTypes.object.isRequired,
  deleteItem: React.PropTypes.func.isRequired,
  index: React.PropTypes.string.isRequired
}

export default Item;

