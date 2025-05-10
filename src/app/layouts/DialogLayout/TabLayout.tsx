import { Tab } from "@headlessui/react";
import React from "react";

const TabLayout = () => {
  return (
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
        {datas.categories.map((_, idx) => (
          <Tab.Panel key={idx} className={classNames("overflow-hidden")}>
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
                  // onClick={(e) => openContentPanel(ressource)}
                >
                  <VideoPlayer src={ressource.source} autoPlay />
                </li>
              ))}
            </ul>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default TabLayout;
