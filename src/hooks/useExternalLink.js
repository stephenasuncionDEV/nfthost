import { useRouter } from "next/router";

export const useExternalLink = () => {
  const router = useRouter();

  const toDiscord = () => {
    router.push("https://discord.gg/2BDzCvSTVc");
  };

  const toGitHub = () => {
    router.push("https://github.com/stephenasuncionDEV/nfthost");
  };

  const toTiktok = () => {
    router.push("https://www.tiktok.com/@nfthostofficial");
  };

  return {
    toDiscord,
    toGitHub,
    toTiktok,
  };
};
