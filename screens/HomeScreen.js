import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';

import { connect } from 'react-redux';
import { receiveDecks } from '../actions';
import { getDecks } from '../utils/api';
import styles from '../assets/styles';

class HomeScreen extends Component {
  componentDidMount() {
    getDecks().then(decks => {
      this.props.dispatch(receiveDecks(decks))
    })
  }
  render () {
    const { decks, navigation } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          data={Object.values(decks)}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Deck', { title: item.title })}>
              <View>
                <Text style={ styles.title }>{ item.title }</Text>
                <Text style={ styles.subtitle }>{ item.questions.length } questions</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.title}
        />    
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    decks: state,
  }
}

HomeScreen.navigationOptions = {
  title: 'Decks',
  headerTintColor: 'white',
  headerStyle: {
    backgroundColor: 'cornflowerblue'
  }
};
export default connect(mapStateToProps)(HomeScreen);
