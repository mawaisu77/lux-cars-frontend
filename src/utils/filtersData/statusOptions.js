const statusOptions = [
      { id: "Stationary", label: "Stationary", hex: "text-red-600",bgHex: "bg-red-600", hexLight: "text-red-60047", letter: "S" }, 
      { id: "Run & Drive", label: "Run & Drive", hex: "text-green-600",bgHex: "bg-green-600",hexLight: "text-green-60047", letter: "R" }, 
      { id: "Starts", label: "Starts", hex: "text-orange-600",bgHex: "bg-orange-600", hexLight: "text-orange-60047", letter: "S" }, 
      { id: "Can't test", label: "Can't test", hex: "text-red-600",bgHex: "bg-red-600",hexLight: "text-red-60047", letter: "C" }, 
      { id: "Unknown", label: "Unknown", hex: "text-red-600",bgHex: "bg-red-600",hexLight: "text-red-60047", letter: "U" }, 
];

  // API key
  const statusAPIKey = "status"; 
  
  // Label
  const statusLabel = "Start Code"; 
  
  export { statusOptions, statusAPIKey, statusLabel };
  