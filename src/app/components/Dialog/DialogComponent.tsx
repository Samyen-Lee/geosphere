import { Dialog, DialogProps, Tab, Transition } from "@headlessui/react";
import { ElementType, FC, Fragment, useState } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

type DialogComponentProps = {
    coordinates: number[];
} & DialogProps<ElementType>

export const DialogComponent: FC<DialogComponentProps> = ({
  open,
  coordinates,
  onClose,
  ...props
}) => {
  let [categories] = useState({
    Recent: [
      {
        id: 1,
        title: "Does drinking coffee make you smarter?",
        date: "5h ago",
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: "2h ago",
        commentCount: 3,
        shareCount: 2,
      },
    ],
    Popular: [
      {
        id: 1,
        title: "Is tech making coffee better or worse?",
        date: "Jan 7",
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: "The most innovative things happening in coffee",
        date: "Mar 19",
        commentCount: 24,
        shareCount: 12,
      },
    ],
    Trending: [
      {
        id: 1,
        title: "Ask Me Anything: 10 answers to your questions about coffee",
        date: "2d ago",
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: "4d ago",
        commentCount: 1,
        shareCount: 2,
      },
    ],
  });
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

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-4/5 transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <button
                  type="button"
                  className="inline-flex absolute top-2 right-2 justify-center border border-transparent text-sm font-medium text-blue-900"
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
                <div className="w-full px-2 py-8 sm:px-0">
                  <Tab.Group>
                    <Tab.List className="flex space-x-1 rounded-xl bg-slate-50 p-1">
                      {Object.keys(categories).map((category) => (
                        <Tab
                          key={category}
                          className={({ selected }) =>
                            classNames(
                              "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                              "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                              selected
                                ? "bg-white text-blue-700 shadow"
                                : "text-grey hover:bg-white/[0.12] hover:text-black"
                            )
                          }
                        >
                          {category}
                        </Tab>
                      ))}
                    </Tab.List>
                    <Tab.Panels className="mt-2">
                      {Object.values(categories).map((posts, idx) => (
                        <Tab.Panel
                          key={idx}
                          className={classNames(
                            "rounded-xl bg-white p-3",
                            "ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
                          )}
                        >
                          <ul>
                            {posts.map((post) => (
                              <li
                                key={post.id}
                                className="relative rounded-md p-3 hover:bg-gray-100"
                              >
                                <h3 className="text-sm font-medium leading-5">
                                  {post.title}
                                </h3>

                                <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                                  <li>{post.date}</li>
                                  <li>&middot;</li>
                                  <li>{post.commentCount} comments</li>
                                  <li>&middot;</li>
                                  <li>{post.shareCount} shares</li>
                                </ul>

                                <a
                                  href="#"
                                  className={classNames(
                                    "absolute inset-0 rounded-md",
                                    "ring-blue-400 focus:z-10 focus:outline-none focus:ring-2"
                                  )}
                                />
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
