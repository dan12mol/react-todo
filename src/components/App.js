import React from 'react';

import base from '../base';

import AddItem from './AddItem';
import Item from './Item';

class App extends React.Component {

  constructor() {
    super();

    this.state = {
      items: {},
      uid: null,
      owner: null
    };

    this.createItem = this.createItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.authenticateFacebook = this.authenticateFacebook.bind(this);
    this.authHandler = this.authHandler.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  componentDidMount() {
    base.onAuth((user) => {
      if (user) {
        this.authHandler(null, {user});
      }
    });
  }

  componentWillMount() {
    this.ref = base.syncState(`${this.props.params.todoId}/items`, {
      context: this,
      state: 'items'
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  createItem(item) {
    const items = {...this.state.items};

    const timestamp = Date.now();
    items[`item-${timestamp}`] = item;

    this.setState({ items });
  }

  deleteItem(key) {
    const items = {...this.state.items};

    items[key] = null;

    this.setState({ items });
  }

  goToHomepage(event) {
    event.preventDefault();
    this.context.router.transitionTo('/');
  }

  authenticateFacebook() {
    base.authWithOAuthPopup('facebook', this.authHandler);
  }

  logOut() {
    base.unauth();
    this.setState({ uid: null });
  }

  authHandler(err, fbData) {
    if (err) {
      console.error(err);
      return;
    }

    const storeRef = base.database().ref(this.props.params.todoId);
    storeRef.once('value', (snapshot) => {
      const data = snapshot.val() || {};

      if (!data.owner) {
        storeRef.set({
          owner: fbData.user.uid
        });
      }

      this.setState({
        uid: fbData.user.uid,
        owner: data.owner || fbData.user.uid
      });
    });
  }

  renderLogin() {
    return (
      <div>
        <p>This Todo List has already been claimed by someone. Please sign in.</p>
        <button className="facebook-button" onClick={this.authenticateFacebook}>Log In with Facebook</button>
      </div>
    )
  }

  render() {

    const logout = <a className="logout-button" onClick={this.logOut}>Log Out!</a>;

    if (!this.state.uid) {
      return <div className="todo-list logged-out">{this.renderLogin()}</div>
    }

    if (this.state.uid !== this.state.owner) {
      return (
        <div>
          <p>This Todo has already been claimed by someone else. Proceed to the starting page and choose another name for your Todo List.</p>
          <button onClick={this.goToHomepage}>Homepage</button>
          {logout}
        </div>
      )
    }

    return (
      <div className="todo-list">
        <AddItem createItem={this.createItem} />
        <ul className="items-list">
          {
            Object.keys(this.state.items)
              .map(key => <Item key={key} deleteItem={this.deleteItem} index={key} details={this.state.items[key]} />)
          }
        </ul>
        {logout}
      </div>
    )
  }

}

App.propTypes = {
  params: React.PropTypes.object.isRequired
}

export default App;

