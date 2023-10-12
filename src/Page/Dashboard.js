import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSales } from "../Action/SalesAction";
import { fetchItems } from "../Action/InventoryAction";
import { Card, CardContent, Container, Grid, Typography } from "@mui/material";

export default function Dashboaed() {
  const dispatch = useDispatch();

  const items = useSelector((state) => state.items);
  const sales = useSelector((state) => state.sales);

  const totalStock = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const totalRevenue = sales.reduce(
    (acc, curr) => curr.quantity * curr.amount + acc,
    0
  );

  useEffect(() => {
    dispatch(fetchSales());
    dispatch(fetchItems());
  }, [dispatch]);

  return (
    <div>
      <div>
        <Container sx={{ py: 8, mt: 10 }} maxWidth="lg">
          <Grid container spacing={4}>
            <Grid xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "1",
                      WebkitBoxOrient: "vertical"
                    }}
                  >
                    Total Sales: {sales.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "1",
                      WebkitBoxOrient: "vertical"
                    }}
                  >
                    Total Stock: {totalStock}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "1",
                      WebkitBoxOrient: "vertical"
                    }}
                  >
                    Total Items: {items.length}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid xs={12} sm={6} md={3}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h1"
                    gutterBottom
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: "1",
                      WebkitBoxOrient: "vertical"
                    }}
                  >
                    Total Revenue: {totalRevenue}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}
