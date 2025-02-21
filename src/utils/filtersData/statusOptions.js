const statusOptions = [
      { id: "Stationary", label: "Stationary", hex: "text-red-600",bgHex: "bg-red-600", hexLight: "text-red-600", letter: "S",  description:"Refers to a vehicle that is not in motion or is immobilized, either due to mechanical issues, being out of service, or other factors." }, 
      { id: "Run & Drive", label: "Run & Drive", hex: "text-green-600",bgHex: "bg-green-600",hexLight: "text-green-600", letter: "R", description:"Indicates that the vehicle is capable of running and can be driven, meaning it starts and is operational, but it may still have other issues that need to be addressed."}, 
      { id: "Starts", label: "Starts", hex: "text-orange-600",bgHex: "bg-orange-600", hexLight: "text-orange-600", letter: "S", description:"A classification indicating that the vehicle is capable of starting but may not necessarily be fully operational or able to be driven." }, 
      { id: "Can't test", label: "Can't test", hex: "text-red-600",bgHex: "bg-red-600",hexLight: "text-red-600", letter: "C", description:"Indicates that the vehicle cannot be tested (either due to mechanical failure, lack of keys, or other issues) to determine its operational status or condition." }, 
      { id: "Unknown", label: "Unknown", hex: "text-red-600",bgHex: "bg-red-600",hexLight: "text-red-600", letter: "U", description:"No Information" }, 
];

  // API key
  const statusAPIKey = "status"; 
  
  // Label
  const statusLabel = "Start Code"; 
  
  export { statusOptions, statusAPIKey, statusLabel };
  