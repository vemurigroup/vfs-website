import React, { useState } from 'react'

export default function Fd() {
  const [investment, setInvestment] = useState(100000)
  const [rate, setRate] = useState(7)
  const [years, setYears] = useState(5)

  // FD Calculation logic (Quarterly compounding)
  const calculateFD = () => {
    // A = P(1 + r/n)^(nt) where n = 4 (quarterly)
    const n = 4
    const r = rate / 100
    const finalValue = investment * Math.pow(1 + r/n, n * years)
    const totalInterest = finalValue - investment
    
    return {
      finalValue: Math.round(finalValue),
      totalInterest: Math.round(totalInterest)
    }
  }

  const results = calculateFD()

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-gray-100 max-w-4xl mx-auto my-6">
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-2">FD Calculator</h3>
        <p className="text-gray-600">Calculate maturity value and interest earned on your Fixed Deposit.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Total Investment (₹)</label>
            <input 
              type="range" 
              min="10000" max="10000000" step="10000"
              value={investment}
              onChange={(e) => setInvestment(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500" 
            />
            <div className="mt-2 text-right font-bold text-primary-600 text-xl">₹{investment.toLocaleString()}</div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Interest Rate (p.a %)</label>
            <input 
              type="range" 
              min="1" max="15" step="0.25"
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
              min="1" max="30" step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500" 
            />
            <div className="mt-2 text-right font-bold text-primary-600 text-xl">{years} Yrs</div>
          </div>
        </div>

        <div className="bg-primary-50 rounded-2xl p-8 flex flex-col justify-center items-center text-center border border-primary-100">
          <div className="mb-6 w-full">
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Maturity Value</p>
            <p className="text-4xl font-bold text-primary-600">₹{results.finalValue.toLocaleString()}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full pt-6 border-t border-primary-200">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Interest</p>
              <p className="text-lg font-bold text-green-600">₹{results.totalInterest.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Principal Amount</p>
              <p className="text-lg font-bold text-gray-900">₹{investment.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}