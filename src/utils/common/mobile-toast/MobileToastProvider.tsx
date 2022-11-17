import { FunctionComponent as FC } from "react";
import useMobileToast from "./store/useMobileToast";
import { motion } from "framer-motion";

interface MobileToastProviderProps {
  children: React.ReactNode;
}

const MobileToastProvider: FC<MobileToastProviderProps> = ({
  children: app,
}) => {
  const { children: content, isOpen, open, currentTimeout } = useMobileToast();

  return (
    <div className="relative z-0 min-h-screen">
      <div className="z-0">{app}</div>
      {isOpen && (
        <motion.aside
          className="fixed z-10 top-3/4 -translate-y-1/2 left-1/2 -translate-x-1/2 min-w-[50vw] bg-black bg-opacity-70 text-white rounded px-2 py-1 text-center"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
        >
          {content}
        </motion.aside>
      )}
    </div>
  );
};

export default MobileToastProvider;
