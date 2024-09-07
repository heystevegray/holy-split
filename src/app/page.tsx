"use client";

import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import FilePicker from "@/components/ui/file-picker";

interface Response {
  status: "Success" | "Error";
  message: string;
}

const App = () => {
  const [result, setResult] = useState<Response | undefined>(undefined);

  const handleSeparate = async () => {
    try {
      // if (!inputFile) {
      //   setResult({ status: "Error", message: "Input file is required" });
      //   return;
      // }

      // if (!outputDir) {
      //   setResult({ status: "Error", message: "Output directory is required" });
      //   return;
      // }

      // console.log({ inputFile, outputDir });

      return;

      setResult({
        status: "Success",
        message: "Separating audio...",
      });

      const response = await invoke<Response>("run_spleeter", {
        inputFile,
        outputDir,
      });

      console.log({ response });

      setResult(response);
    } catch (error) {
      setResult({ status: "Error", message: (error as Error).message });
    }
  };

  return <FilePicker />;
};

export default App;
