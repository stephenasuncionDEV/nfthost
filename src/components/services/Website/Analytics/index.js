import NextLink from "next/link";
import { useState, useEffect } from "react";
import {
  Text,
  Flex,
  Button,
  VStack,
  useColorModeValue,
  Wrap,
  HStack,
  Divider,
  Spinner,
  Box,
  Center,
} from "@chakra-ui/react";
import { AiOutlineArrowLeft } from "@react-icons/all-files/ai/AiOutlineArrowLeft";
import { useWebsite } from "@/providers/WebsiteProvider";
import { useUser } from "@/providers/UserProvider";
import { useAnalytics } from "@/hooks/services/website/useAnalytics";
import { useWebsiteControls } from "@/hooks/services/website/useWebsiteControls";
import AutoSizer from "@/components/AutoSizer";
import { webColor } from "@/theme/index";
import {
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  LabelList,
  Bar,
  PieChart,
  Pie,
  Sector,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Flex
        flexDir="column"
        justifyContent="center"
        alignItems="center"
        w="200px"
        p=".25em"
      >
        <Text>
          {label}:{" "}
          <span style={{ color: "rgb(117,63,229)", fontWeight: "bold" }}>
            {payload[0].value}
          </span>
        </Text>
      </Flex>
    );
  }
  return null;
};

const renderCustomizedLabel = (props) => {
  const { x, y, width, value } = props;
  return (
    <g>
      <text
        x={x + width / 2}
        y={y - 10}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value.toString()}
      </text>
    </g>
  );
};

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 20) * cos;
  const my = cy + (outerRadius + 20) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={fill}
        fontSize="10pt"
      >
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#fff"
        fontSize="9pt"
      >
        Unique visits: {value}
      </text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#fff"
        fontSize="8pt"
      >
        (Rate ${(percent * 100).toFixed(2)}%)
      </text>
    </g>
  );
};

const Analytics = () => {
  const { isLoggedIn } = useUser();
  const { websites } = useWebsite();
  const { isRetrieving, websiteVisits, websiteUniqueVisits } = useAnalytics();
  const { getWebsites } = useWebsiteControls();
  const [uniqueWebsiteActiveIdx, setUniqueWebsiteActiveIdx] = useState(0);

  const containerColor = useColorModeValue(
    webColor.containerBg[0],
    webColor.containerBg[1],
  );

  useEffect(() => {
    if (!isLoggedIn) return;
    getWebsites();
  }, [isLoggedIn]);

  const onUniqueWebsiteEnter = (_, idx) => {
    setUniqueWebsiteActiveIdx(idx);
  };

  return (
    <>
      {websites?.length > 0 ? (
        <Flex flexDir="column" mt="1em" p="1em">
          <HStack alignItems="center" w="full" mt="1em">
            <Text fontSize="10pt">Analytics</Text>
            <Divider flex="1" />
          </HStack>
          <Text my=".5em" variant="subtle">
            Analytics for all your minting websites
          </Text>
          {websiteVisits.length > 0 && websiteVisits.length > 0 ? (
            <Wrap py="1em" spacing="2em">
              <Flex
                bg={containerColor}
                border="1px solid rgb(117,63,229)"
                pt="2em"
                pr="2em"
                flex="1"
                h="380px"
                alignItems="center"
                flexDir="column"
              >
                <Text mb="1em">Visits</Text>
                <AutoSizer flex="1" w="full">
                  {({ width, height }) => (
                    <BarChart
                      width={width}
                      height={height - 16}
                      data={websiteVisits}
                      is
                    >
                      <XAxis dataKey="name" stroke="#8884d8" />
                      <YAxis stroke="#8884d8" />
                      <Tooltip
                        content={<CustomTooltip />}
                        cursor={{ fill: "transparent" }}
                      />
                      <Bar
                        dataKey="visits"
                        barSize={30}
                        fill="#8884D8"
                        isAnimationActive={false}
                      >
                        <LabelList
                          dataKey="visits"
                          content={renderCustomizedLabel}
                        />
                      </Bar>
                    </BarChart>
                  )}
                </AutoSizer>
              </Flex>
              <Flex
                flexDir="column"
                bg={containerColor}
                border="1px solid rgb(117,63,229)"
                p="2em"
                flex="1"
                alignItems="center"
                maxW="470px"
              >
                <Text mb="1em">Unique Visits</Text>
                <Wrap justify="center" w="full">
                  <Flex>
                    <PieChart width={300} height={250}>
                      <Pie
                        data={websiteUniqueVisits}
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="visits"
                        activeShape={renderActiveShape}
                        activeIndex={uniqueWebsiteActiveIdx}
                        onMouseEnter={onUniqueWebsiteEnter}
                      ></Pie>
                    </PieChart>
                  </Flex>
                </Wrap>
                <VStack w="full" flex="1" alignItems="center" pt="2em">
                  {websiteUniqueVisits?.map((web, idx) => (
                    <HStack
                      p=".5em"
                      justifyContent="space-between"
                      key={idx}
                      w="full"
                      maxW="320px"
                    >
                      <HStack>
                        <Box
                          bg={web.fill}
                          w=".75em"
                          h=".75em"
                          borderRadius=".25em"
                        />
                        <Text>{web.name}</Text>
                      </HStack>
                      <Text fontWeight="bold">{web.visits}</Text>
                    </HStack>
                  ))}
                </VStack>
              </Flex>
            </Wrap>
          ) : (
            <Flex
              flexDir="column"
              justifyContent="center"
              alignItems="center"
              flex="1"
            >
              <Flex flexDir="column" alignItems="center" mt=".5em">
                <Text fontWeight="bold" fontSize="10pt">
                  Oops
                </Text>
                <Text fontSize="10pt" variant="subtle">
                  No data found for you minting website(s)
                </Text>
              </Flex>
            </Flex>
          )}
        </Flex>
      ) : (
        <>
          {isRetrieving ? (
            <Center>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="rgb(117,63,229)"
                size="lg"
              />
            </Center>
          ) : (
            <Flex
              flexDir="column"
              justifyContent="center"
              alignItems="center"
              flex="1"
            >
              <Flex flexDir="column" alignItems="center" mt=".5em">
                <Text fontWeight="bold" fontSize="10pt">
                  Error
                </Text>
                <Text fontSize="10pt" variant="subtle">
                  Please create a website first.
                </Text>
              </Flex>
              <NextLink href={`/dashboard/website`} shallow passHref>
                <Button
                  leftIcon={<AiOutlineArrowLeft />}
                  color="white"
                  variant="primary"
                  mt="1.5em"
                >
                  See Website List
                </Button>
              </NextLink>
            </Flex>
          )}
        </>
      )}
    </>
  );
};

export default Analytics;
