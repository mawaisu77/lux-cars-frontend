
export const damageColorMap = {
    green: ["Minor Dent/Scratch","Hail", "Normal Wear", "Electrical", "Rear", "Repossession"], 
    orange: ["Damage History", "Rear End", "Partial Repair", "Replaced VIN", "Side", "Top/Roof", "Vandalism", "Theft", "Cash For Clunkers", "Charity","Front", "Front & Rear", "Front End", "Interior Damage", "Left & Right Side", "Left Front","Left Rear", "Left Side", "None", "Right Front", "Right Rear", "Right Side", "Roof", "Roof Damage", "Steering Column", "Storm Damage", "Strip", "Suspension", "Theft", "Vandalized"],                                                                           
    red: ["Frame Damage", "Undercarriage Damage", "Biohazard/Chemical", "Burn", "Burn - Engine","Burn - Interior","Mechanical", "Missing/Altered VIN","Front End", "Rejected Repair", "Rollover", "Stripped", "Water/Flood", "Fire", "Collision", "Other", "All Over", "Bio Hazard", "Biohazard", "Engine", "Engine Burn", "Engine Damage", "Exterior Burn", "Flood", "Frame", "Fresh Water", "Interior Burn", "Mechanical", "Possible Mech", "Roll Over", "Rollover", "Salt Water", "Structural", "Total Burn", "Transmission Damage", "Undercarriage", "Unknown", "Water"], 
  };
  
  
  export const getDamageColorClass = (damageType) => {
    if (damageColorMap.green.includes(damageType)) {
      return "text-green-600";
    } else if (damageColorMap.orange.includes(damageType)) {
      return "text-orange-600";
    } else if (damageColorMap.red.includes(damageType)) {
      return "text-red-600";
    }
    return "text-black"; 
  };