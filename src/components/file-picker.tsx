"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { isDevelopmentEnvironment } from "@/lib/utils";

export default function FilePicker() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [outputFolder] = useState<string>("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === "audio/mpeg" || file.type === "audio/wav")) {
      setAudioFile(file);
    } else {
      setAudioFile(null);
      toast.error("Please select a valid MP3 or WAV file.");
    }
  };

  const handleFolderSelection = async () => {
    try {
      // const dirHandle = await window.showDirectoryPicker();
      // setOutputFolder(dirHandle.name);
      toast.error("Not implemented yet.");
    } catch (error) {
      toast.error("Failed to select output folder. Please try again.", {
        description: isDevelopmentEnvironment()
          ? (error as Error).message
          : undefined,
      });
    }
  };

  const handleSubmit = () => {
    if (!audioFile || !outputFolder) {
      toast.error("Please select both an audio file and an output folder.");
      return;
    }
    // Here you would implement the actual processing logic
    console.log("Processing", audioFile.name, "to folder", outputFolder);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-card rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Audio Processor</h2>
      <div className="space-y-4">
        <div>
          <Label htmlFor="audio-file">Select MP3 or WAV file</Label>
          <Input
            id="audio-file"
            type="file"
            accept=".mp3,.wav"
            onChange={handleFileChange}
          />
        </div>
        <div>
          <Label htmlFor="output-folder">Output Folder</Label>
          <div className="flex items-center space-x-2">
            <Input
              id="output-folder"
              type="file"
              value={outputFolder}
              readOnly
              placeholder="Select output folder"
            />
            <Button type="button" onClick={handleFolderSelection}>
              Select
            </Button>
          </div>
        </div>
        <Button
          onClick={handleSubmit}
          disabled={!audioFile || !outputFolder}
          className="w-full"
        >
          Separate Audio
        </Button>
      </div>
    </div>
  );
}
