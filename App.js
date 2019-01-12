import React, { Component } from 'react';
import { ScrollView, StyleSheet } from "react-native";
import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { mySchema } from "./src/model/schema";
import Todo from './src/model/Todo';
import { getTodos, addTodo, deleteTodo } from './src/model/crud';
import {
  View,
  TextInput,
  Row,
  Icon,
  Button,
  Text,
} from "@shoutem/ui";
import TileHeader from "./src/components/Header";
// import withObservables from "@nozbe/with-observables";
import _ from 'lodash';

// const adapter = new SQLiteAdapter({
//   dbName: "WatermelonDemo",
//   schema: mySchema
// });

// const database = new Database({
//   adapter,
//   modelClasses: [
//     Todo
//   ],
//   actionsEnabled: true,
// })

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { todos: '', text: '', title: 'Todo List' };
    // this.addRecord = this.addRecord.bind(this)
    // this.deleteRecord = this.deleteRecord.bind(this)
  }

  async addRecord() {
    // const todosCollection = database.collections.get("todos");

    // const name = this.state.text;
    // await database.action(async () => {
    //   const newTodo = await todosCollection.create(todo => {
    //     todo.name = name
    //     const allPosts = todosCollection.query().fetch();
    //     this.setState({ something: 'changed' });
    //     this.forceUpdate();
    //   })
    // })
    // this.forceUpdate();
    // this.setState({ text: '' })
    // this.setState({ title: 'TodoList!' })
    // const updatedTodos = await database.collections.get("todos")
    // const allPosts = await updatedTodos.query().fetch();
    // await this.setState({ todos: allPosts })
    // _.map(await addTodo("Refactor"), todo => {
    //   {
    //     console.log(todo.name);
    //   }
    // });
    this.setState({ todos: await addTodo(this.state.text) });
    this.setState({ text: '' })
    
  }

  async deleteRecord(post) {
    // console.log("dele", post.name)
    // const todosCollection = database.collections.get("todos");
    // // const post = await todosCollection.find(id)
    // await database.action(async () => {
    //   await post.markAsDeleted() // syncable
    // })
    // const updatedTodos = await database.collections.get("todos")
    // const allPosts = await updatedTodos.query().fetch();
    // await this.setState({ todos: allPosts })
    this.setState({ todos: await deleteTodo(post) })

  }

  async componentDidMount() {
    this.setState({ todos: await getTodos() });
  }

  render() {
    const List = () => {
      return <View>
        {
          _.map(this.state.todos, function (todo) {
            return <TodoSingle
              key={todo.id}
              todo={todo}
            />
          })
        }
      </View>
    }
    

    const TodoSingle = ({ todo }) => {
      return <View>
        <Row styleName="small">
          <Icon name="right-arrow" />
          <Text>{todo.name}</Text>
          <Button onPress={() => this.deleteRecord(todo)} title="" styleName="right-icon">
            <Icon name="close" styleName="right-icon" />
          </Button>
        </Row>
      </View>;
    }

    // const enhance = withObservables(['todo'], ({ todo }) => ({
    //   todo: todo.observe()
    // }))

    // const EnhancedTodo = enhance(TodoSingle)

    return <ScrollView keyboardShouldPersistTaps='always' keyboardDismissMode='on-drag'>
      <TileHeader />
      <TextInput placeholder="Enter todo" onChangeText={text => this.setState(
        { text: text }
      )} value={this.state.text} style={styles.tb} />
      <Row>
        <Button onPress={this.addRecord.bind()} styleName="secondary confirmation">
          <Icon name="plus-button" />
          <Text>Add Todo</Text>
        </Button>
      </Row>
      <List />
    </ScrollView>;
  }
}

const styles = StyleSheet.create({
  tb: {
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 10,
    marginTop: 10
  },
});