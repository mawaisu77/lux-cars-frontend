// Color options
const colorOptions = [
    { id: "silver", label: "Silver", hex: "#C0C0C0" },
    { id: "purple", label: "Purple", hex: "#800080" },
    { id: "orange", label: "Orange", hex: "#FFA500" },
    { id: "green", label: "Green", hex: "#008000" },
    { id: "red", label: "Red", hex: "#FF0000" },
    { id: "gold", label: "Gold", hex: "#FFD700" },
    { id: "charcoal", label: "Charcoal", hex: "#36454F" },
    { id: "brown", label: "Brown", hex: "#A52A2A" },
    { id: "grey", label: "Grey", hex: "#808080" },
    { id: "turquoise", label: "Turquoise", hex: "#40E0D0" },
    { id: "blue", label: "Blue", hex: "#0000FF" },
    { id: "bronze", label: "Bronze", hex: "#CD7F32" },
    { id: "white", label: "White", hex: "#FFFFFF" },
    { id: "cream", label: "Cream", hex: "#FFFDD0" },
    { id: "black", label: "Black", hex: "#000000" },
    { id: "yellow", label: "Yellow", hex: "#FFFF00" },
    { id: "beige", label: "Beige", hex: "#F5F5DC" },
    { id: "pink", label: "Pink", hex: "#FFC0CB" },
    { id: "two_colors", label: "Two Colors", hex: "#D3D3D3" }, // Neutral, could vary
    { id: "other", label: "Other", hex: "#D3D3D3" } // Neutral, could vary
  ];
  
  // API key for color
  const colorAPIKey = "color"; 
  
  // Label for colors
  const colorLabel = "Color Options"; 
  
  // Function to generate a style attribute for color display
  const getColorStyle = (hex) => {
    return {
      backgroundColor: hex,
      width: '14px',
      height: '14px',
      borderRadius: '10%', 
      display: 'inline-block',
      marginRight: '8px',
    };
  };
  
  // Exporting the color options, label, and API key
  export { colorOptions, colorLabel, colorAPIKey, getColorStyle };
  