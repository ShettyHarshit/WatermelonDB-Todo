/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { mySchema } from "./src/model/schema";
import Todo from './src/model/Todo';
// import 'es6-symbol/implement';
import 'core-js/es6/symbol'; 
import 'core-js/fn/symbol/iterator';
// import TodoList from './src/components/Todo';
// import Post from './model/Post' // ⬅️ You'll import your Models here

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  dbName: "WatermelonDemo",
  schema: mySchema
});

// Then, make a Watermelon database from it!
const database = new Database({
    adapter,
    modelClasses: [
        Todo
    ],
    actionsEnabled: true,
})

// const exportTodo = TodoList({database});
AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerComponent(appName, exportTodo);