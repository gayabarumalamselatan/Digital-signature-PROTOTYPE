import { Assignment, AssignmentTurnedIn, CheckCircle, HourglassEmpty, Verified } from "@mui/icons-material";
import { Box, Card, CardContent, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import "chart.js/auto";
import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import Sidebar from "../Sidebar";
import Create from "./Create";
import Report from "./Report";
import PdfViewer from "./Text Editor/PdfViewer";
import View from "./View";

const Home = () => {
  const summaryData = [
    { label: "REJECTED", value: 0, color: "#FF5722", icon: <Assignment color="error" /> },
    { label: "Need Verify", value: 16, color: "#FFC107", icon: <HourglassEmpty color="warning" /> },
    { label: "Need Settlement", value: 2, color: "#03A9F4", icon: <AssignmentTurnedIn color="info" /> },
    { label: "Need Approve", value: 1, color: "#FF9800", icon: <Verified color="action" /> },
    { label: "Approved", value: 31, color: "#4CAF50", icon: <CheckCircle color="success" /> },
  ];

  // const [currentPage, setCurrentPage] = useState();
  const [page, setPage] = useState(window.location.hash);

  // useEffect(() => {
  //   const handleHashChange = () => {
  //     setPage(window.location.hash);
  //   };
  //   window.addEventListener('hashchange', handleHashChange);

  //   return () => {
  //     window.removeEventListener('hashchange', handleHashChange);
  //   };
  // }, []);

  // history api
  useEffect(() => {
    const handlePopState = () => {
      setPage(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setPage(path);
  };

  // const navigateTo = (page) => {
  //   setCurrentPage(page);
  // };

    // const handleRefresh = () => {
    //   window.location.reload();
    // };

    const handleRefresh = () => {
      window.history.replaceState({}, '', '/');
      setPage('/home');
    };

    if (page === '/create'){
      return(
        <div className="text-end" >
          <button className="btn btn-primary"  onClick={handleRefresh}>back</button>
          <Create  />
        </div> 
      );
    } else if (page === '/view'){
      return (
        <div className="text-end">
          <button className="btn btn-primary" onClick={handleRefresh}>back</button>
          <View/>
        </div>
      )
      ;
    } else if (page === '/report'){
      return (
        <div className="text-end">
          <button className="btn btn-primary" onClick={handleRefresh}>back</button>
            <Report/>
        </div>
      );
    } else if (page === '/pdf'){
      return(
        <div className="text-end">
          <button className="btn btn-primary" onClick={handleRefresh}>back</button>
          <PdfViewer/>
        </div>
      );
    } else if(page === '/home'){
      return(
        <>
          <Home/>
        </>
      )
    }

  // if (currentPage === 'create'){
  //   return(
  //     <div className="text-end" >
  //       <button className="btn btn-primary"  onClick={handleRefresh}>back</button>
  //       <Create navigateTo={navigateTo} />
  //     </div> 
  //   );
  // } else if (currentPage === 'view'){
  //   return (
  //     <div className="text-end">
  //       <button className="btn btn-primary" onClick={handleRefresh}>back</button>
  //       <View navigateTo={navigateTo} />
  //     </div>
  //   )
  //   ;
  // } else if (currentPage === 'report'){
  //   return (
  //     <div className="text-end">
  //       <button className="btn btn-primary" onClick={handleRefresh}>back</button>
  //         <Report navigateTo={navigateTo} />
  //     </div>
  //   );
  // } else if (currentPage === 'pdf'){
  //   return(
  //     <div className="text-end">
  //       <button className="btn btn-primary" onClick={handleRefresh}>back</button>
  //       <PdfViewer navigateTo={navigateTo} />
  //     </div>
  //   );
  // }

  // const transactionData = [
  //   { status: "APPROVED", jumlah: 31, link: () => navigateTo('create'), href: '#create' },
  //   { status: "PENDING", jumlah: 16, link: () => navigateTo('view'), href:"#view" },
  //   { status: "REWORK", jumlah: 1, link: () => navigateTo('report') },
  //   { status: "VERIFIED", jumlah: 3, link: () => navigateTo('pdf') },
  // ];

  const transactionData = [
    { status: "APPROVED", jumlah: 31, href: '/create' },
    { status: "PENDING", jumlah: 16, href:"/view" },
    { status: "REWORK", jumlah: 1, href: "/report" },
    { status: "VERIFIED", jumlah: 3, href:"/pdf" },
  ];

  // hash routing
  
  

  const chartData = {
    labels: ["APPROVED", "PENDING", "VERIFIED", "REWORK"],
    datasets: [
      {
        data: [31, 16, 3, 1],
        backgroundColor: ["#4CAF50", "#FFC107", "#03A9F4", "#FF5722"],
        hoverBackgroundColor: ["#388E3C", "#FFA000", "#0288D1", "#E64A19"],
        borderWidth: 2,
        hoverBorderColor: ["#2E7D32", "#F57C00", "#0277BD", "#D84315"],
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw} transactions`;
          },
        },
      },
    },
    animation: {
      animateScale: false,
      animateRotate: true,
    },
  };

  return (
    <>
      <Sidebar/>
      <h1>Dashboard</h1>
      <Container maxWidth= 'auto'>
        <Grid container spacing={3}>
          {summaryData.map((item, index) => (
            <Grid item xs={12} sm={6} md={2.4} key={index}>
              <Card style={{ backgroundColor: item.color, color: "#fff", borderRadius: "20px" }}>
                <CardContent>
                  <Box display="flex" alignItems="center">
                    <Box mr={2}>{item.icon}</Box>
                    <Box>
                      <Typography variant="subtitle1" align="center">
                        {item.label}
                      </Typography>
                      <Typography variant="h4" align="left" component="div" fontWeight="600">
                        {item.value}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Box mt={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card style={{ borderRadius: "20px",  }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Transaction Status
                  </Typography>
                  <TableContainer component={Paper} style={{borderRadius: "10px"}}>
                    <Table>
                      <TableHead>
                        <TableRow style={{backgroundColor:"#03A9F4", }}>
                          <TableCell style={{color: "#fff", fontWeight: "bold"}}>STATUS</TableCell>
                          <TableCell style={{color: "#fff", fontWeight: "bold"}}>JUMLAH</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody style={{ border: "none" }}>
                        {transactionData.map((row, index) => (
                          <TableRow key={row.status} style={{ backgroundColor: index % 2 === 0 ? "#fff" : "#f2f2f2" }}>
                            <TableCell>{row.status}</TableCell>
                            <TableCell>
                              <a href={row.href} onClick={(e) => { e.preventDefault(); navigate(row.href)}}>
                                {row.jumlah}
                              </a>
                            </TableCell>
                          </TableRow>
                        ))}
                        <TableRow>
                          <TableCell>Total</TableCell>
                          <TableCell>{transactionData.reduce((acc, row) => acc + row.jumlah, 0)}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} width={50}>
              <Card style={{ borderRadius: "20px"}}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Transaction Status
                  </Typography>
                  <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="100%">
                    <Doughnut data={chartData} options={chartOptions} height={10} />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default Home;
