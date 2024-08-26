import * as React from "react";

import { QRData } from "@/lib/types";
import { decodeQrData } from "@/lib/utils";
import QRScanner from "qr-scanner";

const QRScannerOverLay = React.forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} {...props}>
    <svg
      className="absolute h-full w-full text-blue-500"
      viewBox="0 0 130 130"
      fill="none"
    >
      <path
        d="M19.2857 1H3C1.89543 1 1 1.89543 1 3V19.2857M110.714 1H127C128.105 1 129 1.89543 129 3V19.2857M1 110.714V127C1 128.105 1.89566 129 3.00023 129C8.6898 129 14.0959 129 19.2857 129M129 110.714V127C129 128.105 128.104 129 127 129C121.31 129 115.904 129 110.714 129"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
    <div className="relative h-full w-full bg-blue-500/20">
      <div className="absolute -left-2 -top-2 h-px w-[calc(100%+1rem)] animate-scanner-bar bg-blue-500"></div>
    </div>
  </div>
));

interface QRCodeScannerProps {
  onResult?: (data: QRData) => void;
  onError?: (error?: Error | string) => void;
}

export const QRCodeScanner = ({ onResult, onError }: QRCodeScannerProps) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const scanner = React.useRef<QRScanner | null>(null);
  const [isActive, setIsActive] = React.useState<boolean>(true);

  const handleSuccess = React.useCallback(
    (result: QRScanner.ScanResult) => {
      const data = decodeQrData(result.data);
      onResult?.(data);
    },
    [onResult]
  );

  const handleError = React.useCallback(
    (error?: Error | string) => {
      // filter no qr code found error
      const message = typeof error === "string" ? error : error?.message;
      if (message && message.includes(QRScanner.NO_QR_CODE_FOUND)) return;
      onError?.(error);
    },
    [onError]
  );

  React.useEffect(() => {
    if (videoRef.current) {
      scanner.current = new QRScanner(videoRef.current, handleSuccess, {
        preferredCamera: "environment",
        highlightScanRegion: true,
        highlightCodeOutline: true,
        onDecodeError: handleError,
        returnDetailedScanResult: true,
        overlay: overlayRef.current || undefined,
      });

      scanner.current
        .start()
        .then(() => setIsActive(true))
        .catch(() => setIsActive(false));
    }
    return () => {
      if (scanner.current) {
        scanner.current.destroy();
        scanner.current = null;
      }
    };
  }, [handleError, handleSuccess]);

  React.useEffect(() => {
    if (!isActive) {
      const errorMessage =
        "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload.";
      handleError(new Error(errorMessage));
    }
  }, [handleError, isActive]);

  return (
    <div className="h-full w-full bg-black">
      <video className="h-full w-full object-cover" ref={videoRef}></video>
      <QRScannerOverLay ref={overlayRef} />
    </div>
  );
};
