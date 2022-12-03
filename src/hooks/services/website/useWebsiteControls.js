import { useState, useRef } from "react";
import { useWebsite } from "@/providers/WebsiteProvider";
import { useMemberControls } from "@/hooks/useMemberControls";
import { usePaymentControls } from "@/hooks/usePaymentControls";
import { useToast } from "@chakra-ui/react";
import { useUser } from "@/providers/UserProvider";
import { getAccessToken } from "@/utils/tools";
import errorHandler from "@/utils/errorHandler";
import config from "@/config/index";
import posthog from "posthog-js";
import axios from "axios";

export const useWebsiteControls = () => {
  const toast = useToast({
    title: "Error",
    status: "error",
    duration: 3000,
    isClosable: true,
    position: "bottom",
  });
  const { pay } = usePaymentControls();
  const { user } = useUser();
  const {
    websites,
    setWebsites,
    setEditingWebsite,
    editingWebsite,
    userWebsite,
    setUserWebsite,
  } = useWebsite();
  const { getUserByAddress } = useMemberControls();
  const [isGettingWebsites, setIsGettingWebsites] = useState(false);
  const [isCreatingWebsite, setIsCreatingWebsite] = useState(false);
  const [isUpdatingWebsite, setIsUpdatingWebsite] = useState(false);
  const [isDeletingWebsite, setIsDeletingWebsite] = useState(false);
  const [creationInputState, setCreationInputState] = useState({});
  const [editInputState, setEditInputState] = useState({});
  const [userWebsiteErrors, setUserWebsiteErrors] = useState([]);
  const recaptchaRef = useRef();

  const getWebsiteByRoute = async (route) => {
    try {
      setIsGettingWebsites(true);

      const res = await axios.get(
        `${config.serverUrl}/api/website/getWebsiteByRoute`,
        {
          params: {
            route,
          },
          headers: {
            Authorization: `Bearer ${process.env.CREATE_WEBSITE_TOKEN}`,
          },
        },
      );

      if (res.status === 200) return;

      const {
        isExpired,
        isPublished,
        components: { title },
      } = res.data;

      let newUserWebsiteErrors = [];

      if (isExpired)
        newUserWebsiteErrors.push(
          `Error: '${title}' Minting Website has Expired. Go to website settings -> General -> Renew`,
        );
      if (!isPublished)
        newUserWebsiteErrors.push(
          `Error: '${title}' Minting Website is not Published yet. Go to website settings -> Advanced -> Publish`,
        );

      if (newUserWebsiteErrors.length > 0) {
        setUserWebsiteErrors(newUserWebsiteErrors);
        throw new Error(
          "If you are the owner of this minting website, please check your site settings",
        );
      }

      setUserWebsite(res.data);
      setIsGettingWebsites(false);
    } catch (err) {
      setIsGettingWebsites(false);
      const msg = errorHandler(err);
      //toast({ description: msg });
    }
  };

  const getWebsites = async () => {
    try {
      setIsGettingWebsites(true);

      const accessToken = getAccessToken();

      const res = await axios.get(
        `${config.serverUrl}/api/website/getWebsites`,
        {
          params: {
            memberId: user._id,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      setWebsites(res.data);
      setIsGettingWebsites(false);
    } catch (err) {
      setIsGettingWebsites(false);
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };

  const createWebsite = async ({
    route,
    title,
    description,
    logo,
    script,
    embed,
    favicon,
    robot,
    language,
    onClose,
  }) => {
    try {
      setIsCreatingWebsite(true);

      if (user.services.website.units !== 1) {
        const freeWebsiteCount = websites.filter(
          (web) => web.isPremium === false,
        ).length;
        if (freeWebsiteCount >= 1)
          throw new Error(
            "You have used your 1 Free minting website. Upgrade your subscription to create more.",
          );
      }

      let errorsObj = {};

      if (!route.length)
        errorsObj.route = {
          status: true,
          message: "Subdomain must be filled in",
        };
      if (route.length > 32)
        errorsObj.route = {
          status: true,
          message: "Max subdomain length is 32 characters",
        };
      if (/[^a-z0-9\-]/.test(route))
        errorsObj.route = {
          status: true,
          message: "Subdomain contains an invalid character",
        };
      if (!title.length)
        errorsObj.title = {
          status: true,
          message: "Title field must be filled in",
        };
      if (title.length > 32)
        errorsObj.title = {
          status: true,
          message: "Max title length is 32 characters",
        };
      if (!description.length)
        errorsObj.description = {
          status: true,
          message: "Description field must be filled in",
        };
      if (script.length > 0 && !(/</i.test(script) && />/i.test(script)))
        errorsObj.script = {
          status: true,
          message: "Script/Style code must be a valid html code",
        };
      if (!embed.length || !(/</i.test(embed) && />/i.test(embed)))
        errorsObj.embed = {
          status: true,
          message: "Embed code must be a valid html code",
        };
      if (!logo.length)
        errorsObj.logo = {
          status: true,
          message: "Logo Image Link field must be filled in",
        };
      if (logo.match(/\.(jpeg|jpg|gif|png|bmp|svg|webp)$/) == null)
        errorsObj.logo = {
          status: true,
          message: "Logo Image Link field must be an image file",
        };
      if (!favicon.length)
        errorsObj.favicon = {
          status: true,
          message: "Favicon Image Link field must be filled in",
        };
      if (favicon.match(/\.(jpeg|jpg|gif|png|bmp|svg|webp|ico)$/) == null)
        errorsObj.favicon = {
          status: true,
          message: "Favicon Link field must be an image file",
        };

      if (Object.keys(errorsObj).length > 0) {
        setCreationInputState(errorsObj);
        throw new Error("Please fix all the errors before creating a website");
      }

      if (!recaptchaRef.current.getValue().length)
        throw new Error("Please verify that you are a human.");

      const res = await axios.post(
        `${config.serverUrl}/api/website/create`,
        {
          memberId: user._id,
          route: route.toLowerCase(),
          components: {
            title,
            unrevealedImage: logo,
            description,
            embed,
            script,
          },
          meta: {
            robot,
            favicon,
            language,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.CREATE_WEBSITE_TOKEN}`,
          },
        },
      );

      if (res.status !== 200)
        throw new Error("Cannot create website at the moment");

      posthog.capture("User created a mint website");

      await getWebsites();

      toast({
        title: "Success",
        description: "Successfuly created a mint website",
        status: "success",
      });

      onClose();
      setIsCreatingWebsite(false);
    } catch (err) {
      setIsCreatingWebsite(false);
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };

  const editWebsite = (website) => {
    setEditingWebsite(website);
  };

  const updateTitle = async (title) => {
    try {
      setIsUpdatingWebsite(true);

      let errorsObj = { ...editInputState };

      if (title.length > 32)
        errorsObj.title = {
          status: true,
          message: "Max title length is 32 characters",
        };

      if (errorsObj.title) {
        setEditInputState(errorsObj);
        throw new Error("Please fix all the errors");
      }

      const accessToken = getAccessToken();

      const res = await axios.patch(
        `${config.serverUrl}/api/website/updateTitle`,
        {
          websiteId: editingWebsite._id,
          title,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.status !== 200)
        throw new Error("Cannot update website at the moment");

      setWebsites((prevWebsite) => {
        return prevWebsite.map((web) => {
          if (web._id === editingWebsite._id) {
            return {
              ...web,
              components: {
                ...web.components,
                title,
              },
            };
          }
          return web;
        });
      });

      setEditingWebsite((prevWebsite) => {
        return {
          ...prevWebsite,
          components: {
            ...prevWebsite.components,
            title,
          },
        };
      });

      toast({
        title: "Success",
        description: "Successfuly updated website's name",
        status: "success",
      });

      setIsUpdatingWebsite(false);
    } catch (err) {
      setIsUpdatingWebsite(false);
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };

  const updateDescription = async (description) => {
    try {
      setIsUpdatingWebsite(true);

      const accessToken = getAccessToken();

      const res = await axios.patch(
        `${config.serverUrl}/api/website/updateDescription`,
        {
          websiteId: editingWebsite._id,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.status !== 200)
        throw new Error("Cannot update website at the moment");

      setWebsites((prevWebsite) => {
        return prevWebsite.map((web) => {
          if (web._id === editingWebsite._id) {
            return {
              ...web,
              components: {
                ...web.components,
                description,
              },
            };
          }
          return web;
        });
      });

      setEditingWebsite((prevWebsite) => {
        return {
          ...prevWebsite,
          components: {
            ...prevWebsite.components,
            description,
          },
        };
      });

      toast({
        title: "Success",
        description: "Successfuly updated website's description",
        status: "success",
      });

      setIsUpdatingWebsite(false);
    } catch (err) {
      setIsUpdatingWebsite(false);
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };

  const updateLanguage = async (language) => {
    try {
      setIsUpdatingWebsite(true);

      const accessToken = getAccessToken();

      const res = await axios.patch(
        `${config.serverUrl}/api/website/updateLanguage`,
        {
          websiteId: editingWebsite._id,
          language,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.status !== 200)
        throw new Error("Cannot update website at the moment");

      setWebsites((prevWebsite) => {
        return prevWebsite.map((web) => {
          if (web._id === editingWebsite._id) {
            return {
              ...web,
              meta: {
                ...web.meta,
                language,
              },
            };
          }
          return web;
        });
      });

      setEditingWebsite((prevWebsite) => {
        return {
          ...prevWebsite,
          meta: {
            ...prevWebsite.meta,
            language,
          },
        };
      });

      toast({
        title: "Success",
        description: "Successfuly updated website's language metadata",
        status: "success",
      });

      setIsUpdatingWebsite(false);
    } catch (err) {
      setIsUpdatingWebsite(false);
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };

  const updateScript = async (script) => {
    try {
      setIsUpdatingWebsite(true);

      let errorsObj = { ...editInputState };

      if (script.length > 0 && !(/</i.test(script) && />/i.test(script)))
        errorsObj.script = {
          status: true,
          message: "Script/Style code must be a valid html code",
        };

      if (errorsObj.script) {
        setEditInputState(errorsObj);
        throw new Error("Please fix all the errors");
      }

      const accessToken = getAccessToken();

      const res = await axios.patch(
        `${config.serverUrl}/api/website/updateScript`,
        {
          websiteId: editingWebsite._id,
          script,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.status !== 200)
        throw new Error("Cannot update website at the moment");

      setWebsites((prevWebsite) => {
        return prevWebsite.map((web) => {
          if (web._id === editingWebsite._id) {
            return {
              ...web,
              components: {
                ...web.components,
                script,
              },
            };
          }
          return web;
        });
      });

      setEditingWebsite((prevWebsite) => {
        return {
          ...prevWebsite,
          components: {
            ...prevWebsite.components,
            script,
          },
        };
      });

      toast({
        title: "Success",
        description: "Successfuly updated website's styles/scripts code",
        status: "success",
      });

      setIsUpdatingWebsite(false);
    } catch (err) {
      setIsUpdatingWebsite(false);
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };

  const updateEmbed = async (embed) => {
    try {
      setIsUpdatingWebsite(true);

      let errorsObj = { ...editInputState };

      if (!(/</i.test(embed) && />/i.test(embed)))
        errorsObj.embed = {
          status: true,
          message: "Embed code must be a valid html code",
        };

      if (errorsObj.embed) {
        setEditInputState(errorsObj);
        throw new Error("Please fix all the errors");
      }

      const accessToken = getAccessToken();

      const res = await axios.patch(
        `${config.serverUrl}/api/website/updateEmbed`,
        {
          websiteId: editingWebsite._id,
          embed,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.status !== 200)
        throw new Error("Cannot update website at the moment");

      setWebsites((prevWebsite) => {
        return prevWebsite.map((web) => {
          if (web._id === editingWebsite._id) {
            return {
              ...web,
              components: {
                ...web.components,
                embed,
              },
            };
          }
          return web;
        });
      });

      setEditingWebsite((prevWebsite) => {
        return {
          ...prevWebsite,
          components: {
            ...prevWebsite.components,
            embed,
          },
        };
      });

      toast({
        title: "Success",
        description: "Successfuly updated website's embed code",
        status: "success",
      });

      setIsUpdatingWebsite(false);
    } catch (err) {
      setIsUpdatingWebsite(false);
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };

  const updateRobot = async (robot) => {
    try {
      setIsUpdatingWebsite(true);

      const accessToken = getAccessToken();

      const res = await axios.patch(
        `${config.serverUrl}/api/website/updateRobot`,
        {
          websiteId: editingWebsite._id,
          robot,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.status !== 200)
        throw new Error("Cannot update website at the moment");

      setWebsites((prevWebsite) => {
        return prevWebsite.map((web) => {
          if (web._id === editingWebsite._id) {
            return {
              ...web,
              meta: {
                ...web.meta,
                robot,
              },
            };
          }
          return web;
        });
      });

      setEditingWebsite((prevWebsite) => {
        return {
          ...prevWebsite,
          meta: {
            ...prevWebsite.meta,
            robot,
          },
        };
      });

      toast({
        title: "Success",
        description: "Successfuly updated website's robot metadata",
        status: "success",
      });

      setIsUpdatingWebsite(false);
    } catch (err) {
      setIsUpdatingWebsite(false);
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };

  const updateRoute = async (route) => {
    try {
      setIsUpdatingWebsite(true);

      let errorsObj = { ...editInputState };

      if (route.length > 32)
        errorsObj.route = {
          status: true,
          message: "Max subdomain length is 32 characters",
        };
      if (/[^a-z0-9\-]/.test(route))
        errorsObj.route = {
          status: true,
          message: "Subdomain contains an invalid character",
        };

      if (errorsObj.route) {
        setEditInputState(errorsObj);
        throw new Error("Please fix all the errors");
      }

      const accessToken = getAccessToken();

      const res = await axios.patch(
        `${config.serverUrl}/api/website/updateRoute`,
        {
          websiteId: editingWebsite._id,
          route: route.toLowerCase(),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.status !== 200)
        throw new Error("Cannot update website at the moment");

      setWebsites((prevWebsite) => {
        return prevWebsite.map((web) => {
          if (web._id === editingWebsite._id) {
            return {
              ...web,
              route,
            };
          }
          return web;
        });
      });

      setEditingWebsite((prevWebsite) => {
        return {
          ...prevWebsite,
          route,
        };
      });

      toast({
        title: "Success",
        description: "Successfuly updated website's subdomain",
        status: "success",
      });

      setIsUpdatingWebsite(false);
    } catch (err) {
      setIsUpdatingWebsite(false);
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };

  const updateIsPublished = async (isPublished) => {
    try {
      setIsUpdatingWebsite(true);

      const accessToken = getAccessToken();

      const res = await axios.patch(
        `${config.serverUrl}/api/website/updateIsPublished`,
        {
          websiteId: editingWebsite._id,
          isPublished,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.status !== 200)
        throw new Error("Cannot update website at the moment");

      setWebsites((prevWebsite) => {
        return prevWebsite.map((web) => {
          if (web._id === editingWebsite._id) {
            return {
              ...web,
              isPublished,
            };
          }
          return web;
        });
      });

      setEditingWebsite((prevWebsite) => {
        return {
          ...prevWebsite,
          isPublished,
        };
      });

      toast({
        title: "Success",
        description: "Successfuly published website",
        status: "success",
      });

      setIsUpdatingWebsite(false);
    } catch (err) {
      setIsUpdatingWebsite(false);
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };

  const deleteWebsite = async () => {
    try {
      setIsDeletingWebsite(true);

      const accessToken = getAccessToken();

      const res = await axios.delete(`${config.serverUrl}/api/website/delete`, {
        data: {
          websiteId: editingWebsite._id,
        },
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (res.status !== 200)
        throw new Error("Cannot delete website at the moment");

      posthog.capture("User deleted a mint website");

      setWebsites((prevWebsite) => {
        return prevWebsite.filter((web) => {
          return web._id !== editingWebsite._id;
        });
      });

      setEditingWebsite(null);

      toast({
        title: "Success",
        status: "success",
        description: "Successfully deleted website",
      });

      setIsDeletingWebsite(false);
    } catch (err) {
      setIsDeletingWebsite(false);
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };

  const updateTemplate = async (template) => {
    try {
      setIsUpdatingWebsite(true);

      const accessToken = getAccessToken();

      const res = await axios.patch(
        `${config.serverUrl}/api/website/updateTemplate`,
        {
          websiteId: editingWebsite._id,
          template,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.status !== 200)
        throw new Error("Cannot update website at the moment");

      setWebsites((prevWebsite) => {
        return prevWebsite.map((web) => {
          if (web._id === editingWebsite._id) {
            return {
              ...web,
              components: {
                ...web.components,
                template,
              },
            };
          }
          return web;
        });
      });

      setEditingWebsite((prevWebsite) => {
        return {
          ...prevWebsite,
          components: {
            ...prevWebsite.components,
            template,
          },
        };
      });

      toast({
        title: "Success",
        description: "Successfuly updated website's template",
        status: "success",
      });

      setIsUpdatingWebsite(false);
    } catch (err) {
      setIsUpdatingWebsite(false);
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };

  const updateFavicon = async (favicon) => {
    try {
      setIsUpdatingWebsite(true);

      let errorsObj = { ...editInputState };

      if (favicon.match(/\.(jpeg|jpg|gif|png|bmp|svg|webp|ico)$/) == null)
        errorsObj.favicon = {
          status: true,
          message: "Favicon field must be an image file",
        };

      if (errorsObj.favicon) {
        setEditInputState(errorsObj);
        throw new Error("Please fix all the errors");
      }

      const accessToken = getAccessToken();

      const res = await axios.patch(
        `${config.serverUrl}/api/website/updateFavicon`,
        {
          websiteId: editingWebsite._id,
          favicon,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.status !== 200)
        throw new Error("Cannot update website at the moment");

      setWebsites((prevWebsite) => {
        return prevWebsite.map((web) => {
          if (web._id === editingWebsite._id) {
            return {
              ...web,
              meta: {
                ...web.meta,
                favicon,
              },
            };
          }
          return web;
        });
      });

      setEditingWebsite((prevWebsite) => {
        return {
          ...prevWebsite,
          meta: {
            ...prevWebsite.meta,
            favicon,
          },
        };
      });

      toast({
        title: "Success",
        description: "Successfuly updated website's favicon",
        status: "success",
      });

      setIsUpdatingWebsite(false);
    } catch (err) {
      setIsUpdatingWebsite(false);
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };

  const updateLogo = async (logo) => {
    try {
      setIsUpdatingWebsite(true);

      let errorsObj = { ...editInputState };

      if (logo.match(/\.(jpeg|jpg|gif|png|bmp|svg|webp|ico)$/) == null)
        errorsObj.logo = {
          status: true,
          message: "Logo field must be an image file",
        };

      if (errorsObj.logo) {
        setEditInputState(errorsObj);
        throw new Error("Please fix all the errors");
      }

      const accessToken = getAccessToken();

      const res = await axios.patch(
        `${config.serverUrl}/api/website/updateLogo`,
        {
          websiteId: editingWebsite._id,
          logo,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.status !== 200)
        throw new Error("Cannot update website at the moment");

      setWebsites((prevWebsite) => {
        return prevWebsite.map((web) => {
          if (web._id === editingWebsite._id) {
            return {
              ...web,
              components: {
                ...web.components,
                unrevealedImage: logo,
              },
            };
          }
          return web;
        });
      });

      setEditingWebsite((prevWebsite) => {
        return {
          ...prevWebsite,
          components: {
            ...prevWebsite.components,
            unrevealedImage: logo,
          },
        };
      });

      toast({
        title: "Success",
        description: "Successfuly updated website's logo",
        status: "success",
      });

      setIsUpdatingWebsite(false);
    } catch (err) {
      setIsUpdatingWebsite(false);
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };

  const updateRevealDate = async (revealDate) => {
    try {
      setIsUpdatingWebsite(true);

      const newRevealDate = revealDate;

      const accessToken = getAccessToken();

      const res = await axios.patch(
        `${config.serverUrl}/api/website/updateRevealDate`,
        {
          websiteId: editingWebsite._id,
          revealDate: newRevealDate,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.status !== 200)
        throw new Error("Cannot update website at the moment");

      setWebsites((prevWebsite) => {
        return prevWebsite.map((web) => {
          if (web._id === editingWebsite._id) {
            return {
              ...web,
              revealDate: res.data.revealDate,
            };
          }
          return web;
        });
      });

      setEditingWebsite((prevWebsite) => {
        return {
          ...prevWebsite,
          revealDate: res.data.revealDate,
        };
      });

      toast({
        title: "Success",
        description: "Successfuly updated website's embed reveal date",
        status: "success",
      });

      setIsUpdatingWebsite(false);
    } catch (err) {
      setIsUpdatingWebsite(false);
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };

  const upgradeWebsiteToPremium = async () => {
    try {
      const newUser = await getUserByAddress(user.address);

      const websiteUnits = newUser.services.website.units;

      if (websiteUnits <= 0 || !websiteUnits) {
        pay({
          service: "Website",
          product: `Premium Minting Website`,
          redirect: {
            origin: "/dashboard/website",
            title: "Website",
          },
          data: {
            size: 1,
          },
        });
      }
    } catch (err) {
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };

  const updateSubscription = async ({
    memberId,
    subscriptionId,
    isPremium,
    isExpired,
    premiumStartDate,
    premiumEndDate,
    isPublished,
  }) => {
    try {
      const accessToken = getAccessToken();

      const res = await axios.patch(
        `${config.serverUrl}/api/website/updateSubscription`,
        {
          memberId,
          subscriptionId,
          isPremium,
          isExpired,
          isPublished,
          premiumStartDate,
          premiumEndDate,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.status !== 200) return;

      if (userWebsite) {
        setUserWebsite((prevUserWebsite) => {
          return {
            ...prevUserWebsite,
            isPremium,
            isExpired,
          };
        });
      }
    } catch (err) {
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };

  const checkSubscription = async () => {
    try {
      if (!userWebsite) return;
      if (!userWebsite.isPremium) return;

      const today = new Date();
      let premiumEndDate = new Date(userWebsite.premiumEndDate);

      if (userWebsite.premiumEndDate) {
        if (today > premiumEndDate) {
          await updateSubscription({
            memberId: userWebsite.memberId,
            subscriptionId: userWebsite.subscriptionId,
            isPremium: false,
            isExpired: true,
            isPublished: false,
            premiumStartDate: null,
            premiumEndDate: null,
          });
        }
      }

      // const accessToken = getAccessToken();

      // const res = await axios.get(`${config.serverUrl}/api/payment/getSubscription`, {
      //     params: {
      //         subscriptionId: userWebsite.subscriptionId
      //     },
      //     headers: {
      //         Authorization: `Bearer ${accessToken}`
      //     }
      // })

      // if (res.status !== 200) return;

      // const { cancel_at_period_end, cancel_at } = res.data;

      // if (cancel_at_period_end) {
      //     const cancelAt = new Date(cancel_at * 1000);
      //     const today = new Date();

      //     if (!userWebsite.premiumEndDate) {
      //         await updateSubscription({
      //             memberId: userWebsite.memberId,
      //             subscriptionId: userWebsite.subscriptionId,
      //             isPremium: userWebsite.isPremium,
      //             isExpired: userWebsite.isExpired,
      //             isPublished: userWebsite.isPublished,
      //             premiumStartDate: userWebsite.premiumStartDate,
      //             premiumEndDate: cancelAt
      //         })
      //     }

      //     if (today > cancelAt) {
      //         await updateSubscription({
      //             memberId: userWebsite.memberId,
      //             subscriptionId: userWebsite.subscriptionId,
      //             isPremium: false,
      //             isExpired: true,
      //             isPublished: false,
      //             premiumStartDate: null,
      //             premiumEndDate: null
      //         })
      //     }
      // }
    } catch (err) {
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };

  const updateExternalLink = async (social, link) => {
    try {
      try {
        setIsUpdatingWebsite(true);

        const accessToken = getAccessToken();

        const res = await axios.patch(
          `${config.serverUrl}/api/website/updateExternalLink`,
          {
            websiteId: editingWebsite._id,
            social,
            link,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        if (res.status !== 200)
          throw new Error("Cannot update website at the moment");

        setWebsites((prevWebsite) => {
          return prevWebsite.map((web) => {
            if (web._id === editingWebsite._id) {
              return {
                ...web,
                externalLinks: {
                  ...web.externalLinks,
                  [social]: link,
                },
              };
            }
            return web;
          });
        });

        setEditingWebsite((prevWebsite) => {
          return {
            ...prevWebsite,
            externalLinks: {
              ...prevWebsite.externalLinks,
              [social]: link,
            },
          };
        });

        toast({
          title: "Success",
          description: "Successfuly updated website's external link",
          status: "success",
        });

        setIsUpdatingWebsite(false);
      } catch (err) {
        setIsUpdatingWebsite(false);
        const msg = errorHandler(err);
        toast({ description: msg });
      }
    } catch (err) {
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };

  const updateDomain = async (domain) => {
    try {
      setIsUpdatingWebsite(true);

      if (!domain.trim().length) throw new Error("Enter a valid domain.");

      if (domain === editingWebsite?.custom?.domain) return;

      if (!domain.length || domain.split(".").length > 2)
        throw new Error("Enter a valid domain.");

      const accessToken = getAccessToken();

      const res = await axios.patch(
        `${config.serverUrl}/api/website/updateDomain`,
        {
          websiteId: editingWebsite._id,
          domain: domain.trim().toLowerCase(),
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (res.status !== 200)
        throw new Error("Cannot update website at the moment");

      setWebsites((prevWebsite) => {
        return prevWebsite.map((web) => {
          if (web._id === editingWebsite._id) {
            return {
              ...web,
              custom: {
                ...web.custom,
                domain,
              },
            };
          }
          return web;
        });
      });

      setEditingWebsite((prevWebsite) => {
        return {
          ...prevWebsite,
          custom: {
            ...prevWebsite.custom,
            domain,
          },
        };
      });

      toast({
        title: "Success",
        description: "Successfuly updated website's domain",
        status: "success",
      });

      setIsUpdatingWebsite(false);
    } catch (err) {
      setIsUpdatingWebsite(false);
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };

  return {
    getWebsiteByRoute,
    getWebsites,
    isGettingWebsites,
    createWebsite,
    isCreatingWebsite,
    recaptchaRef,
    creationInputState,
    editWebsite,
    editInputState,
    updateTitle,
    updateDescription,
    updateLanguage,
    updateScript,
    updateEmbed,
    updateRobot,
    updateRoute,
    updateIsPublished,
    updateTemplate,
    updateFavicon,
    updateLogo,
    updateRevealDate,
    updateDomain,
    isUpdatingWebsite,
    deleteWebsite,
    isDeletingWebsite,
    userWebsiteErrors,
    setUserWebsiteErrors,
    upgradeWebsiteToPremium,
    updateSubscription,
    updateExternalLink,
    checkSubscription,
  };
};
