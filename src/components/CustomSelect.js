import React, { useState } from 'react';

const Select = ({ options, onSelect }) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleChange = (event) => {
    const value = event.target.value;
    const selected = options.find((option) => option.value == value);
    setSelectedOption(selected);
    onSelect(selected);
  };

  return (
    <select value={selectedOption.value} onChange={handleChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
