import React, { useMemo, useState } from 'react'
import { ArrowDown } from 'lucide-react'
import { useLanguage } from '../i18n/useLanguage'

function formatINR(n) {
  const v = Math.round(n)
  if (!isFinite(v)) return '₹0'
  return '₹' + v.toLocaleString('en-IN')
}

// Simulates SIP accumulation with optional annual step-up, returns { corpus, invested }
function simulateSip({ initialLumpsum, monthlySip, stepUpPct, sipYears, annualReturn }) {
  const monthlyRate = annualReturn / 12 / 100
  const months = sipYears * 12
  let corpus = initialLumpsum
  let invested = initialLumpsum
  let currentSip = monthlySip
  for (let m = 1; m <= months; m++) {
    if (m > 1 && (m - 1) % 12 === 0) {
      currentSip = currentSip * (1 + stepUpPct / 100)
    }
    corpus = (corpus + currentSip) * (1 + monthlyRate)
    invested += currentSip
  }
  return { corpus, invested }
}

function simulateCompounding(corpus, years, annualReturn) {
  const monthlyRate = annualReturn / 12 / 100
  const months = years * 12
  return corpus * Math.pow(1 + monthlyRate, months)
}

// Simulates SWP drawdown, returns { finalCorpus, totalWithdrawn, exhaustedAtMonth, finalMonthlyWithdrawal }
function simulateSwp({ startCorpus, monthlySwp, swpYears, annualReturn, mode, fixedIncreaseAmt, inflationRate }) {
  const monthlyRate = annualReturn / 12 / 100
  const months = swpYears * 12
  let corpus = startCorpus
  let currentWithdrawal = monthlySwp
  let totalWithdrawn = 0
  let exhaustedAtMonth = null

  for (let m = 1; m <= months; m++) {
    if (m > 1 && (m - 1) % 12 === 0) {
      if (mode === 'fixed') currentWithdrawal += fixedIncreaseAmt
      else if (mode === 'inflation') currentWithdrawal *= (1 + inflationRate / 100)
    }
    corpus = corpus * (1 + monthlyRate) - currentWithdrawal
    totalWithdrawn += currentWithdrawal
    if (corpus <= 0) {
      exhaustedAtMonth = m
      corpus = 0
      break
    }
  }
  return { finalCorpus: corpus, totalWithdrawn, exhaustedAtMonth, finalMonthlyWithdrawal: currentWithdrawal }
}

