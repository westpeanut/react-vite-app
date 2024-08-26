import { cn, encodeQrData, mergeRefs } from "@/lib/utils";
import { QRCodeCanvas } from "qrcode.react";
import * as React from "react";
import Measure from "react-measure";
import { QRData } from "@/lib/types";

const getQRBase64 = (
  canvas: HTMLCanvasElement,
  printMargin = 16,
  format = "image/jpeg"
) => {
  // Get the original canvas dimensions
  const originalWidth = canvas.width;
  const originalHeight = canvas.height;

  // Create a new canvas with the added margin
  const newCanvas = document.createElement("canvas");
  newCanvas.width = originalWidth + printMargin * 2;
  newCanvas.height = originalHeight + printMargin * 2;
  const ctx = newCanvas.getContext("2d");

  if (!ctx) return null;

  // set white background https://www.qrcode.com/en/howto/code.html
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, newCanvas.width, newCanvas.height);

  ctx.drawImage(canvas, printMargin, printMargin);

  // Convert the new canvas to data URL
  return newCanvas.toDataURL(format);
};

type QRCodeCanvasProps = Omit<
  React.ComponentPropsWithoutRef<typeof QRCodeCanvas>,
  "value"
>;

interface QRCodeGeneratorProps extends QRCodeCanvasProps {
  value: QRData;
  printMargin?: number;
  onGenerate?: (data: string | null) => void;
}

export const QRCodeGenerator = ({
  value,
  className,
  style,
  printMargin,
  onGenerate,
  ...props
}: QRCodeGeneratorProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (containerRef.current) {
      const canvas = containerRef.current.children?.[0] as HTMLCanvasElement;
      if (!canvas) return;

      const base64 = getQRBase64(canvas, printMargin);
      onGenerate?.(base64);
    }
  }, [onGenerate, printMargin, value]);

  return (
    <Measure>
      {({ measureRef, contentRect }) => (
        <div
          ref={mergeRefs(measureRef, containerRef)}
          className={cn(
            "aspect-square w-full h-full dark:p-2 dark:bg-white",
            className
          )}
          style={style}
        >
          <QRCodeCanvas
            value={encodeQrData(value)}
            size={contentRect.entry.width}
            {...props}
          />
        </div>
      )}
    </Measure>
  );
};
