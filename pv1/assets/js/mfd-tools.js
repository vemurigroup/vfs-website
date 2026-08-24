// PDF Signature Generator + Excel Mapping — ported unchanged from
// mfd-backoffice/app.js (same functions, same behavior; only the DOM
// ids referenced match this page's markup). Restyled shell only — the
// signing/extraction/mapping logic itself isn't touched, since it
// already works.
'use strict';

function clearForm() {

    // Reset radio buttons
    document.querySelector('input[name="pdfType"][value="KFINTECH"]').checked = true;
    document.querySelector('input[name="inputMode"][value="single"]').checked = true;

    // Show/Hide blocks
    document.getElementById("singleModeBlock").style.display = "block";
    document.getElementById("zipModeBlock").style.display = "none";

    // Clear file inputs
    document.getElementById("pdfFile").value = "";
    document.getElementById("zipFile").value = "";
    document.getElementById("signFile").value = "";
    document.getElementById("excelFile").value = "";

    // Clear generated PDF mapping
    pdfFileMap.clear();

    // Hide loading if visible
    document.getElementById("loading").classList.remove("is-active");

    console.log("Form cleared successfully.");
}

// Original PDF Name (Invoice No) -> Generated Signed PDF Name
const pdfFileMap = new Map();

async function extractInvoiceNumber(pdfBytes, pdfType) {

    const pdf = await pdfjsLib.getDocument({
        data: pdfBytes
    }).promise;

    for (let p = 1; p <= pdf.numPages; p++) {

        const page = await pdf.getPage(p);

        const content = await page.getTextContent();

        const text = content.items
            .map(i => i.str)
            .join(" ")
            .replace(/\s+/g, " ");

        let match;

        if (pdfType === "KFINTECH") {

            // Examples:
            // BJTI/2026-27/001
            // CRTI/2026-27/002

            match = text.match(
                /\b([A-Z]{2,10})\s*\/\s*(\d{4}-\d{2})\s*\/\s*(\d+)\b/i
            );

            if (match) {

                return (
                    match[1].toUpperCase() +
                    "/" +
                    match[2] +
                    "/" +
                    match[3]
                );

            }

        } else {

            // Examples:
            // DM/26-27/E/1
            // FTIM/26-27/E/1
            // HLSM/26-27/E/1

            match = text.match(
                /\b([A-Z]{2,10})\s*\/\s*(\d{2}-\d{2})\s*\/\s*E\s*\/\s*(\d+)\b/i
            );

            if (match) {

                return (
                    match[1].toUpperCase() +
                    "/" +
                    match[2] +
                    "/E/" +
                    match[3]
                );

            }

        }
    }

    return null;
}

function buildInvoiceKey(fileName) {

    if (!fileName) return null;

    return fileName
        .replace(/\.pdf$/i, "")
        .trim()
        .toUpperCase();

}

function openAbout() {
    document.getElementById("aboutModal").classList.add("is-open");
}
function closeAbout() {
    document.getElementById("aboutModal").classList.remove("is-open");
}

function toggleMode() {
    const mode = document.querySelector('input[name="inputMode"]:checked').value;
    document.getElementById("singleModeBlock").style.display = mode === "single" ? "block" : "none";
    document.getElementById("zipModeBlock").style.display = mode === "zip" ? "block" : "none";
}

// Embeds the signature onto page 1 of a given pdf-lib document, per template rule.
async function signPdfDoc(pdfDoc, signature, pdfType) {
    try {
        const page = pdfDoc.getPages()[0];
        console.log("Using template:", pdfType);
        const { width: pageWidth, height: pageHeight } = page.getSize();
        let x, y, width = 150, height = 60;
        const mode = document.querySelector('input[name="inputMode"]:checked').value;
        if (pdfType === "KFINTECH") {
            x = 380;
            y = 120;
        } else {
            // Adjust these if your CAMS template changes
            x = 40;
            if (mode === "single") {
                y = 192;  // Adjust this value once for your template
            } else {
                y = pageHeight - 680;   // Adjust this value once for your template
            }
        }

        page.drawImage(signature, { x, y, width, height });
    } catch (err) {
        console.error(err);
    }
}

