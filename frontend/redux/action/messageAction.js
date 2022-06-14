export const ALERT_MESSAGE = "ALERT_MESSAGE";

export default function messageAction(message, type) {
  return (dispatch) => {
    dispatch({
      type: ALERT_MESSAGE,
      payload: {
        message: message,
        type: type,
      },
    });
  };
}
