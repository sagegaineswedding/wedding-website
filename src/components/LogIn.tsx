"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { googleSheetUrl } from "@/constants";
import type { User } from "@/types";

export default function LogIn() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [data, setData] = useState<User[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const user: User | undefined = data.find(
      (item: any) =>
        item.firstName.toLowerCase() === firstName.toLowerCase() &&
        item.lastName.toLowerCase() === lastName.toLowerCase()
    );

    if (user) {
      if (user.group.toLowerCase() === "a") {
        router.push(
          "https://google.com"
        );
      } else {
        router.push("https://yahoo.com");
      }
    } else {
      setError(
        "Try again or call Cameron. She might have spelled your name wrong!"
      );
    }
  };

  useEffect(() => {
    axios.get(googleSheetUrl).then((response) => {
      setData(response.data.website);
    });
  }, []);

  return (
    <Box>
      <Box
        sx={{
          my: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          maxWidth: "50%",
          margin: "auto",
        }}
      >
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Alex and Cameron's Glorious Wedding
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 2, width: "100%" }}
        >
          <TextField
            label="First Name"
            value={firstName}
            onChange={(e) => {
              setError("");
              setFirstName(e.target.value);
            }}
            sx={{ mb: 2 }}
            fullWidth
          />
          <TextField
            label="Last Name"
            value={lastName}
            onChange={(e) => {
              setError("");
              setLastName(e.target.value);
            }}
            sx={{ mb: 2 }}
            fullWidth
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
          {error && (
            <Typography
              color="error"
              sx={{ mt: 2, fontWeight: "bold", textAlign: "center" }}
            >
              {error}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