async function embedSignatureInto(pdfDoc, signBytes, signMime) {
    if (signMime === "image/png") {
        return await pdfDoc.embedPng(signBytes);
    }
    return await pdfDoc.embedJpg(signBytes);
}

async function processNestedZip(zip, outputZip, signBytes, signMime, pdfType) {

    const loadingText = document.getElementById("loadingText");
    let signedCount = 0;
    for (const entry of Object.values(zip.files)) {

        if (entry.dir) continue;

        const fileName = entry.name.toLowerCase();
        loadingText.textContent = "Signing: " + entry.name;
        // PDF
        if (fileName.endsWith(".pdf")) {
            try {

                const pdfBytes = await entry.async("arraybuffer");

                const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);

                const signature = await embedSignatureInto(
                    pdfDoc,
                    signBytes,
                    signMime
                );

                await signPdfDoc(pdfDoc, signature, pdfType);

                const signedPdf = await pdfDoc.save();
                signedCount++;
                const signedName = entry.name.replace(/\.pdf$/i, "_signed.pdf");
                const invoiceKey =
                    await extractInvoiceNumber(
                        pdfBytes,
                        pdfType
                    );


                if (invoiceKey) {

                    pdfFileMap.set(
                        invoiceKey,
                        signedName
                    );

                    console.log(
                        invoiceKey,
                        "=>",
                        signedName
                    );

                }
                else {

                    console.warn(
                        "Invoice Number Not Found"
                    );

                }

                outputZip.file(
                    signedName,
                    signedPdf
                );
            } catch (err) {

                console.error(
                    "Failed:",
                    entry.name,
                    err
                );

            }

        }

        // ZIP inside ZIP (KFINTECH only)
        else if (
            pdfType === "KFINTECH" &&
            fileName.endsWith(".zip")
        ) {

            const innerBytes = await entry.async("arraybuffer");

            const innerZip = await JSZip.loadAsync(innerBytes);

            const newInnerZip = new JSZip();
            signedCount += await processNestedZip(
                innerZip,
                newInnerZip,
                signBytes,
                signMime,
                pdfType
            );

            const innerZipData =
                await newInnerZip.generateAsync({
                    type: "uint8array"
                });

            console.log("Final Map Size:", pdfFileMap.size);

            for (const [k, v] of pdfFileMap.entries()) {
                console.log(k, "=>", v);
            }

            outputZip.file(
                entry.name,
                innerZipData
            );

        }

    }
    return signedCount;
}


