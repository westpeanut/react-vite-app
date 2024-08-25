import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RootProvider } from "./components/providers/root-provider.tsx";
import "non.geist";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootProvider />
  </StrictMode>
);
