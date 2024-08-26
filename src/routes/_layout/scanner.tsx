import { QRCodeReader } from "@/components/qrcode-reader";
import { Button } from "@/components/ui/button";
import { QRData } from "@/lib/types";
import { CameraIcon } from "@radix-ui/react-icons";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import React from "react";
import { QRCodeScanner } from "@/components/qrcode-scanner";

export const Route = createFileRoute("/_layout/scanner")({
  component: ScannerPage,
});

function ScannerPage() {
  const [data, setData] = useState<QRData>({});
  return (
    <div className="container flex justify-center">
      <div className="w-full max-w-[300px] space-y-8 pt-10">
        <div className="mb-3 text-lg font-semibold">Scan QR Code</div>
        <div className="flex flex-col space-y-2">
          <QRCodeScannerDialog onSuccessCallback={setData}>
            <Button variant="outline">
              <CameraIcon className="mr-2 size-4" /> Camera
            </Button>
          </QRCodeScannerDialog>
          <QRCodeReader
            onResult={setData}
            onError={(err) => {
              if (!err) return;
              const message = typeof err === `string` ? err : err.message;
              toast.error(message);
            }}
          />
        </div>
        {data && Object.keys(data).length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center">
              <p className="text-sm font-medium">Scanned:</p>
              <button
                className="ml-auto text-sm font-semibold text-destructive"
                onClick={() => setData({})}
              >
                Clear
              </button>
            </div>
            <ResultTable data={data} />
          </div>
        )}
      </div>
    </div>
  );
}

interface QRCodeScannerDialogProps {
  onSuccessCallback?: (data: QRData) => void;
  children?: React.ReactNode;
}

function QRCodeScannerDialog({
  onSuccessCallback,
  children,
}: QRCodeScannerDialogProps) {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="h-full w-full max-w-full rounded-none border-0 p-0 sm:rounded-none">
        <DialogHeader className="sr-only">
          <DialogTitle className="sr-only">Scan QR Code</DialogTitle>
          <DialogDescription className="sr-only">
            Scan a QR code with your camera
          </DialogDescription>
        </DialogHeader>
        <div className="absolute left-0 top-0 h-full w-full">
          <QRCodeScanner
            onResult={(result) => {
              setOpen(false);
              onSuccessCallback?.(result);
              toast.success(`QR code scanned successfully`);
            }}
            onError={(error) => {
              if (!error) return;
              const message = typeof error === `string` ? error : error.message;
              toast.error(message || `something went wrong`);
              setOpen(false);
            }}
          />
        </div>
        <DialogFooter className="z-50 mt-auto p-3">
          <Button
            className="bg-white text-black hover:bg-white/90 hover:text-black"
            onClick={() => setOpen(false)}
          >
            <ArrowLeftIcon className="mr-2 size-4" /> Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ResultTable({ data }: { data: QRData }) {
  return (
    <table className="w-full border border-border text-left text-sm text-foreground">
      <thead className="bg-muted/60 text-xs uppercase text-foreground/50">
        <tr>
          <th className="px-6 py-3">Key</th>
          <th className="px-6 py-3">Value</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([key, value]) => (
          <tr key={key} className="border-b text-foreground/80 last:border-b-0">
            <td className="px-6 py-4 font-semibold text-foreground/60">
              {key}
            </td>
            <td className="px-6 py-4">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
