import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useUser } from "@/providers/UserProvider";
import { useCore } from "@/providers/CoreProvider";
import posthog from "posthog-js";
import errorHandler from "@/utils/errorHandler";

export const useLanding = () => {
  const toast = useToast({
    title: "Error",
    status: "error",
    duration: 3000,
    isClosable: true,
    position: "bottom",
  });
  const router = useRouter();
  const { setIsCookieModal, setIsServiceModal } = useCore();
  const { isLoggedIn } = useUser();

  const GetStarted = () => {
    try {
      if (!isLoggedIn) {
        router.push("/#connect", undefined, { shallow: true });
        throw new Error("You must connect your wallet");
      }

      posthog.capture("User clicked GetStarted on landing page");

      setIsServiceModal(true);
    } catch (err) {
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };

  const NavigateFeature = (route) => {
    try {
      if (!isLoggedIn) {
        router.push("/#connect", undefined, { shallow: true });
        throw new Error("You must connect your wallet");
      }

      posthog.capture("User clicked feature on landing page");

      router.push(route, undefined, { shallow: true });
    } catch (err) {
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };

  return {
    setIsCookieModal,
    GetStarted,
    NavigateFeature,
  };
};
