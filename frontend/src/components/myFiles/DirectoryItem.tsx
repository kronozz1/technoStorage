import { Directory } from "../../types";
import { GoFileDirectory, MdModeEdit } from "react-icons/all";
import { secondsToDate } from "../../utils/format";
import ItemRemove from "./ItemRemove";
import { useState } from "react";
import ItemFavorite from "./ItemFavorite";

type Props = {
  dir: Directory,
  openDirectory: Function,
  reloadList: Function
}

const DirectoryItem = ({dir, openDirectory, reloadList}: Props) => {
  const [isRemoval, setIsRemoval] = useState(false);


  const copyInputValue = () => {
    inputRef.current.select();
    document.execCommand('copy');
    setCopySuccess('Input value copied to clipboard!');
  };
  

  return (
    <div onDoubleClick={() => openDirectory()}
         className={`flex text-gray-600 cursor-default flex-row justify-between border-b py-2.5 
        text-sm px-4 gap-2 hover:bg-gray-50 ${isRemoval ? "opacity-50" : ""}`}>
      <div className={"w-10"}>
        <ItemFavorite
          isFavorite={dir.isFavorite}
          itemId={dir.id}
          itemType={'directory'}
          toggleFavorite={() => reloadList()}
        />
      </div>
      <div className={"flex-1 font-medium flex"}>
        <GoFileDirectory size={20} />
        <span className={"ml-2 text-gray-800"}>{dir.name}</span>
      </div>
      <div className={"w-32"}>&minus;</div>
      <div className={"w-20"}>&minus;</div>
      <div className={"w-20"}>{secondsToDate(dir.updatedAt)}</div>
      <div className={"w-32 justify-end flex gap-3"}>
      
        <ItemRemove
          idList={[dir.id]}
          itemType={"directory"}
          handleStartRemove={(status: boolean) => setIsRemoval(status)}
          handleSuccess={() => reloadList()}
        />
      </div>
    </div>
  );
};

export default DirectoryItem;