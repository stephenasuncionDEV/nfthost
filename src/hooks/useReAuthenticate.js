import { useEffect } from "react";
import { useMemberControls } from "@/hooks/useMemberControls";
import { useRouter } from "next/router";
import { useUser } from "@/providers/UserProvider";
import { decryptToken } from "@/utils/tools";

export const useReAuthenticate = (protect = false, disable = false) => {
  const { isLoggedIn } = useUser();
  const { connect } = useMemberControls();
  const router = useRouter();

  useEffect(() => {
    if (disable || isLoggedIn) return;
    const storageToken = localStorage.getItem("nfthost-user");

    const ReAuthenticate = async () => {
      if (!storageToken) return;

      const userData = decryptToken(storageToken);
      const isConnected = await connect(userData.wallet);

      if (protect && !isConnected) {
        if (!isLoggedIn) router.push("/", undefined, { shallow: true });
      }
    };

    if (!storageToken && protect) {
      if (!isLoggedIn) router.push("/", undefined, { shallow: true });
    }

    ReAuthenticate();
  }, []);
};
