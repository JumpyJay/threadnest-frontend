import React, { createContext, useContext, useState } from "react";

interface TagContextProps {
  Tag: number | "";
  setLoggedTag: (Tag: number | "") => void;
}

const TagContext = createContext<TagContextProps | undefined>(undefined);

export const TagProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [Tag, setTag] = useState<number | "">(0);

  const setLoggedTag = (newTag: number | "") => {
    setTag(newTag);
  };

  return (
    <TagContext.Provider value={{ Tag, setLoggedTag }}>
      {children}
    </TagContext.Provider>
  );
};

export const useTag = (): TagContextProps => {
  const context = useContext(TagContext);
  if (!context) {
    throw new Error("useTag must be used within a TagProvider");
  }
  return context;
};
