import React from 'react';

const Inbox = React.createClass({
  render() {
    return (
        <div>
          <h2>Inbox</h2>
          {this.props.children || "Welcome to your Inbox"}
        </div>
    )
  }
})

export default Inbox;