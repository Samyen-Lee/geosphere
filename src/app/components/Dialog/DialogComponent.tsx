import { classNames } from "../../../utils";
import { Dialog, DialogProps, Tab, Transition } from "@headlessui/react";
import { ElementType, FC, Fragment, PropsWithChildren, ReactElement, ReactNode, useState } from "react";
import VideoPlayer from "../Video/VideoPlayer";
import { useQuery } from "@tanstack/react-query";
import { getRessources } from "../../../request/query";
import Overlay from "../Overlay/Overlay";
import ContentPanel from "../ContentPanel/ContentPanel";
import DialogLayout from "../../layouts/DialogLayout/DialogLayout";
import { AnimatedSettingIcon, CalendarIcon, CloseIcon, NotificationOffIcon, UnchargedBatteryIcon } from "@assets/icons/SvgIcons";
import { MapFeature } from "@custom-types/MapSource";

type DialogComponentProps = {
  title: string;
  desc: string | undefined;
} & DialogProps<ElementType> & PropsWithChildren;

export const DialogComponent: FC<DialogComponentProps> = (props) => {
  const { open, onClose, title, desc, children } = props;
  // const [content, setContent] = useState(null);

  // const openContentPanel = (ressource) => {
  //   setContent(ressource);
  // };

  return (
    <DialogLayout onClose={onClose} open={open}>
      <Dialog.Panel className="md:w-4/5 sm:w-full min-h-96 flex flex-col max-h-full transform overflow-hidden rounded-2xl bg-white md:px-6 max-md:px-4 pt-8 pb-4 text-left align-middle shadow-xl transition-all">
        <button
          type="button"
          className="absolute top-2 right-2 border border-transparent text-sm font-medium"
          onClick={() => onClose(true)}
        >
          <CloseIcon/>
        </button>
        {title && <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900"
        >
          {title}
        </Dialog.Title>}
        {desc && <div className="mt-2">
          <p className="text-sm text-gray-500">
            {desc}
          </p>
        </div>}
        <div className="flex flex-col w-full px-2 max-md:px-0 py-3 sm:px-0 overflow-hidden">
          {children}
        </div>
      </Dialog.Panel>
    </DialogLayout>
  );
};
