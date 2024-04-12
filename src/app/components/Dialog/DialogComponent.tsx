import { classNames } from "../../../utils";
import { Dialog, DialogProps, Tab, Transition } from "@headlessui/react";
import { ElementType, FC, Fragment, useState } from "react";
import datas from "../../../datas/videos-collection.json";
import VideoPlayer from "../Video/VideoPlayer";
import { useQuery } from "@tanstack/react-query";
import { getRessources } from "../../../request/query";
import { MapFeature } from "@/types/MapSource";
import Overlay from "../Overlay/Overlay";
import ContentPanel from "../ContentPanel/ContentPanel";
import DialogLayout from "../../layouts/DialogLayout/DialogLayout";

type DialogComponentProps = {
  feature: MapFeature;
} & DialogProps<ElementType>;

export const DialogComponent: FC<DialogComponentProps> = ({
  open,
  feature,
  onClose,
  ...props
}) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["place-ressources", feature.id],
    queryFn: () => getRessources(feature),
  });
  const { ressources } = data || [];
  const [overlayActive, setOverlayActive] = useState(false);
  const [content, setContent] = useState(null);

  const onListItemHover = () => {
    setOverlayActive(true);
  };

  const onListItemLeave = () => {
    setOverlayActive(false);
  };

  const openContentPanel = (ressource) => {
    setContent(ressource);
  };

  return (
    <DialogLayout onClose={onClose} open={open}>
      <Dialog.Panel className="md:w-4/5 sm:w-full min-h-96 flex flex-col max-h-full transform overflow-hidden rounded-2xl bg-white md:px-6 max-md:px-4 pt-8 pb-4 text-left align-middle shadow-xl transition-all">
        <button
          type="button"
          className="absolute top-2 right-2 border border-transparent text-sm font-medium"
          onClick={() => onClose(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900"
        >
          Title
        </Dialog.Title>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, saepe
            non, mollitia illum et amet cum, rem dolores eius laudantium
            doloremque iure reprehenderit sint deleniti at nostrum veniam ad ab.
          </p>
        </div>
        <div></div>
        <div className="flex flex-col w-full px-2 max-md:px-0 py-3 sm:px-0 overflow-hidden">
          <Tab.Group>
            <Tab.List className="flex space-x-1 bg-slate-50 p-1">
              {datas.categories.map((category) => (
                <Tab
                  key={category.name}
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                      "ring-white/60 focus:outline-none focus:ring-2",
                      selected
                        ? "bg-white text-blue-700 shadow"
                        : "text-slate-500 hover:bg-white/[0.12] hover:text-black"
                    )
                  }
                >
                  {category.name}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels className="flex mt-2 overflow-hidden">
              {datas.categories.map((posts, idx) => (
                <Tab.Panel key={idx} className={classNames("overflow-hidden")}>
                  {/* <Overlay container="parent" isActive={overlayActive}> */}
                  <ul
                    data-te-infinite-scroll-init
                    className={classNames(
                      "grid divide-x divide-y sm:grid-cols-2 lg:grid-cols-3 overflow-y-auto max-h-full"
                    )}
                  >
                    {ressources?.map((ressource, id) => (
                      <li
                        key={`ressource-${id}`}
                        className={classNames(
                          "relative hover:grayscale-0 hover:z-50",
                          overlayActive ? "grayscale" : "grayscale-0"
                        )}
                        onMouseEnter={onListItemHover}
                        onMouseLeave={onListItemLeave}
                        onClick={(e) => openContentPanel(ressource)}
                      >
                        <VideoPlayer src={ressource.source} autoPlay />
                      </li>
                    ))}

                    {/* {posts?.videos?.map((ressource, id) => (
                              <li key={`post-${id}`} className="relative">
                                <VideoPlayer src={ressource.sources[0]} autoPlay/>
                              </li>
                            ))} */}
                  </ul>
                  {/* </Overlay> */}
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </Dialog.Panel>
    </DialogLayout>
  );
};
