import React from "react"
import mooMp3 from "./sounds/moo.mp3"
import cowbellMp3 from "./sounds/cowbell.mp3"
import cowPng from "./cow.png"


class App extends React.Component {
  
  render() {
    return (
        <div id = "app"
        style={{
          backgroundImage: "url(/background.jpg)"
        }}>
          <Calculator />  
            <img id = "cow"
            src={cowPng}
            alt="cow"/>
          <div id= "cow-cover">
            <h2 id="title">COWculator</h2>
            <h4 id ="get-it">(get it?)</h4>
          </div>
        </div>

    )
  }
}

class Cow extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div id="cow">
          <img src={cowPng}
          alt="cow"></img>
        </div>
    )
  }
}



class Calculator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {display: "0", lastChar: "", decimalCount: 0, calculationComplete: true}
    this.updateDisplay = this.updateDisplay.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleDigit = this.handleDigit.bind(this)
    this.handleMinus = this.handleMinus.bind(this)
    this.handleOperator = this.handleOperator.bind(this)
    this.animateCow = this.animateCow.bind(this)
    this.symbols = ["+", "-", "/", "*"]
    this.id = null
  }
  
  componentDidMount () {
    const calculator = document.getElementById("calculator")
    calculator.addEventListener("keydown", this.handleKeyDown);
    calculator.addEventListener("click", this.handleClick);
  }

  updateDisplay(char) {
    // handle clear
    if (char === "C" && this.state.display !== "0") {
      this.setState({display: "0", lastChar: "", decimalCount: 0})
    }  
    // handle digits
    const digits = ["0", "1", "2" ,"3" ,"4", "5", "6", "7", "8", "9"]
    if (digits.includes(char) ) {
      this.handleDigit(char)
    }  
    // handle minus
    else if ( char === "-") {
      this.handleMinus();
    }
    // handle decimal
    else if ( char === ".") {
      this.handleDecimal();
    }
    // handle operator (not minus)
    else if ( char === "/" || char === "*" || char === "+") {
      this.handleOperator(char);
    }
    // handle equals
    else if (char === "=") {
      let result = calculate.getResult(this.state.display);
      this.setState({display: result, calculationComplete: true});  
      this.animateCow();
      const moo = new Audio(mooMp3);
      moo.play()
    }
        
  }

  handleDecimal() {
    
    // don't add to the end of the display
    if (this.state.display.length >= 19) {
      return;
    }
    const digits = ["0", "1", "2" ,"3" ,"4", "5", "6", "7", "8", "9"]
    const operators = ["+", "*", "/", "-"]
    const display = this.state.display
    // if lastChar is a decimal, do nothing
    if (this.state.lastChar === ".") {
      return
    }
    // if display is clear, or if display is showing the result of the previous calculation, do this

    if (this.state.display === "0" || this.state.calculationComplete === true ) {
      this.setState({display: "0.", lastChar: ".", decimalCount: 1, calculationComplete: false})
      return
    }
    // lastChar is a  digits or allowed symbols, do this:
    if (digits.includes(this.state.lastChar) && this.state.decimalCount === 0) {
      this.setState({display: display + ".", lastChar: ".", decimalCount: 1})
      return
    }
    // if lastChar is an operator, do this
    if (operators.includes(this.state.lastChar) ) {
      this.setState({display: display + "0.", lastChar: ".", decimalCount: 1})
      return
    }
  }

  handleMinus() {
     // don't add to the end of the display
    if (this.state.display.length >= 19) {
      return;
    }
    const digits = ["0", "1", "2" ,"3" ,"4", "5", "6", "7", "8", "9"]
    const allowedSymbols = ["+", "*", "/"]
    const display = this.state.display
    // if display is clear, do this
    if (this.state.display === "0") {
      this.setState({display: "-", lastChar: "-", decimalCount: 0})
      return
    }
   
    // lastChar is a  digits or allowed symbols, do this:
    if (digits.includes(this.state.lastChar) || allowedSymbols.includes(this.state.lastChar) ) {
      this.setState({display: display + "-", lastChar: "-", decimalCount: 0})
      return
    }
   
    // display is longer than 1 char, assign value to penultimateChar
    if (display.length > 1 ) {
      const penultimateChar = display[display.length-2]  
      // last char is minus, and previous is not minus
      if (this.state.lastChar === "-" && penultimateChar !== "-") {
        this.setState({display: display + "-", lastChar: "-", decimalCount: 0})
      }
    }
   
  }
  handleDigit(digit) {
    // play cowbell sound
    const cowbell = new Audio(cowbellMp3);
    cowbell.play()
    let display = this.state.display;
    // don't add to the end of the display
    if (this.state.display.length >= 19) {
      return;
    } 
    const digits = ["0", "1", "2" ,"3" ,"4", "5", "6", "7", "8", "9"]
    const allowedSymbols = ["+", "-", "*", "/", "."]
    //digit = parseInt(digit)
    // if display is default "0",
    // of if the display is currently showing the result of the
    // previous calculation (which should said the variable calculationComplete to true) replace with digit.
    // else add digit to display
    if (this.state.display === "0" || this.state.calculationComplete === true) {
      this.setState({display: digit.toString(), lastChar: digit.toString(), calculationComplete: false })

    }
    
      // this digit is a zero, and lastChar is not a digit (or display length is 
      //1) , do nothing
      else if (digit === "0") {
        if (this.state.lastChar === ".") {
          this.setState({display: display+digit, lastChar:"0"});
        }
        else if (digits.includes(this.state.lastChar) === false ||                 
            this.state.display.lastChar === "") {
            console.log("test your mom") 
            return;
        }   
        else {
          
          this.setState({display: display+digit, lastChar:"0"});
        } 
      } 
               
      else if ( digits.includes(this.state.lastChar) || 
               allowedSymbols.includes(this.state.lastChar) ) {
        console.log("test your other mom")
        let updatedDisplay = this.state.display + digit;
        this.setState({display: updatedDisplay, lastChar: digit})
      }

  }
  animateCow() {
    let id = this.id;
    const cow = document.getElementById("cow");
    let verticalOffset = 0;
    clearInterval(id);
    id = setInterval(moveUp, 10);
    function moveUp(){
      if (verticalOffset === -95) {
        clearInterval(id);
        id = setInterval(moveDown, 7);
      } else {
       verticalOffset -= 1;
        cow.style.transform = "translate(-50%, " + verticalOffset + "%)";
      }
    }

    async function moveDown(){
      await new Promise(r => setTimeout(r, 1300));
      if (verticalOffset === 0) {
        clearInterval(id);
      } else {
        verticalOffset += 1;
        cow.style.transform = "translate(-50%, " + verticalOffset + "%)";
      } 
    }
  }
  handleOperator(char) {
     // don't add to the end of the display
    if (this.state.display.length >= 19) {
      return;
    }
    
    let lastChar = this.state.lastChar
    // if no previous input
    if (lastChar === "0" && this.state.display.length === 1 ) {
      return
    }
    // if last char is a symbol (not minus)
    else if ( (["+","*","/", "."]).includes(lastChar)) {
      return  
    }
      
    // if lastChar is number
    else if ( ([0,1,2,3,4,5,6,7,8,9]).includes(parseInt(lastChar)) ) {
      this.setState({display: this.state.display+ char, decimalCount: 0, lastChar: char})         
    } 
    
    // if last char is minus, and char is plus (to subtract a positive number)
    else if (char === "+" && lastChar === "-") {
      this.setState({display: this.state.display+ char, decimalCount: 0, lastChar: char})
    }
  }
  
  handleKeyDown(e) {
    console.log(e.key);
  }
  
  handleClick(e) {
    let btnVal = e.target.value;
    this.updateDisplay(btnVal);
  }
  
  render() {
    const buttonTexts = [
      "7", "8", "9", "/",
      "4", "5", "6", "*",
      "1", "2", "3", "-",
      "0", ".", "=", "+"
    ]
    const buttonIds = [
      "seven", "eight", "nine", "divide",
      "four", "five", "six", "multiply", 
      "one", "two", "three", "subtract",
      "zero", "decimal", "equals", "add"
    ]
    const buttons = buttonIds.map( (id, index) => 
        <Button id={id} 
          text={buttonTexts[index]}
          display={this.display}
          upddateDisplay={this.updateDisplay}/>
    );
    
    return (
      <div id = "calculator">
        <Button text="C" id="clear"/>
          <Display display={this.state.display}/> 
          {buttons}
        </div>
    )
  }
  
}

