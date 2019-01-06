import React, {Component} from 'react';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';
import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { mySchema } from "./src/model/schema";
import Todo from './src/model/Todo';
import withObservables from "@nozbe/with-observables";
import _ from 'lodash';

// import 'es6-symbol/implement';
// import 'core-js/es6/symbol'; 
// import 'core-js/fn/symbol/iterator';
// import TodoList from './src/components/Todo';

const adapter = new SQLiteAdapter({
  dbName: "WatermelonDemo",
  schema: mySchema
});

const database = new Database({
  adapter,
  modelClasses: [
    Todo
  ],
  actionsEnabled: true,
})

export default class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = { todos: '', text: '', title: 'Todo List' };
    this.addRecord = this.addRecord.bind(this)
    this.deleteRecord = this.deleteRecord.bind(this)
  }
  
  async addRecord(){
    const todosCollection = database.collections.get("todos");
    
    const name = this.state.text;
    await database.action(async () => {
      const newTodo = await todosCollection.create(todo => {
        todo.name = name
        const allPosts = await todosCollection.query().fetch();
        this.setState({ something: 'changed' });
      })
    })
    this.setState({ text : '' })
    
    console.log("todos", allPosts);  
    this.setState({title : 'TodoList!'})
  }
  
  async deleteRecord(post){
    console.log("dele", post.name)
    const todosCollection = database.collections.get("todos");
    // const post = await todosCollection.find(id)
    await database.action(async () => {
      await post.markAsDeleted() // syncable
    })
  }
  
  async componentDidMount(){
    const todosCollection = database.collections.get("todos");
    const allPosts = await todosCollection.query().fetch();
    this.setState({ todos : allPosts })
    console.log(this.state.todos)
    _.map(this.state.todos, (todo) => {
      {/* <Text>{todo.name}</Text> */ }
      { console.log(todo) }
      { console.log(todo.name) }
    })
    // const todosCollection = database.collections.get("todos");
    // console.log("mount");
    // console.log(allPosts);
    // console.log(database.collections.get("todos"));
    // console.log(database.collections.get("todos").query().fetch());
    // console.log('1');
    // console.log(todosCollection);  
  }
  
  
  
  
  render() {
    const todosCollection = database.collections.get("todos");
    
    const TodoSingle = ({ todo }) => {
      return <View>
      <Text style={styles.instructions}>{todo.name}</Text>
      <Button onPress={() => this.deleteRecord(todo)} title="Delete"/>
      </View>
    }
    
    const enhance = withObservables(['todo'], ({ todo }) => ({
      todo: todo.observe()
    }))
    
    const EnhancedTodo = enhance(TodoSingle)
    
    return (
      <View style={styles.container}>
        <Text>{this.state.title}</Text>
        <TextInput
          placeholder="Enter todo"
          style={{ height: 40, width: 200, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={(text) => this.setState({ text : text })}
          value={this.state.text}
          />
        {
          _.map(this.state.todos, function (todo) {
            return <EnhancedTodo
            key={todo.id} 
            todo={todo} 
            style={styles.container}
            />
          })
        }
        <Button onPress={this.addRecord.bind()} title="Add Todo!" />
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
      margin: 5,
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
  