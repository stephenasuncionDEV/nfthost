import { useToast } from "@chakra-ui/react";
import errorHandler from "@/utils/errorHandler";

export const useCopy = ({ text }) => {
  const toast = useToast({
    title: "Error",
    status: "error",
    duration: 3000,
    isClosable: true,
    position: "bottom",
  });

  const onCopy = async () => {
    try {
      if (!text.length) throw new Error("text must not be empty");

      navigator.clipboard.writeText(text);

      toast({
        title: "Success",
        status: "success",
        description: "Successfully copied to clipboard",
      });
    } catch (err) {
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };

  return {
    onCopy,
  };
};
