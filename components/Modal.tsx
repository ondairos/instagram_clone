/* eslint-disable @next/next/no-img-element */
import { modalState } from "@/atoms/modalAtom";
import React, { Fragment, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { Dialog, Transition } from "@headlessui/react";
import { CameraIcon } from "@heroicons/react/outline";
import { db, storage } from "../firebase";
import { useSession } from "next-auth/react";
import {
  serverTimestamp,
  updateDoc,
  addDoc,
  collection,
  doc,
} from "firebase/firestore";
import { ref, getDownloadURL, uploadString } from "firebase/storage";

export default function Modal() {
  const { data: session } = useSession();
  // global state with recoil package
  const [open, setOpen] = useRecoilState(modalState);
  const filePickerRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState<string>("");
  const captionRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // upload picture function
  const uploadPost = async () => {
    // stop user for clicking many times
    if (loading) return;

    setLoading(true);

    // firebase v9
    // 1 Create post add to firestore 'posts' collection
    // 2 get post id for new post
    // 3 Upload image to firebase storage with the post id
    // 4 get a download image url from firebase storage and update original post

    const docRef = await addDoc(collection(db, "posts"), {
      // @ts-ignore
      username: session?.user?.username,
      // @ts-ignore
      caption: captionRef.current.value,
      // @ts-ignore
      profileImg: session?.user.image,
      timestamp: serverTimestamp(),
    });

    console.log(`New doc added with id: ${docRef.id}`);

    const imageRef = ref(storage, `posts/${docRef.id}/image`);
    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );

    setOpen(false);
    setLoading(false);
    setSelectedFile("");
  };

  // helper func addImageToPost
  const addImageToPost = (event: any) => {
    // filereader
    const reader = new FileReader();
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
    // getting the file in a way that we can store in state
    reader.onload = (readerEvent) => {
      // @ts-ignore
      setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    // headlessui
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* trick the broswer  to center the modal */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounder-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full">
              <div>
                {selectedFile ? (
                  <img
                    src={selectedFile}
                    className="w-full object-contain cursor-pointer"
                    onClick={
                      // @ts-ignore
                      () => setSelectedFile(null)
                    }
                    alt="image"
                  ></img>
                ) : (
                  <div
                    onClick={
                      // @ts-ignore
                      () => filePickerRef.current.click()
                    }
                    className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer"
                  >
                    <CameraIcon
                      className="h-6 w-6 text-red-600"
                      aria-hidden="true"
                    />
                  </div>
                )}

                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-bold text-gray-900"
                    >
                      Upload a photo
                    </Dialog.Title>
                    <div>
                      <input
                        type="file"
                        ref={filePickerRef}
                        hidden
                        onChange={addImageToPost}
                      />
                    </div>

                    <div className="mt-2">
                      <input
                        type="text"
                        className="border-none focus:ring-0 w-full text-center"
                        placeholder="Please enter a caption to your post..."
                        ref={captionRef}
                      />
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      disabled={!selectedFile}
                      onClick={uploadPost}
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                    >
                      {loading ? "Uploading..." : "Upload Post..."}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
