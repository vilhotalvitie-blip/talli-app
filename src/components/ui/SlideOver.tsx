import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface SlideOverProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  description?: string;
}

export function SlideOver({ open, onClose, children, title, description }: SlideOverProps) {
  return (
    <Dialog.Root open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              />
            </Dialog.Overlay>

            {/* Slide-over panel */}
            <Dialog.Content asChild>
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className={cn(
                  "fixed right-0 top-0 bottom-0 z-50",
                  "w-full md:w-[480px] lg:w-[560px]",
                  "bg-background shadow-2xl",
                  "flex flex-col"
                )}
              >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b">
                  <div>
                    <Dialog.Title className="text-lg font-semibold">
                      {title}
                    </Dialog.Title>
                    {description && (
                      <Dialog.Description className="text-sm text-muted-foreground">
                        {description}
                      </Dialog.Description>
                    )}
                  </div>
                  <Dialog.Close asChild>
                    <button
                      className={cn(
                        "rounded-full p-2 hover:bg-muted transition-colors",
                        "focus:outline-none focus:ring-2 focus:ring-ring"
                      )}
                      aria-label="Sulje"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </Dialog.Close>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                  {children}
                </div>
              </motion.div>
            </Dialog.Content>
          </>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
