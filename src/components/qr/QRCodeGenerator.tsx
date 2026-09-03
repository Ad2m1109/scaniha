"use client";

import { useRef } from "react";
import { Download, Printer } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";

export function QRCodeGenerator({ value, filename = "perkly-qr", size = 176 }: { value: string; filename?: string; size?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  function download() {
    const svg = ref.current;
    if (!svg) return;
    const source = new XMLSerializer().serializeToString(svg);
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 1024; canvas.height = 1024;
      const context = canvas.getContext("2d");
      if (!context) return;
      context.fillStyle = "#fff"; context.fillRect(0, 0, 1024, 1024); context.drawImage(image, 0, 0, 1024, 1024);
      const link = document.createElement("a"); link.download = `${filename}.png`; link.href = canvas.toDataURL("image/png"); link.click();
    };
    image.src = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(source)))}`;
  }
  return <div className="qr-code-generator flex flex-col items-center"><div className="rounded-2xl border border-line bg-white p-4"><QRCodeSVG ref={ref} value={value} size={size} level="H" includeMargin /></div><div className="mt-4 flex gap-2"><Button type="button" onClick={download} className="gap-2 bg-purple text-white"><Download className="h-4 w-4" /> Download</Button><Button type="button" variant="outline" onClick={() => window.print()} className="gap-2"><Printer className="h-4 w-4" /> Print</Button></div></div>;
}
