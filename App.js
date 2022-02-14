import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button } from 'react-native';

export default function App() {
  let result = undefined;
  const [answer, setAnswer] = useState(0);
  let buttonLogic = (button) => {
    let operators = ['+', '-', '×', '÷', '/', '*', '.'];
    let operatorObj = {
      '×': '*',
      '÷': '/'
    };
    switch (button) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        result = (answer == 0 && !String(answer).includes('.')) ? button : answer + button;
        setAnswer(result);
        break;
      case '+':
      case '-':
      case '×':
      case '÷':
        let lastSymbol = String(answer).split('').pop();
        result = (operators.includes(lastSymbol)) ? answer.substring(0, answer.length - 1) + button : answer + button;
        setAnswer(result)
        break;
      case '.':
        let answerNumberArray = String(answer).split(/\+|\-|\×|\÷/);
        if (answerNumberArray[answerNumberArray.length - 1].includes('.')) {
          result = answer;
        }
        else {
          lastSymbol = String(answer).split('').pop();
          result = (lastSymbol != '.') ? answer + button : answer.substring(0, answer.length - 1) + button;
        }
        setAnswer(result);
        break;
      case '±':
        answerNumberArray = String(answer).split(/\+|\-|\×|\÷/);
        console.log(answerNumberArray[answerNumberArray.length - 1]*-1, String(answerNumberArray[answerNumberArray.length - 1]).length);
        console.log(String(answer).slice(0, answer.length - String(answerNumberArray[answerNumberArray.length - 1]).length).concat(answerNumberArray[answerNumberArray.length - 1]*-1));
        result = String(answer).slice(0, answer.length - String(answerNumberArray[answerNumberArray.length - 1]).length).concat(answerNumberArray[answerNumberArray.length - 1]*-1);
        setAnswer(result);
        break;
      case '=':
        result = String(answer).replace(/×|÷/g, function(operator){
          return operatorObj[operator];
        });
        lastSymbol = result.split('').pop();
        result = (operators.includes(lastSymbol)) ? result.substring(0, result.length - 1) : result;
        setAnswer(Math.round(eval(result) * Math.pow(10, 9)) / Math.pow(10, 9));
        break;
      case '%':
        console.log(eval(1))
        break;
      case 'AC':
        setAnswer(0);
        break;
    }
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.answerInterface}>
        <Text style={styles.answer}>{answer}</Text>
      </View>
      <MainInterface buttonLogic={buttonLogic}/>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const MainInterface = (props) => {
  let buttonsArray = [["AC", "±", "%", "÷"], /*["mc", "mr", "m-", "m+"],*/
  ["7", "8", "9", "×"], ["4", "5", "6", '-'], ["1", "2", "3", "+"], 
  ["0", ".", "="]];

  let renderButton = buttonsArray.map((array, index) => {
    let buttonBlock = array.map(button => {
      return (
        <View key={button} style={styles.buttonBox}>
          <Button 
            title = {button}
            onPress = {() => props.buttonLogic(button)}
          />
        </View>
      )
    })
    return (
      <View style={styles.buttonRow} key={index}>{buttonBlock}</View>
    )
  })
  return (
    <View style={styles.mainInterface}>{renderButton}</View>
  )
}

const styles = StyleSheet.create({
  fuckingFuck: {
    color: 'white',
  },
  answerInterface: {
    flex: 1,
    width: '100%',
  },
  mainInterface: {
    flex: 2.5,
    width: "100%"
  },
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  buttonItem: {
    flex: 1,
    color: "white",
    textAlign: 'center',
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
  },
  buttonBox: {
    flex: 1,
    borderColor: 'white',
    borderWidth: 1,
  },
  button: {
    color: "white",
  },
  answer: {
    position: 'absolute',
    color: "white",
    bottom: "20%",
    right: "5%",
    fontSize: 40,
  }
});
