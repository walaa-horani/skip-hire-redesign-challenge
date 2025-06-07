import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Typography,
  CircularProgress,
  Stack,
  Paper,
} from "@mui/material";

export default function SkipSelector() {
  const [skips, setSkips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch(
      "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
    )
      .then((res) => res.json())
      .then((data) => {
        setSkips(data);
        setLoading(false);
      });
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
        Select a Skip Size
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" py={5}>
          <CircularProgress color="success" />
        </Box>
      ) : (
        <Stack spacing={3}>
          {skips.map((skip) => (
            <Paper
              key={skip.id}
              elevation={selected === skip.id ? 6 : 2}
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                border: selected === skip.id ? "2px solid #4caf50" : "1px solid #ddd",
                borderRadius: 2,
                transition: "all 0.3s ease",
              }}
            >
              <Box
                component="img"
  src="/assets/container.jpg"
                alt="Skip"
                sx={{ width: 100, height: 100, borderRadius: 2, objectFit: "cover", mr: 3 }}
              />
              <Box flex={1}>
                <Typography variant="h6" fontWeight="bold">
                  {skip.size} Yard Skip
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Hire Period: {skip.hire_period_days} days
                </Typography>
                <Typography variant="h6" color="primary" mt={1}>
                  £{skip.price_before_vat}
                </Typography>
              </Box>
              <Button
                variant={selected === skip.id ? "contained" : "outlined"}
                color="success"
                onClick={() => setSelected(skip.id)}
              >
                {selected === skip.id ? "Selected" : "Select"}
              </Button>
            </Paper>
          ))}
        </Stack>
      )}

      {selected && (
        <Box textAlign="center" mt={4}>
          <Button variant="contained" color="success" size="large">
            Continue
          </Button>
        </Box>
      )}
    </Container>
  );
}
