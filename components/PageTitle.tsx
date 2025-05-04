import React from 'react';

const PageTitle = ({ children }: { children: React.ReactNode }) => (
  <h1 className="text-3xl font-bold text-center text-gray-800">{children}</h1>
);

export default PageTitle;
