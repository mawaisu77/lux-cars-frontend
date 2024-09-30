
const damageOptions = [
    { id: "All Over", label: "All Over" },
    { id: "Biohazard/Chemical", label: "Biohazard/Chemical" },
    { id: "Burn", label: "Burn" },
    { id: "Burn - Engine", label: "Burn - Engine" },
    { id: "Burn - Interior", label: "Burn - Interior" },
    { id: "Cash For Clunkers", label: "Cash For Clunkers" },
    { id: "Damage History", label: "Damage History" },
    { id: "Electrical", label: "Electrical" },
    { id: "Engine Damage", label: "Engine Damage" },
    { id: "Frame Damage", label: "Frame Damage" },
    { id: "Front End", label: "Front End" },
    { id: "Front & Rear", label: "Front & Rear" },
    { id: "Hail", label: "Hail" },
    { id: "Mechanical", label: "Mechanical" },
    { id: "Minor Dent/Scratches", label: "Minor Dent/Scratches" },
    { id: "Missing/Altered VIN", label: "Missing/Altered VIN" },
    { id: "Normal Wear", label: "Normal Wear" },
    { id: "Partial Repair", label: "Partial Repair" },
    { id: "Rear End", label: "Rear End" },
    { id: "Rejected Repair", label: "Rejected Repair" },
    { id: "Replaced VIN", label: "Replaced VIN" },
    { id: "Repossession", label: "Repossession" },
    { id: "Rollover", label: "Rollover" },
    { id: "Side", label: "Side" },
    { id: "Storm Damage", label: "Storm Damage" },
    { id: "Stripped", label: "Stripped" },
    { id: "Suspension", label: "Suspension" },
    { id: "Theft", label: "Theft" },
    { id: "Transmission Damage", label: "Transmission Damage" },
    { id: "Vandalized", label: "Vandalized" },
    { id: "Top/Roof", label: "Top/Roof" },
    { id: "Undercarriage", label: "Undercarriage" },
    { id: "Unknown", label: "Unknown" },
    { id: "Water/Flood", label: "Water/Flood" },
  ];
  
// API key
const primaryDamageAPIKey = "damage_pr"; 
const secondaryDamageAPIKey = "damage_sec"; 
//Labels
const primaryDamageLabel = "Primary Damage"; 
const secondaryDamageLabel = "Secondary Damage"; 
  
 export { damageOptions, primaryDamageLabel,secondaryDamageLabel,primaryDamageAPIKey, secondaryDamageAPIKey };
  