async function generatePDF() {
    pdfFileMap.clear();
    const btn = document.getElementById("btn");
    const loadingText = document.getElementById("loadingText");
    btn.disabled = true;
    document.getElementById("loading").classList.add("is-active");
    loadingText.textContent = "Generating signed PDF...";

    try {

        const mode = document.querySelector('input[name="inputMode"]:checked').value;
        const pdfType = document.querySelector('input[name="pdfType"]:checked').value;
        const signInput = document.getElementById("signFile").files[0];

        if (!signInput) {
            alert("Please select a signature image.");
            return;
        }

        const signBytes = await signInput.arrayBuffer();

        if (mode === "single") {

            const pdfInput = document.getElementById("pdfFile").files[0];

            if (!pdfInput) {
                alert("Please select a PDF file.");
                return;
            }
            if (pdfInput.type != "application/pdf") {
                alert("Please select a PDF file.");
                return;
            }

            const pdfBytes = await pdfInput.arrayBuffer();
            const pdfDoc = await PDFLib.PDFDocument.load(pdfBytes);
            const signature = await embedSignatureInto(pdfDoc, signBytes, signInput.type);

            await signPdfDoc(pdfDoc, signature, pdfType);


            const signedPdf = await pdfDoc.save();

            const filename =
                pdfInput.name.replace(/\.pdf$/i, "") +
                "_signed.pdf";

            const invoiceKey =
                await extractInvoiceNumber(
                    pdfBytes,
                    pdfType
                );

            pdfFileMap.set(invoiceKey, filename);

            console.log("Map Size:", pdfFileMap.size);
            console.log([...pdfFileMap.entries()]);
            downloadBlob(
                new Blob([signedPdf], {
                    type: "application/pdf"
                }),
                filename
            );
            alert("Signed PDF generated successfully.");

        } else {

            const zipInput = document.getElementById("zipFile").files[0];

            if (!zipInput) {
                alert("Please select a ZIP file.");
                return;
            }

            const zipBytes = await zipInput.arrayBuffer();

            const inputZip = await JSZip.loadAsync(zipBytes);

            const outputZip = new JSZip();

            loadingText.textContent = "Scanning ZIP...";

            const totalSigned =
                await processNestedZip(
                    inputZip,
                    outputZip,
                    signBytes,
                    signInput.type,
                    pdfType
                );

            if (totalSigned === 0) {
                alert("No PDF files found inside the ZIP.");
                return;
            }

            loadingText.textContent = "Creating ZIP...";

            console.log("Final Map Size:", pdfFileMap.size);

            for (const [k, v] of pdfFileMap.entries()) {
                console.log(k, "=>", v);
            }
            const outZipBlob =
                await outputZip.generateAsync({
                    type: "blob"
                });

            const outFilename =
                zipInput.name.replace(
                    /\.zip$/i,
                    "_signed.zip"
                );

            downloadBlob(
                outZipBlob,
                outFilename
            );


            alert(
                `Completed Successfully!

Signed ${totalSigned} PDF(s).

Output:
${outFilename}`
            );
        }



    } catch (e) {
        console.error(e);
        alert("Error: " + e.message);
    } finally {
        btn.disabled = false;
        document.getElementById("loading").classList.remove("is-active");
    }



}

function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
}


async function generateExcel() {
    console.log(pdfFileMap);
    const excelInput = document.getElementById("excelFile").files[0];

    if (!excelInput) {
        alert("Please select an Excel file.");
        return;
    }

    console.log("Current Map:", [...pdfFileMap.entries()]);

    if (pdfFileMap.size === 0) {
        alert("No mapping was created during PDF generation.");
        return;
    }

    const pdfType =
        document.querySelector(
            'input[name="pdfType"]:checked'
        ).value;


    // CAMS
    // Invoice No  : E (4)
    // File Name   : L (11)
    //
    // KFINTECH
    // Invoice No  : H (7)
    // File Name   : J (9)

    const invoiceColumn =
        pdfType === "CAMS" ? 4 : 7;

    const fileNameColumn =
        pdfType === "CAMS" ? 11 : 9;

    const data = await excelInput.arrayBuffer();

    const workbook = XLSX.read(data, {
        type: "array"
    });

    const sheet =
        workbook.Sheets[
        workbook.SheetNames[0]
        ];

    const range =
        XLSX.utils.decode_range(sheet["!ref"]);

    let updated = 0;

    for (let r = 1; r <= range.e.r; r++) {

        const invoiceCell =
            sheet[
            XLSX.utils.encode_cell({
                r,
                c: invoiceColumn
            })
            ];

        if (!invoiceCell)
            continue;

        const invoiceNo =
            String(invoiceCell.v)
                .trim()
                .toUpperCase();

        const fileName =
            pdfFileMap.get(invoiceNo);

        if (!fileName)
            continue;

        sheet[
            XLSX.utils.encode_cell({
                r,
                c: fileNameColumn
            })
        ] = {
            t: "s",
            v: fileName
        };

        updated++;
    }

    const output =
        XLSX.write(workbook, {
            type: "array",
            bookType: "xlsx"
        });

    downloadBlob(
        new Blob([output], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }),
        excelInput.name.replace(
            /\.xlsx$/i,
            "_Mapped.xlsx"
        )
    );

    alert(updated + " row(s) updated.");
}

document.addEventListener('DOMContentLoaded', () => {
    ConfigApply.init();
    document.getElementById('year').textContent = new Date().getFullYear();
});
