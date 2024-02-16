import { ReactNode, createContext, useContext, useState } from "react";

type Props = {
  children: ReactNode;
};

const CanvasContext = createContext({});

export const useCanvas = () => useContext(CanvasContext);

const CanvasProvider = ({ children }: Props) => {
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  return (
    <CanvasContext.Provider
      value={{
        canvasSize,
        setCanvasSize,
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

export default CanvasProvider;
