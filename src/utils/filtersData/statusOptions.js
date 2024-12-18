const statusOptions = [
      { id: "Stationary", label: "Stationary", hex: "#808080" }, // Gray
      { id: "Run & Drive", label: "Run & Drive", hex: "#008000" }, // Green
      { id: "Starts", label: "Starts", hex: "#FFFF00" }, // Yellow
      { id: "Can't test", label: "Can't test", hex: "#FF0000" }, // Red
      { id: "Unknown", label: "Unknown", hex: "#0000FF" }, // Blue
];

  // API key
  const statusAPIKey = "status"; 
  
  // Label
  const statusLabel = "Start Code"; 
  
  export { statusOptions, statusAPIKey, statusLabel };
  