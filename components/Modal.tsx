import { modalState } from "@/atoms/modalAtom";
import React from "react";
import { useRecoilState } from "recoil";

export default function Modal() {
  // global state with recoil package
  const [open, setOpen] = useRecoilState(modalState);
  return (
    <div>
      <p>Modal</p>

      {open && <p>The modal is open!!!</p>}
    </div>
  );
}
