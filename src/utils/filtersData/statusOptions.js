const statusOptions = [
      { id: "Stationary", label: "Stationary", hex: "#F8AB53",hexLight: "#f8ab5347", letter: "S" }, 
      { id: "Run & Drive", label: "Run & Drive", hex: "#00CC52",hexLight: "#00CC52", letter: "R" }, 
      { id: "Starts", label: "Starts", hex: "#219AF3",hexLight: "#219AF3", letter: "S" }, 
      { id: "Can't test", label: "Can't test", hex: "#DF4949",hexLight: "#DF4949", letter: "C" }, 
      { id: "Unknown", label: "Unknown", hex: "#000000",hexLight: "#000000", letter: "U" }, 
];

  // API key
  const statusAPIKey = "status"; 
  
  // Label
  const statusLabel = "Start Code"; 
  
  export { statusOptions, statusAPIKey, statusLabel };
  