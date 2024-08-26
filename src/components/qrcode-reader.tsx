import { QRData } from "@/lib/types";
import { decodeQrData } from "@/lib/utils";
import QrScanner from "qr-scanner";
import React from "react";

interface QRCodeReaderProps
  extends Omit<React.HtmlHTMLAttributes<HTMLInputElement>, "onError"> {
  onResult?: (result: QRData) => void;
  onError?: (error?: Error | string) => void;
}

export const QRCodeReader = React.forwardRef<
  HTMLInputElement,
  QRCodeReaderProps
>(({ onResult, onError, ...props }, ref) => {
  const readImage = (file: File) => {
    QrScanner.scanImage(file, { returnDetailedScanResult: true })
      .then((result) => {
        const data = decodeQrData(result.data);
        onResult?.(data);
      })
      .catch((error) => {
        onError?.(error);
      });
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      readImage(file);
    }
  };

  return (
    <input
      ref={ref}
      type="file"
      accept="image/*"
      onChange={onFileChange}
      {...props}
    />
  );
});
