import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, View, Text } from 'react-native';
import { removeDecksFromStorage, populateDecks } from '../utils/api';
import { removeDecks, receiveDecks } from '../actions';
import styles from '../assets/styles';

export class SettingsScreen extends Component {

  clear = () => {
    const { dispatch, navigation } = this.props;
    dispatch(removeDecks());
    removeDecksFromStorage().then(() => {
      navigation.navigate('Home');
    })
  }

  add = () => {
    const { dispatch, navigation } = this.props;
    populateDecks().then(decks => {
      dispatch(receiveDecks(decks));
      navigation.navigate('Home');
    })
  }

  render() {
    return (
      <View style={ styles.container }>
        <View style={ styles.row }>
          <Text>Click button to remove data from local storage.</Text>
        </View>
        <View style={ [ styles.row, styles.spaceY ] }>
            <TouchableOpacity style={ [styles.button, styles.buttonPrimary] }
                onPress={() => this.clear()}
            >
                <Text style={ styles.buttonText }>Clear stored data</Text>
            </TouchableOpacity>
        </View> 
        <View style={ styles.row }>
        <Text>Click button to add dummy data to local storage.</Text>
        </View>
        <View style={ [ styles.row, styles.spaceY ] }>
            <TouchableOpacity style={ [styles.button, styles.buttonPrimary] }
                onPress={() => this.add()}
            >
                <Text style={ styles.buttonText }>Add Dummy Data</Text>
            </TouchableOpacity>
        </View> 
      </View>
    )
  }
}

SettingsScreen.navigationOptions = {
  title: 'Settings',
  headerTintColor: 'white',
  headerStyle: {
    backgroundColor: 'cornflowerblue'
  }
};

const mapStateToProps = state => {
  return {
    decks: state,
  }
}

export default connect(mapStateToProps)(SettingsScreen);
