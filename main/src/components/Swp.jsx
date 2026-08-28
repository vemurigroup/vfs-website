import React, { useState } from 'react'

export default function Swp() {
  const [investment, setInvestment] = useState(500000)
  const [withdrawal, setWithdrawal] = useState(10000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(5)

  // SWP Calculation logic
  const calculateSWP = () => {
    const monthlyRate = rate / 12 / 100
    const months = years * 12
    let balance = investment
    let totalWithdrawn = 0

    for (let i = 0; i < months; i++) {
      balance = balance * (1 + monthlyRate) - withdrawal
      totalWithdrawn += withdrawal
      if (balance < 0) {
        balance = 0
        break
      }
    }

    return {
      finalValue: Math.round(balance),
      totalWithdrawn: Math.round(totalWithdrawn)
    }
  }

  const results = calculateSWP()

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-gray-100 max-w-4xl mx-auto">
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-2">SWP Calculator</h3>
        <p className="text-gray-600">Calculate the future value of your Systematic Withdrawal Plan.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Total Investment (₹)</label>
            <input 
              type="range" 
              min="100000" max="50000000" step="50000"
              value={investment}
              onChange={(e) => setInvestment(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500" 
            />
            <div className="mt-2 text-right font-bold text-primary-600 text-xl">₹{investment.toLocaleString()}</div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Monthly Withdrawal (₹)</label>
            <input 
              type="range" 
              min="1000" max="500000" step="1000"
              value={withdrawal}
              onChange={(e) => setWithdrawal(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500" 
            />
            <div className="mt-2 text-right font-bold text-primary-600 text-xl">₹{withdrawal.toLocaleString()}</div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Expected Return Rate (p.a %)</label>
            <input 
              type="range" 
              min="1" max="30" step="0.5"
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
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Final Balance</p>
            <p className="text-4xl font-bold text-primary-600">₹{results.finalValue.toLocaleString()}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full pt-6 border-t border-primary-200">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Withdrawn</p>
              <p className="text-lg font-bold text-green-600">₹{results.totalWithdrawn.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Initial Invested</p>
              <p className="text-lg font-bold text-gray-900">₹{investment.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}