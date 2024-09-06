"use client";

import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";

interface Response {
  status: "Success" | "Error";
  message: string;
}

const App = () => {
  const [inputFile, setInputFile] = useState(process.env.INPUT_FILE);
  const [outputDir, setOutputDir] = useState(process.env.OUTPUT_FILE);
  const [result, setResult] = useState<Response>();

  const handleSeparate = async () => {
    try {
      const response = await invoke<Response>("run_spleeter", {
        inputFile,
        outputDir,
      });
      setResult(response);
    } catch (error) {
      setResult({ status: "Error", message: (error as Error).message });
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Holy Split Batman</h1>
      <br />
      <input
        style={{
          width: "50%",
          background: "#303030",
          padding: "5px",
        }}
        type="text"
        placeholder="Input File"
        value={inputFile}
        onChange={(e) => setInputFile(e.target.value)}
      />
      <br />
      <input
        style={{
          width: "50%",
          background: "#303030",
          padding: "5px",
        }}
        type="text"
        placeholder="Output Directory"
        value={outputDir}
        onChange={(e) => setOutputDir(e.target.value)}
      />
      <br />
      <button
        style={{
          background: "#303030",
          padding: "5px",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
        onClick={handleSeparate}
      >
        Separate
      </button>
      <br />
      <p style={{ color: result?.status === "Error" ? "red" : undefined }}>
        {result?.message}
      </p>
    </div>
  );
};

export default App;
