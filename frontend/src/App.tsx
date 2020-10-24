import React from "react";

export const App: React.FC<{}> = ({ children }) => {
  return (
    <>
      <header>Rails TS React App</header>
      {children}
    </>
  );
};
