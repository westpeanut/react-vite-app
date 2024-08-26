import { createFileRoute } from "@tanstack/react-router";
import { QRCodeGenerator } from "@/components/qrcode-generator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_layout/")({
  component: GeneratorPage,
});

const DEFAULT_ID = Math.random().toString(36).substring(7);
const DEFAULT_RESOURCE = "application";

function GeneratorPage() {
  const [id, setId] = useState<string>(DEFAULT_ID);
  const [resource, setResource] = useState<string>(DEFAULT_RESOURCE);

  const [generated, setGenerated] = useState<string | null>(null);

  const handleDownload = () => {
    if (!generated) return;

    const a = document.createElement("a");
    a.href = generated;
    a.download = `${resource}_qrcode.jpeg`;
    a.click();
  };

  return (
    <div className="container flex justify-center">
      <div className="w-full max-w-[300px] py-10">
        <div className="mb-3 text-lg font-semibold">Generate QR Code</div>
        <div className="flex flex-col space-y-6">
          <QRCodeGenerator value={{ id, resource }} onGenerate={setGenerated} />
          <div className="grid w-full gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="resourceId">Id</Label>
              <Input
                id="resourceId"
                value={id}
                className="col-span-2"
                onChange={(e) => setId(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="resource">Type</Label>
              <Select value={resource} onValueChange={(v) => setResource(v)}>
                <SelectTrigger className="col-span-2" id="resource">
                  <SelectValue placeholder="Select resource" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="user">User</SelectItem>
                    <SelectItem value="application">Application</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={handleDownload}>Download</Button>
        </div>
      </div>
    </div>
  );
}
