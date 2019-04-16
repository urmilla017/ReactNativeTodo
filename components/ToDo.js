import React, {Component} from 'react';
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  TouchableOpacity
} from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from './styles';

export default class ToDo extends Component {
  state = {
    text: '',
    listItems: [],
  }

  onTextInputChange = (value) => {
    this.setState({text: value});
  }

  onAddItemToState = () => {
    if (this.state.text.trim() === '') {
      return;
    }
    this.setState(previousState => {
      return {
        listItems: previousState.listItems.concat({
          key: Math.random(), value: previousState.text
        })
      }
    });
    this.setState({ text: '' });
  }

  onDisplayDataInFlatlist = () => {
    return (
      <FlatList
        style={styles.flatListContainer}
        data={this.state.listItems}
        keyExtractor={
          (item, index) => index.toString()
        }
        renderItem={
          list => (
            <View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <View style = { styles.listItemStyle }>
                  <Text>{list.item.value}</Text>
                </View>

                <TouchableOpacity
                  style={styles.deletebuttonStyle}
                  onPress={() => this.onDeleteItemFromFlatlist(list.item.key)}
                >
                  <EvilIcons name="trash" size={30} color="#696969" />
                </TouchableOpacity>
              </View>

              <View style={{  borderBottomColor: '#cfcfcf', borderBottomWidth: 1 }}/>
            </View>
          )
        }
      />
    )
  }

  onDeleteItemFromFlatlist = (key) => {
    this.setState(previousState => {
      return {
        listItems: previousState.listItems.filter(place => {
          return place.key !== key;
        })
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Things To Do</Text>
        </View>

        <View style = { styles.inputButtonContainer }>
          <TextInput
            placeholder='Type...'
            style={styles.inputTextbox}
            value={this.state.text}
            onChangeText={(text) => this.onTextInputChange(text)}
          />
          <TouchableOpacity
            style={styles.addButtonStyle}
            onPress={() => this.onAddItemToState()}
          >
            <Ionicons name="md-add" size={40} color="#3686ff" />
          </TouchableOpacity>
        </View>

        <View style={styles.flatListContainer}>
          {this.onDisplayDataInFlatlist()}
        </View>
      </View>
    );
  }
}
