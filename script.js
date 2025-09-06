let currentNumber = '0';
let previousNumber = null;
let operator = null;
let shouldResetDisplay = false;

const display = document.getElementById('tela');
const history = document.getElementById('historico');

function updateDisplay() {
    display.textContent = currentNumber;
}

function updateHistory() {
    if (previousNumber !== null && operator !== null) {
        history.textContent = `${previousNumber} ${operator}`;
    } else {
        history.textContent = '';
    }
}

function appendNumber(num) {
    if (shouldResetDisplay) {
        currentNumber = '';
        shouldResetDisplay = false;
    }

    if (currentNumber === '0' && num !== '.') {
        currentNumber = num;
    } else {
        currentNumber += num;
    }

    updateDisplay();
}

function appendDecimal() {
    if (shouldResetDisplay) {
        currentNumber = '0.';
        shouldResetDisplay = false;
    } else if (!currentNumber.includes('.')) {
        currentNumber += '.';
    }
    updateDisplay();
}

function setOperator(op) {
    if (operator !== null && !shouldResetDisplay) {
        calculate();
    }

    previousNumber = parseFloat(currentNumber);
    operator = op;
    shouldResetDisplay = true;
    updateHistory();
}

function calculate() {
    if (operator === null || shouldResetDisplay) {
        return;
    }

    const current = parseFloat(currentNumber);
    let result;

    switch (operator) {
        case '+':
            result = previousNumber + current;
            break;
        case '-':
            result = previousNumber - current;
            break;
        case '×':
            result = previousNumber * current;
            break;
        case '÷':
            if (current === 0) {
                alert('Erro: Divisão por zero!');
                clearAll();
                return;
            }
            result = previousNumber / current;
            break;
        default:
            return;
    }

    currentNumber = result.toString();
    operator = null;
    previousNumber = null;
    shouldResetDisplay = true;

    updateDisplay();
    updateHistory();
}

function clearAll() {
    currentNumber = '0';
    previousNumber = null;
    operator = null;
    shouldResetDisplay = false;

    updateDisplay();
    updateHistory();
}

function toggleSign() {
    currentNumber = (parseFloat(currentNumber) * -1).toString();
    updateDisplay();
}

function percentage() {
    currentNumber = (parseFloat(currentNumber) / 100).toString();
    updateDisplay();
}

// Suporte ao teclado
document.addEventListener('keydown', (e) => {
    const key = e.key;

    if (key >= '0' && key <= '9') {
        appendNumber(key);
    } else if (key === '.') {
        appendDecimal();
    } else if (key === '+') {
        setOperator('+');
    } else if (key === '-') {
        setOperator('-');
    } else if (key === '*') {
        setOperator('×');
    } else if (key === '/') {
        e.preventDefault();
        setOperator('÷');
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Escape') {
        clearAll();
    } else if (key === '%') {
        percentage();
    }
});
