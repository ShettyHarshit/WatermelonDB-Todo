import React, { Component } from 'react';
import { ScrollView, StyleSheet } from "react-native";
import { getTodos, addTodo, deleteTodo } from './src/model/crud';
import { View, TextInput, Row, Icon, Button, Text } from "@shoutem/ui";
import TileHeader from "./src/components/Header";
// import withObservables from "@nozbe/with-observables";
import _ from 'lodash';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { todos: '', text: '', title: 'Todo List' };
    this.addRecord = this.addRecord.bind(this)
    this.deleteRecord = this.deleteRecord.bind(this)
  }

  async addRecord() {
    this.setState({ todos: await addTodo(this.state.text) });
    this.setState({ text: '' })
  }

  async deleteRecord(post) {
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
            return <TodoSingle key={todo.id} todo={todo} />
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