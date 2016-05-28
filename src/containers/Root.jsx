import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';

class Root extends React.Component {

  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.element.isRequired,
  };

  render() {
    const { routes, store } = this.props;
    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          {routes}
        </div>
      </Provider>
    );
  }
}

export default Root;
