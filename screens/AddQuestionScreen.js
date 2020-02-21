import React, { Component } from 'react';
import { Text, TouchableOpacity, View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { saveCard } from '../utils/api';
import { addCard } from '../actions';
import styles from '../assets/styles';

export class AddQuestionScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            answer: '',
            saving: false,
            error: ''
        }
    }

    save = () => {
        const { question, answer, errors, saving } = this.state;
        
        if(question === '' || answer === '') {
            this.setState({ error: 'You must fill the question and answer fields.'})
            return;
        }
        
        this.setState({saving: true, error: ''})
        
        const { dispatch, navigation, deck } = this.props;
        
        const key = deck.title
        const card = {
            question,
            answer,
        };

        dispatch(addCard(key, card))

        saveCard(key, card)
            .then(() => {
                this.setState(() => ({ 
                    question: '',
                    answer: '',
                    saving: false,
                }));
                navigation.navigate('Deck', { title: key })
            });
    }

    render() {
        const { saving, error } = this.state;

        return (
            <View style={styles.container}>
                <View style={ styles.formgroup }>
                    <TextInput 
                        style={styles.input}
                        placeholder="Question"
                        onChangeText={(question) => this.setState({question, error: ''})}
                        value={this.state.question}
                    />
                </View>
                <View style={ styles.formgroup }>
                    <TextInput 
                        style={styles.input}
                        placeholder="Answer"
                        onChangeText={(answer) => this.setState({answer, error: ''})}
                        value={this.state.answer}
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
        )
    }
}

AddQuestionScreen.navigationOptions = {
    title: 'Add Card',
    headerTintColor: 'white',
    headerStyle: {
      backgroundColor: 'cornflowerblue'
    }
};  

const mapStateToProps = (state, { navigation }) => {
    return {
        deck: navigation.getParam('deck')
    }
}

export default connect(mapStateToProps)(AddQuestionScreen);
