import { classNames } from "../../../utils";
import { Dialog, DialogProps, Tab, Transition } from "@headlessui/react";
import { ElementType, FC, Fragment, useState } from "react";
import datas from "../../../datas/videos-collection.json";
import VideoPlayer from "../Video/VideoPlayer";

type DialogComponentProps = {
  coordinates: number[];
} & DialogProps<ElementType>;

export const DialogComponent: FC<DialogComponentProps> = ({
  open,
  coordinates,
  onClose,
  ...props
}) => {
  // let [categories] = useState({
  //   Recent: [
  //     {
  //       id: 1,
  //       title: "Does drinking coffee make you smarter?",
  //       date: "5h ago",
  //       commentCount: 5,
  //       shareCount: 2,
  //     },
  //     {
  //       id: 2,
  //       title: "So you've bought coffee... now what?",
  //       date: "2h ago",
  //       commentCount: 3,
  //       shareCount: 2,
  //     },
  //     {
  //       id: 1,
  //       title: "Is tech making coffee better or worse?",
  //       date: "Jan 7",
  //       commentCount: 29,
  //       shareCount: 16,
  //     },
  //     {
  //       id: 2,
  //       title: "The most innovative things happening in coffee",
  //       date: "Mar 19",
  //       commentCount: 24,
  //       shareCount: 12,
  //     },
  //     {
  //       id: 1,
  //       title: "Is tech making coffee better or worse?",
  //       date: "Jan 7",
  //       commentCount: 29,
  //       shareCount: 16,
  //     },
  //     {
  //       id: 2,
  //       title: "The most innovative things happening in coffee",
  //       date: "Mar 19",
  //       commentCount: 24,
  //       shareCount: 12,
  //     },
  //   ],
  //   Popular: [
  //     {
  //       id: 1,
  //       title: "Is tech making coffee better or worse?",
  //       date: "Jan 7",
  //       commentCount: 29,
  //       shareCount: 16,
  //     },
  //     {
  //       id: 2,
  //       title: "The most innovative things happening in coffee",
  //       date: "Mar 19",
  //       commentCount: 24,
  //       shareCount: 12,
  //     },
  //   ],
  //   Trending: [
  //     {
  //       id: 1,
  //       title: "Ask Me Anything: 10 answers to your questions about coffee",
  //       date: "2d ago",
  //       commentCount: 9,
  //       shareCount: 5,
  //     },
  //     {
  //       id: 2,
  //       title: "The worst advice we've ever heard about coffee",
  //       date: "4d ago",
  //       commentCount: 1,
  //       shareCount: 2,
  //     },
  //   ],
  // });
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose} {...props}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0">
          <div className="flex h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-4/5 flex flex-col max-h-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Sit, saepe non, mollitia illum et amet cum, rem dolores eius
                    laudantium doloremque iure reprehenderit sint deleniti at
                    nostrum veniam ad ab.
                  </p>
                </div>
                <div ></div>
                <div className="flex flex-col w-full px-2 py-3 sm:px-0 overflow-hidden">
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
                    <Tab.Panels className="mt-2 overflow-y-auto">
                      {datas.categories.map((posts, idx) => (
                        <Tab.Panel
                          key={idx}
                          className={classNames(
                          )}
                        >
                          <ul className="grid gap-0.06 sm:grid-cols-2 lg:grid-cols-3">
                            {posts.videos.map((post, id) => (
                              <li key={`post-${id}`} className="relative">
                                <VideoPlayer src={post.sources[0]} autoPlay/>
                              </li>
                            ))}
                          </ul>
                        </Tab.Panel>
                      ))}
                    </Tab.Panels>
                  </Tab.Group>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
