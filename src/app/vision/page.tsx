"use client";
import React, { useState } from "react";
import Camera from "./Camera";
import FormRow from "@/comp/FormRow";
import FormLabel from "@/comp/FormLabel";

const Page = () => {
  const [file, setFile] = useState<File | null>();

  function handleOnChange(event: React.FormEvent<HTMLInputElement>): void {
    const target = event.target as HTMLInputElement & { files: FileList }; // Get the file from the event

    if (!file) return; // Check if the file is supported by the browser
    const formData = new FormData();

    formData.append("file", file); // Add the file to the FormData object
    formData.append("upload_preset", file); // Replace with your upload preset name

    setFile(target.files[0]); // Get the first file from the FileList object
  }

  return (
    <div className="Page">
      <div className="Camera">
        <Camera />
      </div>
      <div className="img">
        <FormRow>
          <FormLabel htmlFor="message">Image</FormLabel>
          <input type="file" name="image" onChange={handleOnChange} />
        </FormRow>
      </div>
    </div>
  );
};

export default Page;
