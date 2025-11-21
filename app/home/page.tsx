'use client'
import { FileContextProvider } from '@/components/providers/FileContextProvider'
import UploadPDF from '@/components/ui/custom/UploadPDF'
import React, { useEffect, useState } from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import EditableTable from '@/components/ui/custom/Editable'
import axios from "axios"
import { Button } from '@/components/ui/button'
import { RowsContextProvider } from '@/components/providers/RowsProvider'
import { Calendar1Icon, Loader2 } from 'lucide-react'
const page = () => {
  const [pdfURL, setpdfURL] = useState<string | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<File[] | undefined>();

  useEffect(() => {
    if (files && files.length > 0) {
      const url = URL.createObjectURL(files[0]);
      setpdfURL(url);
    }
  }, [files]);


  const [extractedData, setExtractedData] = useState<any[]>([]);
  async function handleButton(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    try {
      if (extractedData.length === 0) {
        console.log("No extracted data to add to Google Calendar.");
        return;
      }
      // Check if extractedData has required fields
      const hasRequiredFields = extractedData.every(item =>
        Object.keys(item).length >= 3 &&
        item[Object.keys(item)[0]] && // Title
        item[Object.keys(item)[1]] && // Start Date
        item[Object.keys(item)[2]]    // End Date
      );
      if (!hasRequiredFields) {
        console.log("Extracted data is missing required fields.");
        return;
      }
      const events = extractedData.map((item) => {
        return {
          summary: item[Object.keys(item)[0]] || "No Title",
          start: {
            dateTime: new Date(item[Object.keys(item)[1]]).toISOString(),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
          },
          end: {
            dateTime: new Date(item[Object.keys(item)[2]]).toISOString(),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
          },
        };
      });

      for (const event of events) {


        const accessToken = await axios.get("http://localhost:3000/api/getToken")
        console.log("Access Token:", accessToken.data.token);
        await axios.post("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
          ...event
        }, {
          headers: {
            'Authorization': `Bearer ${accessToken.data.token}`,
          }
        })
      }
    }
    catch (error) {
      console.error("Error adding events to Google Calendar:", error);
    }

  }
  useEffect(() => {
    // ON FILE upload run api route /api/extract to get extracted rows
    const extractData = async () => {
      if (files && files.length > 0) {
        const formData = new FormData();
        formData.append("file", files[0]);
        try {
          setIsLoading(true);
          const response = await axios.post("http://localhost:8000/process-pdf", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          setExtractedData(response.data.data);
          console.log("Extracted Data:", response.data);
        } catch (error) {
          console.error("Error extracting data:", error);
        } finally {
          setIsLoading(false);
        }

      }
    };
    extractData();
  }, [files])
 return (
  <FileContextProvider value={{ files, setFiles }}>
    <RowsContextProvider value={{ rows: extractedData, setExtractedData }}>

      {/* Entire Page Container */}
      <div className="w-full h-screen flex flex-col md:flex-row overflow-hidden">

        {/* LEFT Panel (PDF Viewer) */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-full overflow-y-auto border-b md:border-b-0 md:border-r">

          <div className="flex gap-4 p-3">
            <UploadPDF />
          </div>

          {files && (
            <embed
              src={pdfURL}
              type="application/pdf"
              className="w-full h-[38vh] md:h-[85vh] lg:h-[88vh] overflow-hidden"
            />
          )}
        </div>

        {/* RIGHT Panel (Table & Button) */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-full overflow-y-auto">

          {isLoading ? (
            <div className="w-full flex flex-col items-center justify-center py-10">
              <Loader2 className="animate-spin text-slate-700" size={40} />
              <span className="mt-3 text-sm text-slate-700">
                Extracting information from PDF...
              </span>
            </div>
          ) : (
            <>
              {extractedData.length > 0 && (
                <Button className="m-4 flex gap-2" onClick={handleButton}>
                  <Calendar1Icon /> Add to Google Calendar
                </Button>
              )}
              <EditableTable />
            </>
          )}
        </div>
      </div>

    </RowsContextProvider>
  </FileContextProvider>
);

}
export default page
