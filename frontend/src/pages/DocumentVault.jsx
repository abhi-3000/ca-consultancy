import React from "react";

const DocumentVault = () => {
  const handleTestChange = (event) => {
    // If this log appears, the input is working.
    console.log(
      "--- TEST SUCCESSFUL --- File selected:",
      event.target.files[0]
    );
    alert("File selection was successful! Check the console.");
  };

  return (
    <div className="mt-10 p-6 bg-yellow-100 border border-yellow-400 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">File Input Test Area</h2>
      <p className="mb-2">This is a test. Please select a file below.</p>
      <input type="file" onChange={handleTestChange} />
    </div>
  );
};

export default DocumentVault;