export default function SipSwpPlanner() {
  const { t } = useLanguage()

  const [initialLumpsum, setInitialLumpsum] = useState(0)
  const [monthlySip, setMonthlySip] = useState(25000)
  const [stepUpPct, setStepUpPct] = useState(0)
  const [sipYears, setSipYears] = useState(15)
  const [expectedReturn, setExpectedReturn] = useState(12)
  const [showTodaysValue, setShowTodaysValue] = useState(true)

  const [waitingYears, setWaitingYears] = useState(5)

  const [swpMonthly, setSwpMonthly] = useState(75000)
  const [swpYears, setSwpYears] = useState(25)
  const [swpReturn, setSwpReturn] = useState(8)
  const [increaseMode, setIncreaseMode] = useState('inflation')
  const [fixedIncreaseAmt, setFixedIncreaseAmt] = useState(2000)
  const [inflationRate, setInflationRate] = useState(6)

  const result = useMemo(() => {
    const { corpus: corpusAtSipEnd, invested } = simulateSip({
      initialLumpsum, monthlySip, stepUpPct, sipYears, annualReturn: expectedReturn
    })
    const corpusAfterWaiting = simulateCompounding(corpusAtSipEnd, waitingYears, expectedReturn)

    const flat = simulateSwp({
      startCorpus: corpusAfterWaiting, monthlySwp: swpMonthly, swpYears, annualReturn: swpReturn,
      mode: 'none', fixedIncreaseAmt: 0, inflationRate: 0
    })
    const withInflation = simulateSwp({
      startCorpus: corpusAfterWaiting, monthlySwp: swpMonthly, swpYears, annualReturn: swpReturn,
      mode: 'inflation', fixedIncreaseAmt: 0, inflationRate
    })

    const totalYearsToSwpStart = sipYears + waitingYears
    const totalYearsToSwpEnd = totalYearsToSwpStart + swpYears
    const discount = (nominal, years) => nominal / Math.pow(1 + inflationRate / 100, years)

    const tableYears = [1, 2, 3, 4, 5, 10, 15, 20, 25].filter(y => y <= swpYears)
    const yearlyRows = tableYears.map((y) => {
      const flatAmt = swpMonthly
      const inflAmt = swpMonthly * Math.pow(1 + inflationRate / 100, y - 1)
      return { year: y, flat: flatAmt, withInflation: inflAmt }
    })

    return {
      corpusAtSipEnd, invested, corpusAfterWaiting,
      flat, withInflation,
      totalYearsToSwpStart, totalYearsToSwpEnd, discount,
      yearlyRows
    }
  }, [initialLumpsum, monthlySip, stepUpPct, sipYears, expectedReturn, waitingYears, swpMonthly, swpYears, swpReturn, inflationRate])

  const exhaustedText = (r) => r.exhaustedAtMonth
    ? t('Yes, in year {year}').replace('{year}', Math.ceil(r.exhaustedAtMonth / 12))
    : t('No')

  const inputClass = "w-full px-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-colors text-sm"
  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5"

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 border border-gray-100 max-w-5xl mx-auto">
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-2">{t('SIP → Waiting → SWP Planner')}</h3>
        <p className="text-gray-600 max-w-2xl">{t('Model the full journey — invest, let it compound, then draw an income — and see whether your corpus survives inflation.')}</p>
      </div>

      <div className="space-y-10">
        {/* 1. SIP */}
        <div>
          <h4 className="text-lg font-bold text-gray-900 mb-4">{t('1. SIP / Accumulation Phase')}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>{t('Initial Lumpsum (optional)')}</label>
              <input type="number" min="0" step="10000" value={initialLumpsum} onChange={(e) => setInitialLumpsum(Number(e.target.value) || 0)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{t('Monthly SIP')}</label>
              <input type="number" min="0" step="500" value={monthlySip} onChange={(e) => setMonthlySip(Number(e.target.value) || 0)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{t('Annual SIP Step-up')} (%)</label>
              <input type="number" min="0" max="25" step="1" value={stepUpPct} onChange={(e) => setStepUpPct(Number(e.target.value) || 0)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{t('SIP Period (years)')}</label>
              <input type="number" min="1" max="40" step="1" value={sipYears} onChange={(e) => setSipYears(Number(e.target.value) || 1)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{t('Expected Return (p.a.)')} (%)</label>
              <input type="number" min="1" max="30" step="0.5" value={expectedReturn} onChange={(e) => setExpectedReturn(Number(e.target.value) || 0)} className={inputClass} />
            </div>
            <div className="flex items-end pb-2.5">
              <label className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 cursor-pointer">
                <input type="checkbox" checked={showTodaysValue} onChange={(e) => setShowTodaysValue(e.target.checked)} className="w-4 h-4 accent-primary-500" />
                {t("Show inflation-adjusted (today's value)")}
              </label>
            </div>
          </div>
        </div>

        {/* 2. Waiting */}
        <div>
          <h4 className="text-lg font-bold text-gray-900 mb-1">{t('2. Waiting / Compounding Period')}</h4>
          <p className="text-xs text-gray-400 mb-4">{t('No SIP, no withdrawal — the corpus keeps compounding untouched.')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>{t('Waiting Period After SIP (years)')}</label>
              <input type="number" min="0" max="30" step="1" value={waitingYears} onChange={(e) => setWaitingYears(Number(e.target.value) || 0)} className={inputClass} />
            </div>
          </div>
        </div>

        {/* 3. SWP */}
        <div>
          <h4 className="text-lg font-bold text-gray-900 mb-4">{t('3. SWP Phase')}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className={labelClass}>{t('Starting Monthly SWP')}</label>
              <input type="number" min="0" step="1000" value={swpMonthly} onChange={(e) => setSwpMonthly(Number(e.target.value) || 0)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{t('SWP Duration (years)')}</label>
              <input type="number" min="1" max="40" step="1" value={swpYears} onChange={(e) => setSwpYears(Number(e.target.value) || 1)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{t('Expected Return During SWP (p.a.)')} (%)</label>
              <input type="number" min="0" max="30" step="0.5" value={swpReturn} onChange={(e) => setSwpReturn(Number(e.target.value) || 0)} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>{t('SWP Increase Mode')}</label>
              <select value={increaseMode} onChange={(e) => setIncreaseMode(e.target.value)} className={inputClass}>
                <option value="none">{t('No increase')}</option>
                <option value="fixed">{t('Fixed ₹ increase / year')}</option>
                <option value="inflation">{t('Inflation-linked % / year')}</option>
              </select>
            </div>
            {increaseMode === 'fixed' && (
              <div>
                <label className={labelClass}>{t('Fixed Yearly Increase (₹)')}</label>
                <input type="number" min="0" step="500" value={fixedIncreaseAmt} onChange={(e) => setFixedIncreaseAmt(Number(e.target.value) || 0)} className={inputClass} />
              </div>
            )}
            <div>
              <label className={labelClass}>{t('Inflation Rate (p.a.)')} (%)</label>
              <input type="number" min="0" max="15" step="0.5" value={inflationRate} onChange={(e) => setInflationRate(Number(e.target.value) || 0)} className={inputClass} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10 space-y-10">
        {/* 4. Comparison table */}
        <div>
          <h4 className="text-lg font-bold text-gray-900 mb-4">{t('4. SWP: With vs Without Inflation')}</h4>
          <div className="overflow-x-auto rounded-2xl border border-gray-100">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-3 font-semibold text-gray-700">{t('Year')}</th>
                  <th className="p-3 font-semibold text-gray-700 text-right">{t('Without Inflation')}</th>
                  <th className="p-3 font-semibold text-gray-700 text-right">{t('With Inflation')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {result.yearlyRows.map((row) => (
                  <tr key={row.year}>
                    <td className="p-3 text-gray-600">{row.year}</td>
                    <td className="p-3 text-right font-semibold text-gray-900">{formatINR(row.flat)}</td>
                    <td className="p-3 text-right font-semibold text-primary-600">{formatINR(row.withInflation)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. Results summary */}
        <div>
          <h4 className="text-lg font-bold text-gray-900 mb-4">{t('5. Results Summary')}</h4>
          <div className="overflow-x-auto rounded-2xl border border-gray-100">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-3 font-semibold text-gray-700"></th>
                  <th className="p-3 font-semibold text-gray-700 text-right">{t('Without Inflation')}</th>
                  <th className="p-3 font-semibold text-primary-600 text-right">{t('With Inflation')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr><td className="p-3 text-gray-600">{t('SIP Invested')}</td><td className="p-3 text-right">{formatINR(result.invested)}</td><td className="p-3 text-right">{formatINR(result.invested)}</td></tr>
                <tr><td className="p-3 text-gray-600">{t('Corpus at SIP End')}</td><td className="p-3 text-right">{formatINR(result.corpusAtSipEnd)}</td><td className="p-3 text-right">{formatINR(result.corpusAtSipEnd)}</td></tr>
                <tr><td className="p-3 text-gray-600">{t('Corpus After Waiting')}</td><td className="p-3 text-right">{formatINR(result.corpusAfterWaiting)}</td><td className="p-3 text-right">{formatINR(result.corpusAfterWaiting)}</td></tr>
                <tr><td className="p-3 text-gray-600">{t('Starting SWP')}</td><td className="p-3 text-right">{formatINR(swpMonthly)}</td><td className="p-3 text-right">{formatINR(swpMonthly)}</td></tr>
                <tr><td className="p-3 text-gray-600">{t('Final Monthly SWP')}</td><td className="p-3 text-right">{formatINR(result.flat.finalMonthlyWithdrawal)}</td><td className="p-3 text-right font-semibold text-primary-600">{formatINR(result.withInflation.finalMonthlyWithdrawal)}</td></tr>
                <tr><td className="p-3 text-gray-600">{t('Total Withdrawn')}</td><td className="p-3 text-right">{formatINR(result.flat.totalWithdrawn)}</td><td className="p-3 text-right">{formatINR(result.withInflation.totalWithdrawn)}</td></tr>
                <tr><td className="p-3 text-gray-600">{t('Remaining Corpus')}</td><td className="p-3 text-right">{formatINR(result.flat.finalCorpus)}</td><td className="p-3 text-right">{formatINR(result.withInflation.finalCorpus)}</td></tr>
                <tr>
                  <td className="p-3 text-gray-600 font-semibold">{t('Corpus Exhausted?')}</td>
                  <td className="p-3 text-right font-bold">{exhaustedText(result.flat)}</td>
                  <td className="p-3 text-right font-bold">{exhaustedText(result.withInflation)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Funnel */}
        <div>
          <h4 className="text-lg font-bold text-gray-900 mb-4">{t('Corpus at Each Stage')}</h4>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {[
              { label: t('SIP Ends'), value: result.corpusAtSipEnd },
              { label: t('Waiting Ends'), value: result.corpusAfterWaiting },
              { label: t('SWP Ends'), value: result.withInflation.finalCorpus }
            ].map((stage, idx, arr) => (
              <React.Fragment key={stage.label}>
                <div className="flex-1 bg-gray-50 rounded-2xl border border-gray-100 p-4 text-center">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{stage.label}</div>
                  <div className="text-lg font-black text-primary-600">{formatINR(stage.value)}</div>
                </div>
                {idx < arr.length - 1 && (
                  <ArrowDown className="w-5 h-5 text-gray-300 mx-auto sm:-rotate-90 flex-shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 6. Today's value */}
        {showTodaysValue && (
          <div>
            <h4 className="text-lg font-bold text-gray-900 mb-4">{t("6. Today's Value")}</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{t('Nominal Corpus')}</div>
                <div className="text-2xl font-black text-gray-900">{formatINR(result.withInflation.finalCorpus)}</div>
              </div>
              <div className="bg-primary-50 rounded-2xl border border-primary-100 p-5">
                <div className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-1">{t("Inflation-Adjusted Value (Today's Money)")}</div>
                <div className="text-2xl font-black text-primary-600">
                  {formatINR(result.discount(result.withInflation.finalCorpus, result.totalYearsToSwpEnd))}
                </div>
              </div>
            </div>
          </div>
        )}

        <p className="text-xs text-gray-400 leading-relaxed border-t border-gray-100 pt-6">
          {t('This is an illustration based on assumed rates of return and inflation for planning purposes only. Actual mutual fund returns are market-linked and cannot be guaranteed or predicted.')}
        </p>
      </div>
    </div>
  )
}
