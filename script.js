const result = document.getElementById("result");

result.addEventListener("input", function() {
    this.value = this.value.replace(/[^0-9]/g, "");
});

const ops = {
  plus: (a, b) => a + b,
  minus: (a, b) => a - b,
  times: (a, b) => a * b,
  divide: (a, b) => a / b
};

const keyToButtonIdMap = {
    '+': 'plus',
    '-': 'minus',
    '*': 'times',
    '/': 'divide',
    '=': 'equals',
    'Enter': 'equals',
    'c': 'clear'
};

let current_op = 'identity';
let first_num = null;
let justOped = false;

function clearText() {
  result.value = '';
}

const num_buttons = document.getElementsByClassName('number');

Array.from(num_buttons).forEach(button => {
  button.addEventListener('click', function() {
    if (justOped) {
      clearText();
      justOped = false;
    }
    result.value += this.textContent;
  });
});

const clear = document.getElementById('clear');
clear.addEventListener('click', clearText);

Object.keys(ops).forEach(op => {
  document.getElementById(op).addEventListener('click', function() {
    console.log('here');
    justOped = true;
    current_op = op;
    first_num = parseFloat(result.value);
  });
});

const equals = document.getElementById('equals');
equals.addEventListener('click', function() {
  const second_num = parseFloat(result.value);
  if (first_num !== null && !isNaN(second_num)) {
    result.value = ops[current_op](first_num, second_num);
  } else {
    console.log("Code error");
  }
});


document.addEventListener('keypress', function(event) {
    const key = event.key;
    if (/^[0-9]$/.test(key)) {
        if (justOped) {
            clearText();
            justOped = false;
        }
        result.value += key;
    }

    const buttonId = keyToButtonIdMap[key];
    if (buttonId) {
        const button = document.getElementById(buttonId);
        if (button) button.click();
    }
});
