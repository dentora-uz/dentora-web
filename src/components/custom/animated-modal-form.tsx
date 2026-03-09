// animated-modal-form.tsx
import React, { JSX } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
  ToggleModalButton,
} from "../ui/animated-modal";
import { useLang } from "@/hooks/use-lang";
import { cn } from "@/lib/utils";

export function AnimatedModalForm({
  text,
  icon,
  children,
  formId,
  isPending,
  onSave,
}: {
  text: string;
  isPending?: boolean;
  icon: React.ReactNode;
  children: JSX.Element;
  formId: string;
  onSave?: (setOpen: (open: boolean) => void) => void; // ✅ faqat setOpen kerak
}) {
  const { t } = useLang();
  return (
    <Modal>
      <ModalTrigger className="bg-blue-500 dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
        <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
          {text}
        </span>
        <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white dark:text-black z-20">
          {icon}
        </div>
      </ModalTrigger>
      <ModalBody>
        <ModalContent>{children}</ModalContent>
        <ModalFooter className="gap-4">
          {/* Cancel — default toggle */}
          <ToggleModalButton
            type="button"
            text={t.common.cancel}
            className="px-2 py-1 bg-blue-200 text-blue-500 dark:bg-black dark:border-black dark:text-white border border-blue-300 rounded-md text-sm w-28"
          />

          {/* Save — formni submit qiladi + onSave callback */}
          <ToggleModalButton
            type="submit"
            form={formId}
            text={isPending ? "Loading..." : t.common.save}
            toggleModal={onSave} // ✅ tashqaridan keladi
            disabled={isPending} // ✅ loading paytida disabled
            className={cn(
              "bg-blue-500 text-white dark:bg-white dark:text-black text-sm px-2 py-1 rounded-md border border-blue-500 w-28",
              isPending && "opacity-60 cursor-not-allowed", // ✅ loading style
            )}
          />
        </ModalFooter>
      </ModalBody>
    </Modal>
  );
}
