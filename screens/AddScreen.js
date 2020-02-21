import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { saveDeck } from '../utils/api';
import styles from '../assets/styles';

export class AddScreen extends Component {
  constructor(props) {
      super(props);
      this.state = {
          title: '',
          saving: false,
          error: '',
      }
  }

  save = () => {
    if(this.state.title === '') {
      this.setState({error: 'Deck title cannot be empty'})
      return;
    }

    this.setState({saving: true})

    const { dispatch, navigation } = this.props;
    const key = this.state.title;
    const deck = {
      title: key,
      questions: [],
    }
    
    dispatch(addDeck(key, deck))

    saveDeck(key, deck)
      .then(() => {
        this.setState(() => ({ 
            title: '',
            saving: false,
        }));
        navigation.navigate('Home')
      });
  }
  
  render() {
    const { saving, error } = this.state;

    return (
      <View style={styles.container}>
          <View style={ styles.formgroup }>
            <TextInput 
              style={styles.input}
              placeholder="Deck title"
              onChangeText={(title) => this.setState({title, error: ''})}
              value={this.state.title}
              />
          </View>
          {error !== '' && <Text style={styles.inputError}>{ error }</Text>}
          <View style={ [ styles.row, styles.spaceY ] }>
              <TouchableOpacity style={ [styles.button, styles.buttonPrimary] }
                  disabled={saving}
                  onPress={() => this.save()}
              >
                  <Text style={ styles.buttonText }>Save Card</Text>
              </TouchableOpacity>
          </View> 
      </View>
    );
  }
}

AddScreen.navigationOptions = {
  title: 'Create Deck',
  headerTintColor: 'white',
  headerStyle: {
    backgroundColor: 'cornflowerblue'
  }
};

export default connect()(AddScreen);