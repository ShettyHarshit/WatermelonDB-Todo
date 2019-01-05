/** @format */
import React from "react";
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// const exportTodo = TodoList({database});
AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerComponent(appName, exportTodo);