import React, { useState } from 'react'

export default function Sip({ mode = 'sip' }) {
  const [investment, setInvestment] = useState(10000)
  const [lumpsum, setLumpsum] = useState(100000)
  const [rate, setRate] = useState(12)
  const [years, setYears] = useState(10)

  const calculateSIP = () => {
    const monthlyRate = rate / 12 / 100
    const months = years * 12
    const futureValue = investment * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate)
    const totalInvested = investment * months
    return {
      futureValue: Math.round(futureValue),
      totalInvested: Math.round(totalInvested),
      wealthGained: Math.round(futureValue - totalInvested)
    }
  }

  const calculateLumpsum = () => {
    const futureValue = lumpsum * Math.pow(1 + rate / 100, years)
    return {
      futureValue: Math.round(futureValue),
      totalInvested: lumpsum,
      wealthGained: Math.round(futureValue - lumpsum)
    }
  }

  const results = mode === 'sip' ? calculateSIP() : calculateLumpsum()

  // Donut chart calculation
  const investedPercent = results.totalInvested / results.futureValue * 100
  const returnsPercent = 100 - investedPercent
  const circumference = 2 * Math.PI * 70
  const investedDash = (investedPercent / 100) * circumference
  const returnsDash = (returnsPercent / 100) * circumference

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-gray-100 max-w-4xl mx-auto">
      {/* Calculator Header */}
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-2">
          {mode === 'sip' ? 'SIP Calculator' : 'Lumpsum Calculator'}
        </h3>
        <p className="text-gray-600">
          {mode === 'sip'
            ? 'Calculate the future value of your systematic investment plan.'
            : 'Calculate the future value of a one-time lumpsum investment.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Sliders */}
        <div className="space-y-6">
          {mode === 'sip' ? (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700">Monthly Investment</label>
                <div className="bg-primary-50 border border-primary-100 rounded-lg px-3 py-1">
                  <span className="text-primary-600 font-bold">₹{investment.toLocaleString()}</span>
                </div>
              </div>
              <input
                type="range"
                min="500" max="100000" step="500"
                value={investment}
                onChange={(e) => setInvestment(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>₹500</span>
                <span>₹1,00,000</span>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-semibold text-gray-700">Total Investment</label>
                <div className="bg-primary-50 border border-primary-100 rounded-lg px-3 py-1">
                  <span className="text-primary-600 font-bold">₹{lumpsum.toLocaleString()}</span>
                </div>
              </div>
              <input
                type="range"
                min="10000" max="10000000" step="10000"
                value={lumpsum}
                onChange={(e) => setLumpsum(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>₹10,000</span>
                <span>₹1,00,00,000</span>
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-700">Expected Return Rate (p.a)</label>
              <div className="bg-primary-50 border border-primary-100 rounded-lg px-3 py-1">
                <span className="text-primary-600 font-bold">{rate}%</span>
              </div>
            </div>
            <input
              type="range"
              min="1" max="30" step="0.5"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1%</span>
              <span>30%</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-semibold text-gray-700">Time Period</label>
              <div className="bg-primary-50 border border-primary-100 rounded-lg px-3 py-1">
                <span className="text-primary-600 font-bold">{years} Yr{years > 1 ? 's' : ''}</span>
              </div>
            </div>
            <input
              type="range"
              min="1" max="40" step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>1 Yr</span>
              <span>40 Yrs</span>
            </div>
          </div>

          {/* Results below sliders */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 space-y-3 mt-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Invested amount</span>
              <span className="font-bold text-gray-900">₹{results.totalInvested.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Est. returns</span>
              <span className="font-bold text-green-600">₹{results.wealthGained.toLocaleString()}</span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
              <span className="text-sm font-semibold text-gray-700">Total value</span>
              <span className="text-xl font-black text-primary-600">₹{results.futureValue.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Donut Chart */}
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-52 h-52 mb-8">
            <svg viewBox="0 0 160 160" className="w-full h-full transform -rotate-90">
              {/* Invested amount arc */}
              <circle
                cx="80" cy="80" r="70"
                fill="none"
                stroke="#e0e7ff"
                strokeWidth="18"
                strokeDasharray={`${investedDash} ${circumference - investedDash}`}
                strokeDashoffset="0"
                strokeLinecap="round"
              />
              {/* Returns arc */}
              <circle
                cx="80" cy="80" r="70"
                fill="none"
                stroke="#6366f1"
                strokeWidth="18"
                strokeDasharray={`${returnsDash} ${circumference - returnsDash}`}
                strokeDashoffset={`${-investedDash}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs text-gray-500 font-medium">Total Value</span>
              <span className="text-lg font-black text-gray-900">₹{results.futureValue.toLocaleString()}</span>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-indigo-200"></div>
              <span className="text-sm text-gray-600">Invested amount</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
              <span className="text-sm text-gray-600">Est. returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}