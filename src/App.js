import { useState } from 'react';

function App() {

	const [calc, setCalc] = useState('');
	const [result, setResult] = useState('');

	const ops = ['/', '*', '+', '-', '.'];

	//each button represents a value 
	const updateCalc = (value) => {
		//if statement prevents multiple consecutive operators 
		if (ops.includes(value) && calc === '' ||
			//ops.includes checks if value is an operator and then if the last value entered is also an operator
			ops.includes(value) && ops.includes(calc.slice(-1)))
		{
			return;
		}
		setCalc(calc + value);

		if (!ops.includes(value)) {
			setResult(eval(calc + value).toString());
		}
	}

	const createDigits = () => {
		const digits = [];
		for (let i = 1; i < 10; ++i) {
			digits.push(
				// digit value needs to be string  
				<button onClick={() => updateCalc(i.toString())} key={i}>{i}</button>
			)
		}
		return digits;
	}
	const calculate = () => {
		setCalc(eval(calc).toString());
	}
	const deleteLast = () => {
		if (calc === '') {
			return;
		}
		else {
			//remove last value via the slice
			const value = calc.slice(0, -1);
			setCalc(value);
		}
	}
  	return (
    	<div className="App">
			<div className="calculator">
			  	<div className="display">
				  {/* if there is a value, display it, otherwise show nothing */}
					{result ? <span>({result})</span> : ''} {calc || "0"}
				</div>
			
				<div className="operators">
					<button onClick={() => updateCalc('/')}>/</button>
					<button onClick={() => updateCalc('*')}>*</button>
					<button onClick={() => updateCalc('+')}>+</button>
					<button onClick={() => updateCalc('-')}>-</button>

					<button onClick={deleteLast}>DEL</button>
				</div>

				<div className="digits">
					{createDigits()}
					<button onClick={() => updateCalc('0')}>0</button>
				  	<button onClick={() => updateCalc('.')}>.</button>
				  
					<button onClick={calculate}>=</button>
				</div>
			</div>
    	</div>
  	);
}

export default App;
