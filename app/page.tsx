import { Hero1 } from "@/components/ui/custom/Hero";
import { Navbar1 } from "@/components/ui/custom/Navbar";
import Image from "next/image";
const buttons = {
   primary: {
      text: "Get Started",
      url: "/home",
    },
  secondary: {
    text: "View on GitHub",
    url: "https://www.shadcnblocks.com",
  },
}
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center"   >

      <Hero1 badge="Your Academic Calendar Generator" heading="PDFtoCalendar" description="Upload your PDF and get a clean, editable academic calendar in seconds. Automatically extract dates, events, and schedules with high-accuracy OCR—no manual formatting required." buttons={buttons} image={{"src" :"/image.png" , "alt":"PDF to Calendar"} } />
    </div>
  );
}
