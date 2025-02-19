import React from "react";

const ColorDescriptionComponent = ({ tooltipDescription, documentOldType }) => {
  return (
    <div style={{ whiteSpace: "pre-line", maxWidth: "300px" }}>
      <p>{tooltipDescription}</p>
      <br />
      {documentOldType?.label.includes("(P)") && (
        <p>
          Vehicles marked with (P) are awaiting further inspection to determine
          the full extent of damage and repair needs. This status also indicates
          a pending title, which may cause delays up to 30 days to retrieve.
          Storage fees may apply during this waiting period. Import to the
          Caribbean is not possible until the title is received, necessitating
          careful planning and consideration of potential delays.
        </p>
      )}
    </div>
  );
};

export default ColorDescriptionComponent;
