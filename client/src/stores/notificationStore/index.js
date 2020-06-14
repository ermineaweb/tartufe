import makeStore from "../index";
import {reducer, initialState} from "./reducer";

const [NotificationProvider, useNotification, useNotificationDispatch] = makeStore(reducer, initialState);

export {NotificationProvider, useNotification, useNotificationDispatch};