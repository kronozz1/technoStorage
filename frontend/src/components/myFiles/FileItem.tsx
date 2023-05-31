import { HiOutlineDownload, MdModeEdit ,AiOutlineCopy } from "react-icons/all";
import { useState,useRef,useEffect } from "react";
import { formatBytes, secondsToDate } from "../../utils/format";
import { File } from '../../types';
import ClipboardJS from 'clipboard';

import VirsionListPopup from "./VirsionListPopup";
import ItemRemove from "./ItemRemove";
// @ts-ignore
import ReactMimeIcons from 'react-mime-icons';
import ItemFavorite from "./ItemFavorite";

type Props = {
  file: File,
  reloadList: Function
};

const FileItem = ({file, reloadList}: Props) => {
  const [isRemoval, setIsRemoval] = useState(false);
 
  const linkRef = useRef(null);

  
  const getDownloadURL = () => {
    return `https://ipfs.io/ipfs/${file.ipfsHash}`;
  }
  useEffect(() => {
    const clipboard = new ClipboardJS(linkRef.current, {
      text: () => getDownloadURL()
    });

    clipboard.on('success', () => {
      alert('Link copied to clipboard!');
    });

    return () => {
      clipboard.destroy();
    };
  }, []);
  
  return (
    <div className={`flex text-gray-600 flex-row cursor-default justify-between border-b py-2.5 text-sm px-4 gap-2 hover:bg-gray-50
    ${isRemoval ? "opacity-50" : ""}`}>
      <div className={"w-10"}>
        <ItemFavorite
          isFavorite={file.isFavorite}
          itemId={file.id}
          itemType={'file'}
          toggleFavorite={() => reloadList()}
        />
      </div>
      <div className={"flex-1 font-medium flex pl-0.5"}>
        <ReactMimeIcons mimetype={file.mimeType} size={'1.05rem'} />
        <span className={"ml-2 text-gray-800 font-medium"}>{file.name}</span>
      </div>
      <div className={"w-32"}>{formatBytes(file.size)}</div>
      <div className={"w-20 flex"}>
        <VirsionListPopup file={file} />
      </div>
      <div className={"w-20"}>{secondsToDate(file.updatedAt)}</div>
      <div className={"w-32 justify-end flex gap-3"}>
        <a href={getDownloadURL()}  download={file.name} target={'_blank'}>
          <HiOutlineDownload
            size={20}
            title={"Download"}
            className={"cursor-pointer opacity-70 transition hover:opacity-100"}
          />
        </a>
  
        <a  ref={linkRef} download={file.name} target={'_blank'}>
          </a>
        <AiOutlineCopy
        
          size={20}
          title={"Copy"}
          className={"cursor-pointer opacity-70 transition hover:opacity-100"}
          onClick={() => linkRef.current.click()}
        />
        <ItemRemove
          idList={[file.id]}
          itemType={"file"}
          handleStartRemove={(status: boolean) => setIsRemoval(status)}
          handleSuccess={() => reloadList()}
        />
      </div>
    </div>
  );
};

export default FileItem;