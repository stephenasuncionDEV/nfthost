import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useWebsite } from "@/providers/WebsiteProvider";
import axios from "axios";
import errorHandler from "@/utils/errorHandler";

export const useAnalytics = () => {
  const toast = useToast({
    title: "Error",
    status: "error",
    duration: 3000,
    isClosable: true,
    position: "bottom",
  });
  const { websites } = useWebsite();
  const [isRetrieving, setIsRetrieving] = useState(false);
  const [websiteVisits, setWebsiteVisits] = useState([]);
  const [websiteUniqueVisits, setWebsiteUniqueVisits] = useState([]);
  const [websiteColors, setWebsiteColors] = useState([]);

  useEffect(() => {
    if (!websites) return;
    if (!websiteColors.length) return;
    getWebsiteVisitsByRoute();
    getWebsiteUniqueVisitsByRoute();
  }, [websites, websiteColors]);

  useEffect(() => {
    if (!websites) return;
    if (!websiteColors.length) {
      let newWebsiteColors = [];
      websites.forEach((web) => {
        newWebsiteColors.push({
          name: web.route,
          color: `hsla(${Math.floor(Math.random() * 360)}, 100%, 70%, 1)`,
        });
      });
      setWebsiteColors(newWebsiteColors);
    }
  }, [websites]);

  const getWebsiteVisitsByRoute = async () => {
    try {
      if (!websiteColors.length) return;

      setIsRetrieving(true);

      const res = await axios.get(
        "https://app.posthog.com/api/projects/9428/insights/849818",
        {
          headers: {
            Authorization: `Bearer ${process.env.POSTHOG_PERSONAL_KEY}`,
          },
        },
      );

      if (res.status !== 200)
        throw new Error("Cannot get minting website insights at the moment");
      if (!res.data.result) return;

      const { result } = res.data;

      const routesArr = websites.map((web) => web.route);
      const insights =
        result.filter((result) => routesArr.includes(result.breakdown_value)) ||
        [];

      const websiteVisits = insights.map((insight) => {
        return {
          name: insight.breakdown_value,
          visits: insight.aggregated_value,
          fill: websiteColors.find(
            (web) => web.name === insight.breakdown_value,
          ).color,
        };
      });

      setWebsiteVisits(websiteVisits);
      setIsRetrieving(false);
    } catch (err) {
      setIsRetrieving(false);
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };

  const getWebsiteUniqueVisitsByRoute = async () => {
    try {
      if (!websiteColors.length) return;

      setIsRetrieving(true);

      const res = await axios.get(
        "https://app.posthog.com/api/projects/9428/insights/850010",
        {
          headers: {
            Authorization: `Bearer ${process.env.POSTHOG_PERSONAL_KEY}`,
          },
        },
      );

      if (res.status !== 200)
        throw new Error("Cannot get minting website insights at the moment");
      if (!res.data.result) return;

      const { result } = res.data;

      const routesArr = websites.map((web) => web.route);
      const insights =
        result.filter((result) => routesArr.includes(result.breakdown_value)) ||
        [];

      const uniqueWebsiteVisits = insights.map((insight) => {
        return {
          name: insight.breakdown_value,
          visits: insight.aggregated_value,
          fill: websiteColors.find(
            (web) => web.name === insight.breakdown_value,
          ).color,
        };
      });

      setWebsiteUniqueVisits(uniqueWebsiteVisits);
      setIsRetrieving(false);
    } catch (err) {
      setIsRetrieving(false);
      const msg = errorHandler(err);
      toast({ description: msg });
    }
  };

  return {
    websiteVisits,
    websiteUniqueVisits,
    isRetrieving,
  };
};
