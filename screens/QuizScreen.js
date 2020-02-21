import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Button } from 'react-native';
import { connect } from 'react-redux';
import styles from '../assets/styles';
import { clearLocalNotification } from './utils/helpers';

export class QuizScreen extends Component {
  constructor(props) {
      super(props);
      this.state = {
        correct: 0,
        completed: false,
        showAnswer: false,
        current: 0,
      }
  }

  componentDidMount() {
    const {deck} = this.props
    clearLocalNotification();
  }

  // Answer a question
  answer = (type) => {
    const { deck } = this.props;

      if(type === 'correct') {
          this.setState({
              correct: this.state.correct + 1,
          })
      }

      if(this.state.current < deck.questions.length - 1) {
          this.setState({
              current: this.state.current + 1,
          })
      } else {
          this.setState({
              completed: true,
          })
      }
  }

  getStats = () => {
      const { correct } = this.state;
      const { deck } = this.props;
      const length = deck.questions.length;
      const percent = (correct / length) * 100;

      return `You answered ${correct}/${length} correctly (${percent}%).`;
  }

  // Restart the quiz
  restart = () => {
      this.setState({
          correct: 0,
          completed: false,
          showAnswer: false,
          current: 0,
      });
  }

  quit = () => {
      const { deck, navigation } = this.props;
      this.restart();
      navigation.navigate('Deck', { deck })
  }
  
  render() {
    const { current, completed } = this.state;
    const { deck } = this.props;
    const card = deck.questions[current];
    
    return (
      <View style={styles.container}>
        { completed ? (
          <View>
            <View style={ styles.row }>
              <Text style={ styles.title }>Completed.</Text>
              <Text style={ styles.subtitle }>{ this.getStats() }</Text>
            </View>
            <View style={ [ styles.row, styles.spaceY ] }>
                <TouchableOpacity style={ [styles.button, styles.buttonPrimary] }
                    onPress={() => this.restart()}
                >
                    <Text style={ styles.buttonText }>Restart</Text>
                </TouchableOpacity>
            </View> 
            <View style={ [ styles.row, styles.spaceY ] }>
                <TouchableOpacity style={ [styles.button, styles.buttonPrimary] }
                    onPress={() => this.quit()}
                >
                    <Text style={ styles.buttonText }>Exit</Text>
                </TouchableOpacity>
            </View> 
        </View>
        ) : (
          <View>
            <View style={ [ styles.card ] }>
              <Text style={ styles.subtitle }>{ ! this.state.showAnswer ? card.question : card.answer }</Text>
            </View>

            <View style={ [ styles.row, styles.spaceY] }>
                <TouchableOpacity style={ [styles.button, styles.buttonPrimary] } onPress={() => this.answer('correct')}>
                    <Text style={ styles.buttonText }>Correct</Text>
                </TouchableOpacity>
            </View>
            <View style={ [ styles.row, styles.spaceY] }>
                <TouchableOpacity style={ [styles.button, styles.buttonPrimary] } onPress={() => this.answer('incorrect')}>
                    <Text style={ styles.buttonText }>Incorrect</Text>
                </TouchableOpacity>
            </View>
            <View style={ [ styles.row, styles.spaceY] }>
                <TouchableOpacity style={ [styles.button, styles.buttonPrimary] } onPress={() => this.setState({ showAnswer: ! this.state.showAnswer })}>
                    <Text style={ styles.buttonText }>Show { this.state.showAnswer ? 'Question' : 'Answer' }</Text>
                </TouchableOpacity>
            </View>
        </View>
        ) }
      </View>
    );
  }
}

QuizScreen.navigationOptions = {
  title: 'Quiz',
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

export default connect(mapStateToProps)(QuizScreen);