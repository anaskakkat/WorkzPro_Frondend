import React from "react";
import { Popover, Button } from "flowbite-react";

interface PopoverConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  children: React.ReactNode;
}

const PopoverConfirmation: React.FC<PopoverConfirmationProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  children,
}) => {
  return (
    <Popover
      open={isOpen}
      content={
        <div className="w-52  text-xs">
          <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
          </div>
          <div className="px-3 py-2">
            <p className="text-gray-400 ">{message}</p>
            <div className="mt-4 flex justify-end space-x-3"> 
              <Button size="xs" color="red" onClick={onClose}>
                No
              </Button>
              <Button size="xs" color="blue" onClick={onConfirm}>
                Yes
              </Button>
            </div>
          </div>
        </div>
      }
      placement="bottom"
      trigger="click"
    >
      {children}
    </Popover>
  );
};

export default PopoverConfirmation;
