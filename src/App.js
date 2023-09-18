import { useState } from 'react';
import Header from './components/Header/Header';
import ResultsTable from './components/ResultsTable/ResultsTable';
import UserInput from './components/UserInput/UserInput';

function App() {
  const [inputList, setInputList] = useState(null);

  const calculateHandler = (inputList) => {
    setInputList(inputList);
  };

  const yearlyData = []; // per-year results

  if (inputList) {
    let currentSavings = inputList['current-savings'];
    const yearlyContribution = inputList['yearly-contribution'];
    const expectedReturn = inputList['expected-return'] / 100;
    const duration = inputList['duration'];

    // The below code calculates yearly results (total savings, interest etc)
    for (let i = 0; i < duration; i++) {
      const yearlyInterest = currentSavings * expectedReturn;
      currentSavings += yearlyInterest + yearlyContribution;
      yearlyData.push({
        year: i + 1,
        yearlyInterest: yearlyInterest,
        savingsEndOfYear: currentSavings,
        yearlyContribution: yearlyContribution,
      });
    }
  }

  return (
    <div>
      <Header />

      <UserInput onCalculate={calculateHandler} setInputList={setInputList} />

      {!inputList && (
        <p style={{ textAlign: 'center' }}>No investment calculated yet.</p>
      )}
      {inputList && (
        <ResultsTable
          data={yearlyData}
          initialInvestment={inputList['current-savings']}
        />
      )}
    </div>
  );
}

export default App;
