// FormRow.tsx
import React, { ReactNode } from 'react';

interface FormRowProps {
  children: ReactNode;
}

const FormRow: React.FC<FormRowProps> = ({ children }) => {
  return <div className="form-row">{children}</div>;
};

export default FormRow;
