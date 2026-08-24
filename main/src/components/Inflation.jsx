import React, { useState } from 'react'

export default function Inflation() {
  const [expense, setExpense] = useState(50000)
  const [rate, setRate] = useState(6)
  const [years, setYears] = useState(10)

  // Inflation Calculation logic
  const calculateInflation = () => {
    // FV = PV * (1 + r)^n
    const r = rate / 100
    const futureExpense = expense * Math.pow(1 + r, years)
    const difference = futureExpense - expense
    
    return {
      futureExpense: Math.round(futureExpense),
      difference: Math.round(difference)
    }
  }

  const results = calculateInflation()

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-gray-100 max-w-4xl mx-auto my-6">
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-2">Inflation Calculator</h3>
        <p className="text-gray-600">See how inflation reduces the purchasing power of your money over time.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Current Monthly Expense (₹)</label>
            <input 
              type="range" 
              min="10000" max="500000" step="5000"
              value={expense}
              onChange={(e) => setExpense(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500" 
            />
            <div className="mt-2 text-right font-bold text-primary-600 text-xl">₹{expense.toLocaleString()}</div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Expected Inflation Rate (p.a %)</label>
            <input 
              type="range" 
              min="1" max="15" step="0.5"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500" 
            />
            <div className="mt-2 text-right font-bold text-primary-600 text-xl">{rate}%</div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Time Period (Years)</label>
            <input 
              type="range" 
              min="1" max="40" step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500" 
            />
            <div className="mt-2 text-right font-bold text-primary-600 text-xl">{years} Yrs</div>
          </div>
        </div>

        <div className="bg-primary-50 rounded-2xl p-8 flex flex-col justify-center items-center text-center border border-primary-100">
          <div className="mb-6 w-full">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Future Monthly Expense</p>
            <p className="text-4xl font-bold text-primary-600">₹{results.futureExpense.toLocaleString()}</p>
          </div>
          <div className="grid grid-cols-1 gap-4 w-full pt-6 border-t border-primary-200">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Additional Cost Due to Inflation</p>
              <p className="text-lg font-bold text-red-500">+ ₹{results.difference.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}