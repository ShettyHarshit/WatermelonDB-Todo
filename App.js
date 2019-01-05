import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { mySchema } from "./src/model/schema";
import Todo from './src/model/Todo';
// import 'es6-symbol/implement';
// import 'core-js/es6/symbol'; 
// import 'core-js/fn/symbol/iterator';
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



export default class App extends Component {
  
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>Hi</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
