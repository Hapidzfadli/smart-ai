import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Person, ShoppingBasket } from "@mui/icons-material";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts";

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

  const mockLineData = [
    {
      id: "rasio",
      color: tokens("dark").greenAccent[500],
      data: [
        {
          x: 1,
          y: 0.6793017388,
        },
        {
          x: 2,
          y: 0.6771351992,
        },
        {
          x: 3,
          y: 0.6584257239,
        },
        {
          x: 4,
          y: 0.6373498099,
        },
        {
          x: 5,
          y: 0.6175977379,
        },
        {
          x: 6,
          y: 0.6006028943,
        },
        {
          x: 7,
          y: 0.5858096176,
        },
        {
          x: 8,
          y: 0.5734947287,
        },
        {
          x: 9,
          y: 0.5616814525,
        },
        {
          x: 10,
          y: 0.5514497522,
        },
        {
          x: 11,
          y: 0.5413265423,
        },
        {
          x: 12,
          y: 0.5330043449,
        },
        {
          x: 13,
          y: 0.5252339937,
        },
        {
          x: 14,
          y: 0.51680593,
        },
        {
          x: 15,
          y: 0.5096210867,
        },
        {
          x: 16,
          y: 0.5032706692,
        },
        {
          x: 17,
          y: 0.496396551,
        },
        {
          x: 18,
          y: 0.491080836,
        },
        {
          x: 19,
          y: 0.4853539664,
        },
        {
          x: 20,
          y: 0.480582643,
        },
        {
          x: 21,
          y: 0.4754962262,
        },
        {
          x: 22,
          y: 0.4707236374,
        },
        {
          x: 23,
          y: 0.4662487292,
        },
        {
          x: 24,
          y: 0.4601765987,
        },
        {
          x: 25,
          y: 0.457153658,
        },
        {
          x: 26,
          y: 0.4539050148,
        },
        {
          x: 27,
          y: 0.4489613459,
        },
        {
          x: 28,
          y: 0.4432626043,
        },
        {
          x: 29,
          y: 0.4415708103,
        },
        {
          x: 30,
          y: 0.4399371536,
        },
        {
          x: 31,
          y: 0.4342440749,
        },
        {
          x: 32,
          y: 0.4290386538,
        },
        {
          x: 33,
          y: 0.4259980622,
        },
        {
          x: 34,
          y: 0.4271671755,
        },
        {
          x: 35,
          y: 0.42085141,
        },
        {
          x: 36,
          y: 0.4207596386,
        },
        {
          x: 37,
          y: 0.4178380999,
        },
        {
          x: 38,
          y: 0.4126389192,
        },
        {
          x: 39,
          y: 0.4149913256,
        },
        {
          x: 40,
          y: 0.4085579956,
        },
        {
          x: 41,
          y: 0.4103381375,
        },
        {
          x: 42,
          y: 0.4099805888,
        },
        {
          x: 43,
          y: 0.4012601091,
        },
        {
          x: 44,
          y: 0.4029736526,
        },
        {
          x: 45,
          y: 0.4109169749,
        },
        {
          x: 46,
          y: 0.3970872344,
        },
        {
          x: 47,
          y: 0.403560318,
        },
        {
          x: 48,
          y: 0.3940728875,
        },
        {
          x: 49,
          y: 0.4051446945,
        },
        {
          x: 50,
          y: 0.4,
        },
        {
          x: 51,
          y: 0.4057971014,
        },
        {
          x: 52,
          y: 0.3946902655,
        },
        {
          x: 53,
          y: 0.3969030155,
        },
        {
          x: 54,
          y: 0.4245810056,
        },
        {
          x: 55,
          y: 0.4359526372,
        },
        {
          x: 56,
          y: 0.4081381011,
        },
        {
          x: 57,
          y: 0.416144746,
        },
        {
          x: 58,
          y: 0.4182389937,
        },
        {
          x: 59,
          y: 0.4373865699,
        },
        {
          x: 60,
          y: 0.4239019408,
        },
        {
          x: 61,
          y: 0.3905882353,
        },
        {
          x: 62,
          y: 0.4042838019,
        },
        {
          x: 63,
          y: 0.3969924812,
        },
        {
          x: 64,
          y: 0.4114671164,
        },
        {
          x: 65,
          y: 0.3966165414,
        },
        {
          x: 66,
          y: 0.4033613445,
        },
        {
          x: 67,
          y: 0.3929411765,
        },
        {
          x: 68,
          y: 0.3947368421,
        },
        {
          x: 69,
          y: 0.4041297935,
        },
        {
          x: 70,
          y: 0.4222222222,
        },
        {
          x: 71,
          y: 0.4136690647,
        },
        {
          x: 72,
          y: 0.3790322581,
        },
        {
          x: 73,
          y: 0.4215246637,
        },
        {
          x: 74,
          y: 0.4577114428,
        },
        {
          x: 75,
          y: 0.4171428571,
        },
        {
          x: 76,
          y: 0.4242424242,
        },
        {
          x: 77,
          y: 0.4605263158,
        },
        {
          x: 78,
          y: 0.4485294118,
        },
        {
          x: 79,
          y: 0.4881889764,
        },
        {
          x: 80,
          y: 0.4416666667,
        },
        {
          x: 81,
          y: 0.4414414414,
        },
        {
          x: 82,
          y: 0.4622641509,
        },
        {
          x: 83,
          y: 0.4845360825,
        },
        {
          x: 84,
          y: 0.4086021505,
        },
        {
          x: 85,
          y: 0.4578313253,
        },
        {
          x: 86,
          y: 0.4358974359,
        },
        {
          x: 87,
          y: 0.4507042254,
        },
        {
          x: 88,
          y: 0.447761194,
        },
        {
          x: 89,
          y: 0.4833333333,
        },
        {
          x: 90,
          y: 0.4464285714,
        },
        {
          x: 91,
          y: 0.4,
        },
        {
          x: 92,
          y: 0.568627451,
        },
        {
          x: 93,
          y: 0.5714285714,
        },
        {
          x: 94,
          y: 0.5,
        },
        {
          x: 95,
          y: 0.5135135135,
        },
        {
          x: 96,
          y: 0.6363636364,
        },
        {
          x: 97,
          y: 0.6,
        },
        {
          x: 98,
          y: 0.5666666667,
        },
        {
          x: 99,
          y: 0.4615384615,
        },
        {
          x: 100,
          y: 0.4166666667,
        },
        {
          x: 101,
          y: 0.35,
        },
        {
          x: 102,
          y: 0.3888888889,
        },
        {
          x: 103,
          y: 0.4,
        },
        {
          x: 104,
          y: 0.4,
        },
        {
          x: 105,
          y: 0.3846153846,
        },
        {
          x: 106,
          y: 0.5,
        },
        {
          x: 107,
          y: 0.5,
        },
        {
          x: 108,
          y: 0.25,
        },
        {
          x: 109,
          y: 0.2,
        },
        {
          x: 110,
          y: 0.25,
        },
        {
          x: 111,
          y: 0.375,
        },
        {
          x: 112,
          y: 0.375,
        },
        {
          x: 113,
          y: 0.2857142857,
        },
        {
          x: 114,
          y: 0.2857142857,
        },
        {
          x: 115,
          y: 0.5,
        },
        {
          x: 116,
          y: 0.4,
        },
        {
          x: 117,
          y: 0.25,
        },
        {
          x: 118,
          y: 0.25,
        },
        {
          x: 119,
          y: 0.0,
        },
        {
          x: 120,
          y: 0.25,
        },
        {
          x: 121,
          y: 0.25,
        },
        {
          x: 122,
          y: 0.0,
        },
        {
          x: 123,
          y: 0.3333333333,
        },
        {
          x: 124,
          y: 0.3333333333,
        },
        {
          x: 125,
          y: 0.3333333333,
        },
        {
          x: 126,
          y: 0.3333333333,
        },
        {
          x: 127,
          y: 0.3333333333,
        },
        {
          x: 128,
          y: 0.5,
        },
        {
          x: 129,
          y: 0.5,
        },
        {
          x: 130,
          y: 0.5,
        },
        {
          x: 131,
          y: 0.5,
        },
        {
          x: 132,
          y: 0.0,
        },
        {
          x: 133,
          y: 0.5,
        },
        {
          x: 134,
          y: 0.5,
        },
        {
          x: 135,
          y: 0.5,
        },
        {
          x: 136,
          y: 0.5,
        },
        {
          x: 137,
          y: 0.5,
        },
        {
          x: 138,
          y: 0.0,
        },
        {
          x: 139,
          y: 0.0,
        },
        {
          x: 140,
          y: 0.0,
        },
        {
          x: 141,
          y: 0.0,
        },
        {
          x: 142,
          y: 0.0,
        },
        {
          x: 143,
          y: 0.0,
        },
        {
          x: 144,
          y: 0.0,
        },
        {
          x: 145,
          y: 0.0,
        },
      ],
    },
  ];
  const [rasioAllOrders, setRasioAllOrders] = useState([
    {
      id: 0,
      value: 1,
      label: "not purely reordered",
      color: "#39A7FF",
    },
    { id: 1, value: 1, label: "reordered", color: "#FF6C22" },
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
        console.log(data);

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
          <Box height="250px" m="-20px 0 0 0">
            <LineChart
              isDashboard={true}
              data={mockLineData}
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
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Transactions
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
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
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
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
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          sx={{
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px;",
            borderRadius: 2,
          }}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
