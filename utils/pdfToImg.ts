export interface PdfConversionResult {
  imageUrl: string;
  file: File | null;
  error?: string;
}

let pdfjsLib: any = null;
let isLoading = false;
let loadPromise: Promise<any> | null = null;

async function loadPdfJs(): Promise<any> {
  if (pdfjsLib) return pdfjsLib;
  if (loadPromise) return loadPromise;

  console.log("Loading PDF.js library...");
  isLoading = true;

  try {
    // @ts-expect-error - pdfjs-dist/build/pdf.mjs is not a module
    loadPromise = import("pdfjs-dist/build/pdf.mjs").then(async (lib) => {
      console.log("PDF.js library loaded, setting up worker...");
      // Import the worker as a URL to avoid MIME type issues
      const workerSrc = await import("pdfjs-dist/build/pdf.worker.min.mjs?url");
      lib.GlobalWorkerOptions.workerSrc = workerSrc.default;
      console.log("PDF.js worker configured:", workerSrc.default);
      pdfjsLib = lib;
      isLoading = false;
      return lib;
    });

    return await loadPromise;
  } catch (error) {
    console.error("Failed to load PDF.js:", error);
    isLoading = false;
    loadPromise = null;
    throw error;
  }
}

export async function convertPdfToImage(
  file: File
): Promise<PdfConversionResult> {
  console.log(
    "Starting PDF to image conversion for:",
    file.name,
    "Size:",
    file.size
  );

  try {
    if (!file || file.size === 0) {
      throw new Error("Invalid file provided");
    }

    if (
      file.type !== "application/pdf" &&
      !file.name.toLowerCase().endsWith(".pdf")
    ) {
      throw new Error("File is not a PDF");
    }

    console.log("Loading PDF.js library...");
    const lib = await loadPdfJs();
    console.log("PDF.js library loaded successfully");

    console.log("Converting file to array buffer...");
    const arrayBuffer = await file.arrayBuffer();
    console.log("Array buffer created, size:", arrayBuffer.byteLength);

    console.log("Loading PDF document...");
    const pdf = await lib.getDocument({ data: arrayBuffer }).promise;
    console.log("PDF loaded, pages:", pdf.numPages);

    console.log("Getting first page...");
    const page = await pdf.getPage(1);
    console.log("Page loaded successfully");

    const viewport = page.getViewport({ scale: 2.0 }); // Reduced scale for better performance
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    console.log("Canvas created:", viewport.width, "x", viewport.height);

    if (context) {
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
    } else {
      throw new Error("Failed to get canvas context");
    }

    console.log("Rendering page to canvas...");
    await page.render({ canvasContext: context, viewport }).promise;
    console.log("Page rendered successfully");

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            console.log("Blob created successfully, size:", blob.size);
            // Create a File from the blob with the same name as the pdf
            const originalName = file.name.replace(/\.pdf$/i, "");
            const imageFile = new File([blob], `${originalName}.png`, {
              type: "image/png",
            });

            const imageUrl = URL.createObjectURL(blob);
            console.log("Image URL created:", imageUrl);

            resolve({
              imageUrl,
              file: imageFile,
            });
          } else {
            console.error("Failed to create blob from canvas");
            resolve({
              imageUrl: "",
              file: null,
              error: "Failed to create image blob",
            });
          }
        },
        "image/png",
        0.9 // Slightly reduced quality for better performance
      );
    });
  } catch (err) {
    console.error("PDF conversion error:", err);
    return {
      imageUrl: "",
      file: null,
      error: `Failed to convert PDF: ${err instanceof Error ? err.message : String(err)}`,
    };
  }
}
