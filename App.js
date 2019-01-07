import React, { Component } from 'react';
import { ScrollView, StyleSheet } from "react-native";
import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { mySchema } from "./src/model/schema";
import Todo from './src/model/Todo';
import {
  View,
  Title,
  TextInput,
  Row,
  ImageBackground,
  Icon,
  Button,
  Text,
  Heading,
  Overlay,
  Tile
} from "@shoutem/ui";
import TileHeader from "./src/components/Header";
// import withObservables from "@nozbe/with-observables";
import _ from 'lodash';
// import 'es6-symbol/implement';
// import 'core-js/es6/symbol';
// import 'core-js/fn/symbol/iterator';
// import 'core-js/es6/set';

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

  async addRecord() {
    const todosCollection = database.collections.get("todos");

    const name = this.state.text;
    await database.action(async () => {
      const newTodo = await todosCollection.create(todo => {
        todo.name = name
        const allPosts = todosCollection.query().fetch();
        this.setState({ something: 'changed' });
        this.forceUpdate();
      })
    })
    this.forceUpdate();
    this.setState({ text: '' })
    this.setState({ title: 'TodoList!' })
    console.log("updated", database.collections.get("todos"));
    const updatedTodos = await database.collections.get("todos")
    const allPosts = await updatedTodos.query().fetch();
    console.log("updatedTodes", allPosts);
    await this.setState({ todos: allPosts })
    console.log(this.state.todos);

  }

  async deleteRecord(post) {
    console.log("dele", post.name)
    const todosCollection = database.collections.get("todos");
    // const post = await todosCollection.find(id)
    await database.action(async () => {
      await post.markAsDeleted() // syncable
    })
    const updatedTodos = await database.collections.get("todos")
    const allPosts = await updatedTodos.query().fetch();
    console.log("updatedTodes", allPosts);
    await this.setState({ todos: allPosts })
    console.log(this.state.todos);
  }

  async componentDidMount() {
    const todosCollection = database.collections.get("todos");
    const allPosts = await todosCollection.query().fetch();
    this.setState({ todos: allPosts })
    _.map(this.state.todos, (todo) => {
      { console.log(todo.name) }
    })
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
          {/* <Image styleName="small-avatar" source={{ uri: "https://shoutem.github.io/img/ui-toolkit/examples/image-9.png" }} /> */}
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

    return <ScrollView>
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