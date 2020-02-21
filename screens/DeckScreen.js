import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import styles from '../assets/styles';

class DeckScreen extends Component {
    render() {
        const { deck, navigation } = this.props;
        return (
            <View style={ styles.container }>
                <View style={ styles.row }>
                    <Text style={ styles.title }>{ deck.title }</Text>     
                    <Text style={ styles.subtitle }>{ deck.questions.length } cards</Text>
                </View>    
                
                { deck.questions.length > 0 && (
                    <View style={ [ styles.row, styles.spaceY ] }>
                        <TouchableOpacity style={ [styles.button, styles.buttonPrimary] }
                            onPress={() => navigation.navigate('Quiz', { deck })}
                        >
                            <Text style={ styles.buttonText }>Start Quiz</Text>
                        </TouchableOpacity>
                    </View>
                )} 

                <View style={ [ styles.row, styles.spaceY ] }>
                    <TouchableOpacity style={ [styles.button, styles.buttonPrimary] }
                        onPress={() => navigation.navigate('AddQuestion', { deck })}
                    >
                        <Text style={ styles.buttonText }>Add Question</Text>
                    </TouchableOpacity>
                </View>                
            </View>
        );
    }
}

DeckScreen.navigationOptions = {
    title: 'Deck',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: 'cornflowerblue'
    }
};

const mapStateToProps = (state, { navigation }) => {
    return {
        deck: state[navigation.getParam('title')],
        decks: state,
    }
}

export default connect(mapStateToProps)(DeckScreen);