class Button extends React.Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div className = "button-container"  >
        <button className = "button"
                id = {this.props.id}
                value = {this.props.text}>
          {this.props.text}
        </button>
       
      </div>
    )
  }
  
}
  
class Display extends React.Component {
  constructor(props) {
    super(props)
    this.state = {display: ""}
    
  }
  
  render() {
    return (
      <div id = "display">{this.props.display}</div>
    )
  }
  
}

const calculate = {
  digits: ["0", "1", "2" ,"3" ,"4", "5", "6", "7", "8", "9"],
  symbols: ["+", "-", "*", "/"],
  maxDecs: 0,
  values: [],
  operators: [],
  getResult: function(str) {
    this.deconstructValuesAndOperators(str);
    this.consolidateValues();
    this.values = this.removeDecimals(this.values);
    // console.log("values before addSubtract: " );
    // console.log(this.values);
    let result = this.addSubtract() ;
    if (this.maxDecs > 0 ) {
      result = result/(10 ** this.maxDecs);
      this.maxDecs = 0;
    }
    return result;
    
  },
  deconstructValuesAndOperators: function (str) {
    let newVal = "";
    let newOp = "";
    let values = [];
    let operators = [];
    //separate string into array of values and operators 
    for (let c =0; c<str.length; c += 1) {
      let char = str[c];
      if (this.digits.includes(char) || char === ".") {
        
        if (newOp !== "") {
          operators.push(newOp);
          newOp = "";
        }
        newVal += char
      }
      else if (this.symbols.includes(char) ) {
        if (newVal !== "") {
          values.push(newVal);
          newVal = "";
        }
        if (newOp === "") {
          newOp += char
        }
        else if (newOp.length === 1) {
          if (char === "-" && !this.symbols.includes(str[c+1]) ){
            newVal = "-";
          }
          else {
            newOp = char;
          }
        }
      }
    }
    values.push(newVal);
    this.values = values;
    this.operators = operators;
    // console.log("values: " + values);
    // console.log("operators: " + operators);
  },
  removeDecimals: function(arr) {
    // Remove decimals from values by multiplying my a factor of 10
    // Find value with highest number of decimal places:
    for (let v = 0; v < arr.length; v += 1) {
      let numDecs = 0
      let thisValue = arr[v].toString();
      let decIndex = thisValue.indexOf(".");
      if (decIndex >=0 ) {
        let lastIndex = arr[v].length - 1;
        numDecs = lastIndex - decIndex;
        if (numDecs > this.maxDecs) {
          this.maxDecs = numDecs;
        } 
      }
    }
    // multiply all values by maxDecs
    let newArr = arr;
    if (this.maxDecs > 0) {
      for (let v = 0; v < newArr.length; v +=1 ) {
      newArr[v] = newArr[v] * 10** this.maxDecs;
      newArr[v] = newArr[v].toString()
      }
    }
    
    return newArr;
  },
  combineTerms(val1, val2, operation) {
    let newVal;
    if (operation === "times") {
      if (val1.indexOf(".") >=0 || val2.indexOf(".") >=0 ) {
        val1 = parseFloat(val1)
      }
      newVal = (val1 * val2 );  
    } else if (operation === "divide") {
      if (val1 % val2 !== 0) {
        val1 = parseFloat(val1)
      }
      newVal = (val1 / val2 );
    }
    return newVal.toString();
  },
  consolidateValues() { 
    // search for * and / operations
    let opIndex = -1;
    let operation = ""
    let multiplyIndex = this.operators.indexOf("*");
    let divideIndex = this.operators.indexOf("/");
    while (multiplyIndex >= 0 || divideIndex >= 0) {
      multiplyIndex = this.operators.indexOf("*");
      divideIndex = this.operators.indexOf("/");
      if (multiplyIndex >= 0 ) {
        opIndex = multiplyIndex;
        operation = "times"
      }
      else if (divideIndex >= 0) {
        opIndex = divideIndex;
        operation = "divide"
      }
      else {
        continue;
      }
      // calculate the newVal
      let val1 = this.values[opIndex]
      let val2 = this.values[opIndex+1]
      let newVal = this.combineTerms(val1, val2, operation);
      // update the arrays
      this.updateArrays(opIndex, newVal);
      
    }
      
  },
  updateArrays(opIndex, newVal) {
    let newValArr = [];
    let newOpArr = [];
    let i = 0;
    // consolidates the terms before and after the index of *
    while (i < this.values.length) {
      if (i === opIndex) {
       newValArr.push(newVal)
       i += 2;
      } else {
        newValArr.push(this.values[i]);
        i += 1;
      }
      
    }
    this.values = newValArr;
    this.operators.splice(opIndex, 1);
    // console.log("values: " + this.values);
    // console.log("operators: " + this.operators);
  },
  
  addSubtract: function() {
    let result = parseInt(this.values.shift() );
    while (this.values.length > 0) {
      let nextVal = parseInt(this.values.shift() );
      let nextOp = this.operators.shift() ;
      if (nextOp === "+") {
        result += nextVal
      }   
      else if (nextOp === "-" ) {
       result -= nextVal
      } 
    }   
    return result;
       
    }
  

}

