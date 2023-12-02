import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockPieData, mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import StatBox from "../../components/StatBox";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Person, ShoppingBasket } from "@mui/icons-material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts";
import { BarChart } from "@mui/x-charts/BarChart";
import Pie from "../../components/PieChart";
import { ResponsivePie } from "@nivo/pie";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState([]);
  const [totalUsers, setTotalUsers] = useState([]);
  const [departmentOrderPercentage, setDepartmentOrderPercentage] = useState(
    []
  );

  const headers = {
    method: "GET",
    headers: new Headers({
      "ngrok-skip-browser-warning": "69420",
    }),
  };
  const [percentageOrders, setPercentageOrders] = useState([
    {
      product_name: "Banana",
      count_of_ordering: 491291,
      percentage_of_ordering: 14.6825706356,
    },
  ]);
  const [rasioOrders, setRasioOrders] = useState([
    { id: 0, value: 1, label: "atleast one reorder", color: "#83A2FF" },
    { id: 1, value: 1, label: "no-reorder", color: "#4CCEAC" },
  ]);

  const [rasioByOrders, setRasioByOrders] = useState([
    {
      id: "rasio",
      color: tokens("dark").greenAccent[500],
      data: [],
    },
  ]);

  const [rasioAllOrders, setRasioAllOrders] = useState([
    {
      id: 0,
      value: 1,
      label: "not purely reordered",
      color: "#39A7FF",
    },
    { id: 1, value: 1, label: "reordered", color: "#FF6C22" },
  ]);

  const [reOrders, setReOrders] = useState([
    {
      bin: 0,
      count: 0,
    },
  ]);
  const [priorOrders, setPriorOrders] = useState([
    {
      bin: 0,
      count: 1,
    },
  ]);
  const [countOfOrdering, setCountOfOrdering] = useState([
    {
      count_of_ordering: 1,
      product_name: "",
    },
  ]);
  const [organicRatio, setOrganicRatio] = useState([
    {
      false: 89.86676863629044,
      true: 10.133231363709548,
    },
  ]);
  const [organicPurchaseFrequency, setOrganicPurchaseFrequency] = useState([
    {
      false: 68.4912191351244,
      true: 31.508780864875614,
    },
  ]);

  useEffect(() => {
    const fetchDataOrders = async () => {
      try {
        const response = await fetch(API_BASE_URL + "/api/orders", headers);
        const data = await response.json();

        setOrders(data.orders);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchDataCountOfOrdering = async () => {
      try {
        const response = await fetch(
          API_BASE_URL + "/api/count_of_ordering",
          headers
        );
        const data = await response.json();

        setCountOfOrdering(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchDataDepartmentOrderPercentage = async () => {
      try {
        const response = await fetch(
          API_BASE_URL + "/api/department_order_percentage",
          headers
        );
        const data = await response.json();
        console.log(data.data);
        setDepartmentOrderPercentage(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const ReorderedProducts = async () => {
      try {
        const response = await fetch(
          API_BASE_URL + "/api/reordered_products_histogram",
          headers
        );
        const data = await response.json();

        setReOrders(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const PriorDayOrders = async () => {
      try {
        const response = await fetch(
          API_BASE_URL + "/api/days_since_prior_order_histogram",
          headers
        );
        const data = await response.json();

        setPriorOrders(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const PercentageOrdersData = async () => {
      try {
        const response = await fetch(
          API_BASE_URL + "/api/percentage_of_ordering",
          headers
        );
        const data = await response.json();

        setPercentageOrders(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchTotalUserOrders = async () => {
      try {
        const response = await fetch(
          API_BASE_URL + "/api/total_orders_and_users",
          headers
        );
        const data = await response.json();
        setTotalOrders(data.data.total_orders);
        setTotalUsers(data.data.total_users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchRasioOrders = async () => {
      try {
        const response = await fetch(
          API_BASE_URL + "/api/rasio_pesanan",
          headers
        );
        const data = await response.json();

        const updatedChartData = rasioOrders.map((item) => {
          // Jika id sesuai, mengganti nilai value
          if (item.id === 0) {
            return { ...item, value: data.data.no_reordered[0] };
          }
          if (item.id === 1) {
            return { ...item, value: data.data.no_reordered[1] };
          }
          // Jika id tidak sesuai, tetap mempertahankan objek yang ada
          return item;
        });
        const updatedChartDataAll = rasioAllOrders.map((item) => {
          // Jika id sesuai, mengganti nilai value
          if (item.id === 0) {
            return { ...item, value: data.data.all_reordered[0] };
          }
          if (item.id === 1) {
            return { ...item, value: data.data.all_reordered[1] };
          }
          // Jika id tidak sesuai, tetap mempertahankan objek yang ada
          return item;
        });
        setRasioAllOrders(updatedChartDataAll);
        setRasioOrders(updatedChartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchRasioByOrders = async () => {
      try {
        const response = await fetch(
          API_BASE_URL + "/api/rasio_by_orders",
          headers
        );
        const data = await response.json();

        const transformedData = data.data.map((item) => ({
          x: item.add_to_cart_order,
          y: item.reordered_ratio,
        }));

        const updatedChartData = rasioByOrders.map((item) => {
          // Jika id sesuai, mengganti nilai value
          if (item.id === "rasio") {
            return { ...item, data: transformedData };
          }
          return item;
        });
        setRasioByOrders(updatedChartData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataCountOfOrdering();
    fetchDataDepartmentOrderPercentage();
    PercentageOrdersData();
    PriorDayOrders();
    ReorderedProducts();
    fetchRasioByOrders();
    fetchRasioOrders();
    fetchDataOrders();
    fetchTotalUserOrders();
  }, []);

  function formatNumberToK(number) {
    if (number >= 1000 && number < 1000000) {
      return (number / 1000).toFixed(2) + "K";
    } else if (number >= 1000000) {
      return (number / 1000000).toFixed(2) + "M";
    } else {
      return number.toString();
    }
  }

  const TOTAL = rasioOrders
    .map((item) => item.value)
    .reduce((a, b) => a + b, 0);

  const getArcLabel = (params) => {
    const percent = (params.value / TOTAL) * 100;
    return `${percent.toFixed(2)}%`;
  };
  console.log();
  return (
    <Box m="20px">
      {/* HEADER */}
      {/* <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box> */}

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          sx={{
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px;",
            borderRadius: 2,
          }}
          gridColumn="span 3"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={formatNumberToK(totalUsers)}
            subtitle="Total Users"
            progress="0.75"
            increase="+14%"
            icon={
              <Person
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          sx={{
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px;",
            borderRadius: 2,
          }}
          gridColumn="span 3"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={formatNumberToK(totalOrders)}
            subtitle="Total Orders"
            progress="0.75"
            increase="+14%"
            icon={
              <ShoppingBasket
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        <Box
          gridColumn="span 3"
          sx={{
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px;",
            borderRadius: 2,
          }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <PieChart
            series={[
              {
                data: rasioOrders,
                arcLabel: getArcLabel,
                arcLabelMinAngle: 45,
                highlightScope: { faded: "global", highlighted: "item" },
                innerRadius: 15,
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: "white",
                fontWeight: "bold",
                fontSize: 8,
              },
            }}
            slotProps={{
              legend: {
                labelStyle: {
                  fontSize: 10,
                },
              },
            }}
            height={100}
          />
        </Box>
        <Box
          gridColumn="span 3"
          sx={{
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px;",
            borderRadius: 2,
          }}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <PieChart
            series={[
              {
                data: rasioAllOrders,
                arcLabel: getArcLabel,
                arcLabelMinAngle: 45,
                highlightScope: { faded: "global", highlighted: "item" },
                innerRadius: 15,
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
              },
            ]}
            sx={{
              [`& .${pieArcLabelClasses.root}`]: {
                fill: "white",
                fontWeight: "bold",
                fontSize: 8,
              },
            }}
            slotProps={{
              legend: {
                labelStyle: {
                  fontSize: 10,
                },
              },
            }}
            height={100}
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          sx={{
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px;",
            borderRadius: 2,
          }}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Effect of reordered ratio on the product position in cart
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-25px 0 0 0">
            <LineChart
              isDashboard={true}
              data={rasioByOrders}
              xtitle={"position of product in cart"}
              ytitle={"reordered ratio of product in that position"}
            />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          sx={{
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px;",
            borderRadius: 2,
          }}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Count of reordered by order number
          </Typography>
          <Box height="250px" mt="-10px">
            <BarChart
              dataset={reOrders}
              xAxis={[
                {
                  dataKey: "bin",
                  scaleType: "band",
                },
              ]}
              series={[
                {
                  dataKey: "count",
                },
              ]}
              width={500}
            />
          </Box>
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          sx={{
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px;",
            borderRadius: 2,
          }}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Count of days_since_prior_order
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-25px 0 0 0">
            <BarChart
              dataset={priorOrders}
              xAxis={[
                {
                  dataKey: "bin",
                  scaleType: "band",
                },
              ]}
              series={[
                {
                  dataKey: "count",
                },
              ]}
            />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          sx={{
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px;",
            borderRadius: 2,
          }}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Count of reordered by day
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            height={"250px"}
          >
            <ResponsivePie
              data={mockPieData}
              theme={{
                axis: {
                  domain: {
                    line: {
                      stroke: colors.grey[100],
                    },
                  },
                  legend: {
                    text: {
                      fill: colors.grey[100],
                    },
                  },
                  ticks: {
                    line: {
                      stroke: colors.grey[100],
                      strokeWidth: 1,
                    },
                    text: {
                      fill: colors.grey[100],
                    },
                  },
                },
                legends: {
                  text: {
                    fill: colors.grey[100],
                  },
                },
              }}
              margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              borderColor={{
                from: "color",
                modifiers: [["darker", 0.2]],
              }}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsTextColor={colors.grey[100]}
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: "color" }}
              enableArcLabels={false}
              arcLabelsRadiusOffset={0.4}
              arcLabelsSkipAngle={7}
              arcLabelsTextColor={{
                from: "color",
                modifiers: [["darker", 2]],
              }}
              defs={[
                {
                  id: "dots",
                  type: "patternDots",
                  background: "inherit",
                  color: "rgba(255, 255, 255, 0.3)",
                  size: 4,
                  padding: 1,
                  stagger: true,
                },
                {
                  id: "lines",
                  type: "patternLines",
                  background: "inherit",
                  color: "rgba(255, 255, 255, 0.3)",
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10,
                },
              ]}
              legends={[
                {
                  anchor: "bottom",
                  direction: "row",
                  justify: false,
                  translateX: 10,
                  translateY: 56,
                  itemsSpacing: 0,
                  itemWidth: 55,
                  itemHeight: 18,
                  itemTextColor: "#999",
                  itemDirection: "left-to-right",
                  itemOpacity: 1,
                  symbolSize: 18,
                  symbolShape: "circle",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemTextColor: "#000",
                      },
                    },
                  ],
                },
              ]}
            />
          </Box>
        </Box>

        {/* ROW 4 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          sx={{
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px;",
            borderRadius: 2,
          }}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Percentage of ordering a product
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-25px 0 0 0">
            <BarChart
              dataset={percentageOrders}
              xAxis={[
                {
                  dataKey: "product_name",
                  scaleType: "band",
                },
              ]}
              series={[
                {
                  dataKey: "percentage_of_ordering",
                },
              ]}
            />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          sx={{
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px;",
            borderRadius: 2,
          }}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Ratio of department
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            height={"250px"}
          >
            <ResponsivePie
              data={departmentOrderPercentage}
              theme={{
                axis: {
                  domain: {
                    line: {
                      stroke: colors.grey[100],
                    },
                  },
                  legend: {
                    text: {
                      fill: colors.grey[100],
                    },
                  },
                  ticks: {
                    line: {
                      stroke: colors.grey[100],
                      strokeWidth: 1,
                    },
                    text: {
                      fill: colors.grey[100],
                    },
                  },
                },
                legends: {
                  text: {
                    fill: colors.grey[100],
                  },
                },
              }}
              margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              activeOuterRadiusOffset={8}
              borderColor={{
                from: "color",
                modifiers: [["darker", 0.2]],
              }}
              arcLinkLabelsSkipAngle={10}
              arcLinkLabelsTextColor={colors.grey[100]}
              arcLinkLabelsThickness={2}
              arcLinkLabelsColor={{ from: "color" }}
              enableArcLabels={false}
              arcLabelsRadiusOffset={0.4}
              arcLabelsSkipAngle={7}
              arcLabelsTextColor={{
                from: "color",
                modifiers: [["darker", 2]],
              }}
              defs={[
                {
                  id: "dots",
                  type: "patternDots",
                  background: "inherit",
                  color: "rgba(255, 255, 255, 0.3)",
                  size: 4,
                  padding: 1,
                  stagger: true,
                },
                {
                  id: "lines",
                  type: "patternLines",
                  background: "inherit",
                  color: "rgba(255, 255, 255, 0.3)",
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10,
                },
              ]}
              legends={[]}
            />
          </Box>
        </Box>

        {/* ROW 5 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          sx={{
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px;",
            borderRadius: 2,
          }}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Frequantly of buying organic products
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-25px 0 0 0">
            <BarChart
              dataset={organicPurchaseFrequency}
              xAxis={[{ scaleType: "band", data: [""] }]}
              series={[
                {
                  dataKey: "true",
                  label: "true",
                },
                {
                  dataKey: "false",
                  label: "false",
                },
              ]}
              slotProps={{
                legend: {
                  direction: "row",
                  position: { vertical: "bottom", horizontal: "middle" },
                  padding: 0,
                },
              }}
            />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          sx={{
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px;",
            borderRadius: 2,
          }}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Count of products
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-25px 0 0 0">
            <BarChart
              dataset={countOfOrdering}
              xAxis={[
                {
                  dataKey: "product_name",
                  scaleType: "band",
                },
              ]}
              series={[
                {
                  dataKey: "count_of_ordering",
                },
              ]}
            />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          sx={{
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px;",
            borderRadius: 2,
          }}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Ratio of organic products in supermarket
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-25px 0 0 0">
            <BarChart
              dataset={organicRatio}
              xAxis={[{ scaleType: "band", data: [""] }]}
              series={[
                {
                  dataKey: "true",
                  label: "true",
                },
                {
                  dataKey: "false",
                  label: "false",
                },
              ]}
              slotProps={{
                legend: {
                  direction: "row",
                  position: { vertical: "bottom", horizontal: "middle" },
                  padding: 0,
                },
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
