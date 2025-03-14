 // Custom styles for React Select
 export const customStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: '#e5e7eb',
      minHeight: '36px',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#D0021B'
      }
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#D0021B' : state.isFocused ? '#ffe5e5' : null,
      color: state.isSelected ? 'white' : 'black',
    }),
  };