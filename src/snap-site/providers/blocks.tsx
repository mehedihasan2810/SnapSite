import React, { ReactNode, useContext } from "react";
import * as DEFAULT_BLOCKS from "../components";

const BlocksContext = React.createContext({});

export const useBlocks = () => {
  const value = useContext(BlocksContext);
  return value;
};

const BlocksProvider = ({
  children,
  blocks = DEFAULT_BLOCKS,
}: {
  children: ReactNode;
  blocks: any;
}) => (
  <BlocksContext.Provider value={blocks}>{children}</BlocksContext.Provider>
);

export default BlocksProvider;