const test = function () {
  let failCount = 0;
  const testCases = [
    ["6+3-4+10-15+157-57", 100],
    ["10+10-20-10", -10],
    ["5--3", 8],
    ["2+-1", 1],
    ["2.5+2.5-4.5", 0.5],
    ["2.001+3-5+5-25", -19.999],
    ["7.2-0.004+53.68", 60.876],
    ["35*3", 105],
    ["6/3", 2],
    ["4-2*2+57", 57],
    ["30-15/3+4", 29],
    ["5*3+20/4", 20],
    ["6/2+2*6-10", 5],
    ["4*2+3*5+2*3", 29 ],
    ["18/6+5*5-70/35", 26],
    ["8/-4", -2],
    ["2*-3", -6],
    ["2*-2+4/2+6*5+2*-4", 20],
    ["3+5*6-2/4", 32.5],
    ["7/3", 2.333333333333333333],
    ["5*5.5", 27.5],
    ["5*-+5", 10]
    
  ]
  
  for (let t=0; t < testCases.length; t += 1 ) {
    if (calculate.getResult(testCases[t][0]) !== testCases[t][1] ) {
       console.log("test" + t.toString() +  " failed");  
       console.log("input: " + testCases[t][0] + " expected result: " + testCases[t][1]);
       console.log("actual result: " + calculate.getResult(testCases[t][0]));
      failCount +=1 ;
     
    } else {
      console.log("test" + t.toString() +  " passed")
    }
  }
  console.log("failCount: " + failCount)
  
}


test();

// ReactDOM.render(<Calculator />, document. getElementById('app'))

export default App;
