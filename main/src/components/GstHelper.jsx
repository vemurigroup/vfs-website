import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Upload, FileSignature, FileSpreadsheet, Loader2, CheckCircle2, Info } from 'lucide-react'
import { PDFDocument } from 'pdf-lib'
import JSZip from 'jszip'
import * as XLSX from 'xlsx'
import * as pdfjsLib from 'pdfjs-dist'

// Setup pdf.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`

export default function GstHelper({ onNavigateHome }) {
  const [pdfType, setPdfType] = useState('KFINTECH')
  const [inputMode, setInputMode] = useState('single')
  const [loading, setLoading] = useState(false)
  const [loadingText, setLoadingText] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  const pdfFileRef = useRef(null)
  const zipFileRef = useRef(null)
  const signFileRef = useRef(null)
  const excelFileRef = useRef(null)

  const pdfFileMapRef = useRef(new Map())

  const downloadBlob = (blob, filename) => {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  const extractInvoiceNumber = async (pdfBytes, currentPdfType) => {
    const pdf = await pdfjsLib.getDocument({ data: pdfBytes }).promise
    for (let p = 1; p <= pdf.numPages; p++) {
      const page = await pdf.getPage(p)
      const content = await page.getTextContent()
      const text = content.items.map(i => i.str).join(' ').replace(/\s+/g, ' ')
      
      let match
      if (currentPdfType === 'KFINTECH') {
        match = text.match(/\b([A-Z]{2,10})\s*\/\s*(\d{4}-\d{2})\s*\/\s*(\d+)\b/i)
        if (match) {
          return match[1].toUpperCase() + '/' + match[2] + '/' + match[3]
        }
      } else {
        match = text.match(/\b([A-Z]{2,10})\s*\/\s*(\d{2}-\d{2})\s*\/\s*E\s*\/\s*(\d+)\b/i)
        if (match) {
          return match[1].toUpperCase() + '/' + match[2] + '/E/' + match[3]
        }
      }
    }
    return null
  }

  const signPdfDoc = async (pdfDoc, signature, currentPdfType, currentMode) => {
    try {
      const page = pdfDoc.getPages()[0]
      const { height: pageHeight } = page.getSize()
      let x, y, width = 150, height = 60
      
      if (currentPdfType === 'KFINTECH') {
        x = 380
        y = 120
      } else {
        x = 40
        if (currentMode === 'single') {
          y = 192
        } else {
          y = pageHeight - 680
        }
      }
      page.drawImage(signature, { x, y, width, height })
    } catch (err) {
      console.error(err)
    }
  }

  const embedSignatureInto = async (pdfDoc, signBytes, signMime) => {
    if (signMime === 'image/png') {
      return await pdfDoc.embedPng(signBytes)
    }
    return await pdfDoc.embedJpg(signBytes)
  }

  const processNestedZip = async (zip, outputZip, signBytes, signMime, currentPdfType) => {
    let signedCount = 0
    for (const entry of Object.values(zip.files)) {
      if (entry.dir) continue
      
      const fileName = entry.name.toLowerCase()
      setLoadingText("Signing: " + entry.name)

      if (fileName.endsWith(".pdf")) {
        try {
          const pdfBytes = await entry.async("arraybuffer")
          const pdfDoc = await PDFDocument.load(pdfBytes)
          const signature = await embedSignatureInto(pdfDoc, signBytes, signMime)
          
          await signPdfDoc(pdfDoc, signature, currentPdfType, 'zip')
          
          const signedPdf = await pdfDoc.save()
          signedCount++
          
          const signedName = entry.name.replace(/\.pdf$/i, "_signed.pdf")
          const invoiceKey = await extractInvoiceNumber(pdfBytes, currentPdfType)
          
          if (invoiceKey) {
            pdfFileMapRef.current.set(invoiceKey, signedName)
          } else {
            console.warn("Invoice Number Not Found for", entry.name)
          }
          outputZip.file(signedName, signedPdf)
        } catch (err) {
          console.error("Failed:", entry.name, err)
        }
      } else if (currentPdfType === "KFINTECH" && fileName.endsWith(".zip")) {
        const innerBytes = await entry.async("arraybuffer")
        const innerZip = await JSZip.loadAsync(innerBytes)
        const newInnerZip = new JSZip()
        
        signedCount += await processNestedZip(innerZip, newInnerZip, signBytes, signMime, currentPdfType)
        
        const innerZipData = await newInnerZip.generateAsync({ type: "uint8array" })
        outputZip.file(entry.name, innerZipData)
      }
    }
    return signedCount
  }

  const generatePDF = async () => {
    setSuccessMsg('')
    pdfFileMapRef.current.clear()

    const signInput = signFileRef.current?.files[0]
    if (!signInput) {
      alert("Please select a signature image.")
      return
    }

    setLoading(true)
    setLoadingText('Generating signed PDF...')

    try {
      const signBytes = await signInput.arrayBuffer()

      if (inputMode === 'single') {
        const pdfInput = pdfFileRef.current?.files[0]
        if (!pdfInput || pdfInput.type !== 'application/pdf') {
          alert("Please select a valid PDF file.")
          setLoading(false)
          return
        }

        const pdfBytes = await pdfInput.arrayBuffer()
        const pdfDoc = await PDFDocument.load(pdfBytes)
        const signature = await embedSignatureInto(pdfDoc, signBytes, signInput.type)
        
        await signPdfDoc(pdfDoc, signature, pdfType, 'single')
        const signedPdf = await pdfDoc.save()
        
        const filename = pdfInput.name.replace(/\.pdf$/i, "") + "_signed.pdf"
        const invoiceKey = await extractInvoiceNumber(pdfBytes, pdfType)
        if (invoiceKey) {
          pdfFileMapRef.current.set(invoiceKey, filename)
        }
        
        downloadBlob(new Blob([signedPdf], { type: "application/pdf" }), filename)
        setSuccessMsg("Signed PDF generated successfully!")
      } else {
        const zipInput = zipFileRef.current?.files[0]
        if (!zipInput) {
          alert("Please select a ZIP file.")
          setLoading(false)
          return
        }

        const zipBytes = await zipInput.arrayBuffer()
        const inputZip = await JSZip.loadAsync(zipBytes)
        const outputZip = new JSZip()
        
        setLoadingText("Scanning ZIP...")
        const totalSigned = await processNestedZip(inputZip, outputZip, signBytes, signInput.type, pdfType)
        
        if (totalSigned === 0) {
          alert("No PDF files found inside the ZIP.")
          setLoading(false)
          return
        }
        
        setLoadingText("Creating ZIP...")
        const outZipBlob = await outputZip.generateAsync({ type: "blob" })
        const outFilename = zipInput.name.replace(/\.zip$/i, "_signed.zip")
        
        downloadBlob(outZipBlob, outFilename)
        setSuccessMsg(`Completed! Signed ${totalSigned} PDF(s).`)
      }
    } catch (e) {
      console.error(e)
      alert("Error: " + e.message)
    } finally {
      setLoading(false)
    }
  }

  const generateExcel = async () => {
    const excelInput = excelFileRef.current?.files[0]
    if (!excelInput) {
      alert("Please select an Excel file.")
      return
    }
    if (pdfFileMapRef.current.size === 0) {
      alert("No mapping was created. Please generate signed PDFs first.")
      return
    }

    const invoiceColumn = pdfType === "CAMS" ? 4 : 7
    const fileNameColumn = pdfType === "CAMS" ? 11 : 9

    try {
      const data = await excelInput.arrayBuffer()
      const workbook = XLSX.read(data, { type: "array" })
      const sheet = workbook.Sheets[workbook.SheetNames[0]]
      const range = XLSX.utils.decode_range(sheet["!ref"])
      
      let updated = 0
      for (let r = 1; r <= range.e.r; r++) {
        const invoiceCell = sheet[XLSX.utils.encode_cell({ r, c: invoiceColumn })]
        if (!invoiceCell) continue
        
        const invoiceNo = String(invoiceCell.v).trim().toUpperCase()
        const fileName = pdfFileMapRef.current.get(invoiceNo)
        
        if (!fileName) continue
        
        sheet[XLSX.utils.encode_cell({ r, c: fileNameColumn })] = {
          t: "s",
          v: fileName
        }
        updated++
      }

      const output = XLSX.write(workbook, { type: "array", bookType: "xlsx" })
      downloadBlob(
        new Blob([output], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }),
        excelInput.name.replace(/\.xlsx$/i, "_Mapped.xlsx")
      )
      alert(`${updated} row(s) updated successfully.`)
    } catch (err) {
      console.error(err)
      alert("Failed to process Excel file.")
    }
  }

  return (
    <div className="pt-28 md:pt-32 pb-20 min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="max-w-3xl w-full px-4 mb-6">
        <button 
          onClick={onNavigateHome}
          className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Main Website
        </button>
      </div>

      <div className="max-w-3xl w-full px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100"
        >
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">GST & PDF Helper</h1>
            <p className="text-gray-500">Automatically place signatures on CAMS and KFINTECH PDFs</p>
          </div>

          <div className="space-y-8">
            <div className="bg-blue-50 text-blue-800 p-4 rounded-xl flex items-start gap-3">
              <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">Automatically places the signature based on the selected template layout.</p>
            </div>

            {/* Config Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700">Template Mode</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="pdfType" 
                      value="KFINTECH" 
                      checked={pdfType === 'KFINTECH'} 
                      onChange={() => setPdfType('KFINTECH')}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-gray-700 font-medium">KFINTECH</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="pdfType" 
                      value="CAMS" 
                      checked={pdfType === 'CAMS'} 
                      onChange={() => setPdfType('CAMS')}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-gray-700 font-medium">CAMS</span>
                  </label>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700">Input Format</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="inputMode" 
                      value="single" 
                      checked={inputMode === 'single'} 
                      onChange={() => setInputMode('single')}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-gray-700 font-medium">Single PDF</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="inputMode" 
                      value="zip" 
                      checked={inputMode === 'zip'} 
                      onChange={() => setInputMode('zip')}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="text-gray-700 font-medium">ZIP Archive</span>
                  </label>
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* PDF Upload */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <FileSignature className="w-5 h-5 text-primary-500" />
                Step 1: Process PDFs
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {inputMode === 'single' ? 'Select PDF Document' : 'Select ZIP Archive'}
                  </label>
                  <input 
                    type="file" 
                    ref={inputMode === 'single' ? pdfFileRef : zipFileRef}
                    accept={inputMode === 'single' ? '.pdf' : '.zip'}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 border border-gray-200 rounded-xl cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Signature Image</label>
                  <input 
                    type="file" 
                    ref={signFileRef}
                    accept="image/png,image/jpeg"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 border border-gray-200 rounded-xl cursor-pointer"
                  />
                </div>
              </div>

              <button 
                onClick={generatePDF}
                disabled={loading}
                className="w-full flex items-center justify-center px-6 py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold transition-all disabled:opacity-70 mt-4"
              >
                {loading ? (
                  <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> {loadingText}</>
                ) : (
                  <><Upload className="w-5 h-5 mr-2" /> Generate & Download Signed PDF</>
                )}
              </button>

              {successMsg && (
                <div className="bg-green-50 text-green-700 p-3 rounded-lg flex items-center gap-2 text-sm font-medium">
                  <CheckCircle2 className="w-5 h-5" />
                  {successMsg}
                </div>
              )}
            </div>

            <hr className="border-gray-100" />

            {/* Excel Upload */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-primary-500" />
                Step 2: Map Filenames to Excel
              </h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Original CAMS/KFINTECH Excel</label>
                <input 
                  type="file" 
                  ref={excelFileRef}
                  accept=".xlsx,.xls"
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 border border-gray-200 rounded-xl cursor-pointer"
                />
              </div>

              <button 
                onClick={generateExcel}
                className="w-full flex items-center justify-center px-6 py-3.5 bg-gray-900 hover:bg-black text-white rounded-xl font-bold transition-all"
              >
                Download Updated Excel
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  )
}
