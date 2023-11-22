import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
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

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState([]);
  const [totalUsers, setTotalUsers] = useState([]);
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

  useEffect(() => {
    const fetchDataOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/orders");
        const data = await response.json();

        setOrders(data.orders);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const ReorderedProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/reordered_products_histogram"
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
          "http://localhost:5000/api/days_since_prior_order_histogram"
        );
        const data = await response.json();

        setPriorOrders(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchTotalUserOrders = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/total_orders_and_users"
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
        const response = await fetch("http://localhost:5000/api/rasio_pesanan");
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
          "http://localhost:5000/api/rasio_by_orders"
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
            <Pie />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
