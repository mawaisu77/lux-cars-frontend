import { greenProtectonColor, orangeProtectonColor, redProtectonColor } from "../../../utils/ProtectionColorCodes";

export const damageDescriptions = {
  "Minor Dent/Scratches": "Small cosmetic damage such as dents or scratches on the body of the vehicle.",
  "Hail": "Damage caused by hailstorms, often leaving small dimples on the surface.",
  "Normal Wear": "Typical wear and tear expected with the vehicle's age or usage.",
  "Electrical": "Issues related to electrical components.",
  "Rear": "Damage to the rear of the vehicle.",
  "Repossession": "Damage related to vehicle repossession.",
  "Damage History": "Prior damages or accidents reported for the vehicle.",
  "Rear End": "Damage to the back portion of the vehicle, including bumper or trunk area.",
  "Partial Repair": "Incomplete or subpar repair to a damaged area.",
  "Replaced VIN": "The vehicle identification number has been replaced or altered.",
  "Side": "Damage to the side panels or doors of the vehicle.",
  "Top/Roof": "Damage to the vehicle's roof, possibly from accidents, weather, or wear.",
  "Vandalism": "Damage caused intentionally by others, such as graffiti or broken windows.",
  "Theft": "Damage related to theft.",
  "Cash For Clunkers": "Damage related to the Cash for Clunkers program.",
  "Charity": "Damage related to charitable donations.",
  "Front": "Damage to the front of the vehicle.",
  "Front & Rear": "Damage to both front and rear.",
  "Front End": "Damage to the front end.",
  "Interior Damage": "Damage to the interior of the vehicle.",
  "Left & Right Side": "Damage to both left and right sides.",
  "Left Front": "Damage to the left front.",
  "Left Rear": "Damage to the left rear.",
  "Left Side": "Damage to the left side.",
  "None": "No damage reported.",
  "Right Front": "Damage to the right front.",
  "Right Rear": "Damage to the right rear.",
  "Right Side": "Damage to the right side.",
  "Roof": "Damage to the roof.",
  "Roof Damage": "Specific damage to the roof.",
  "Steering Column": "Issues with the steering column.",
  "Storm Damage": "Damage caused by storms.",
  "Strip": "Damage from stripping.",
  "Suspension": "Issues related to suspension.",
  "Vandalized": "Vandalized condition.",
  "Frame Damage": "Structural damage to the vehicle’s frame, which may affect the vehicle’s safety.",
  "Undercarriage Damage": "Damage to the underside of the vehicle, often due to rough terrain or accidents.",
  "Biohazard/Chemical": "Contamination by hazardous materials, such as toxic chemicals or biological agents.",
  "Burn": "Fire damage to any part of the vehicle.",
  "Burn - Engine": "Damage to the engine due to fire or overheating.",
  "Burn Engine":"Damage to the engine due to fire or overheating.",
  "Burn - Interior": "Damage to the interior of the vehicle from fire, including upholstery or dashboard.",
  "Mechanical": "Mechanical failure or damage affecting vehicle functionality.",
  "Missing/Altered VIN": "The VIN (Vehicle Identification Number) is missing or has been tampered with.",
  "Rejected Repair": "Repairs that were not approved or were inadequately performed.",
  "Rollover": "Damage caused by the vehicle overturning or flipping during an accident.",
  "Stripped": "Missing parts or components from the vehicle, often due to theft or damage.",
  "Water/Flood": "Damage caused by submersion or exposure to water, often leading to rust or electrical damage.",
  "Fire": "Fire damage.",
  "Collision": "Damage from a collision.",
  "Other": "Other types of severe damage.",
  "All Over": "Widespread damage.",
  "Bio Hazard": "Biohazard conditions.",
  "Biohazard": "Biohazard conditions.",
  "Engine": "Issues related to the engine.",
  "Engine Burn": "Burn damage to the engine.",
  "Engine Damage": "Damage to the engine.",
  "Exterior Burn": "Burn damage to the exterior.",
  "Flood": "Flood damage.",
  "Frame": "Issues related to the frame.",
  "Fresh Water": "Damage from fresh water.",
  "Interior Burn": "Burn damage to the interior.",
  "Possible Mech": "Possible mechanical issues.",
  "Roll Over": "Damage from rollover incidents.",
  "Rollover": "Damage from rollover incidents.",
  "Salt Water": "Damage from salt water.",
  "Structural": "Structural issues.",
  "Total Burn": "Total burn damage.",
  "Transmission Damage": "Damage to the transmission.",
  "Undercarriage": "Issues related to the undercarriage.",
  "Unknown": "Unknown issues.",
  "Water": "Water damage."
};
export const damageColorMap = {
    green: ["Minor Dent/Scratches","Hail", "Normal Wear", "Electrical", "Rear", "Repossession"], 
    orange: ["Damage History", "Rear End", "Partial Repair", "Replaced VIN", "Side", "Top/Roof", "Vandalism", "Theft", "Cash For Clunkers", "Charity","Front", "Front & Rear", "Front End", "Interior Damage", "Left & Right Side", "Left Front","Left Rear", "Left Side", "None", "Right Front", "Right Rear", "Right Side", "Roof", "Roof Damage", "Steering Column", "Storm Damage", "Strip", "Suspension", "Theft", "Vandalized"],                                                                           
    red: ["Frame Damage","Burn Engine" ,"Undercarriage Damage", "Biohazard/Chemical", "Burn", "Burn - Engine","Burn - Interior","Mechanical", "Missing/Altered VIN","Front End", "Rejected Repair", "Rollover", "Stripped", "Water/Flood", "Fire", "Collision", "Other", "All Over", "Bio Hazard", "Biohazard", "Engine", "Engine Burn", "Engine Damage", "Exterior Burn", "Flood", "Frame", "Fresh Water", "Interior Burn", "Mechanical", "Possible Mech", "Roll Over", "Rollover", "Salt Water", "Structural", "Total Burn", "Transmission Damage", "Undercarriage", "Unknown", "Water"], 
  };
  
  
  export const getDamageColorClass = (damageType) => {
    if (damageColorMap.green.includes(damageType)) {
      return greenProtectonColor;
    } else if (damageColorMap.orange.includes(damageType)) {
      return orangeProtectonColor;
    } else if (damageColorMap.red.includes(damageType)) {
      return redProtectonColor;
    }
    return ""; 
  };