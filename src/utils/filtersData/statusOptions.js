const statusOptions = [
      { id: "Stationary", label: "Stationary", hex: "#F8AB53",hexLight: "#f8ab5347", letter: "S" }, 
      { id: "Run & Drive", label: "Run & Drive", hex: "#00CC52",hexLight: "#00cc5247", letter: "R" }, 
      { id: "Starts", label: "Starts", hex: "#219AF3",hexLight: "#219af347", letter: "S" }, 
      { id: "Can't test", label: "Can't test", hex: "#DF4949",hexLight: "#df494947", letter: "C" }, 
      { id: "Unknown", label: "Unknown", hex: "#000000",hexLight: "#00000047", letter: "U" }, 
];

  // API key
  const statusAPIKey = "status"; 
  
  // Label
  const statusLabel = "Start Code"; 
  
  export { statusOptions, statusAPIKey, statusLabel };
  