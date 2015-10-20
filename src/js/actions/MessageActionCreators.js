import Dispatcher from '../Dispatcher';
import Constants from '../Constants';

export default {
  addMessage(text) {
    Dispatcher.handleViewAction({
      type: Constants.ActionTypes.MESSAGE_ADDED,
      text: text
    });
  }

};
