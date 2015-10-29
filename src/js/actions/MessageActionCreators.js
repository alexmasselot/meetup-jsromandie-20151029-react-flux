import Dispatcher from '../Dispatcher';
import Constants from '../Constants';

export default {
  postMessage(message) {
    Dispatcher.dispatch({
      type: Constants.MESSAGE_POSTED,
      args: {message: message}
    })
  }
};
