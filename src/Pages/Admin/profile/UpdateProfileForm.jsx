/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material"; // Import necessary MUI components
import axios from "axios";
import { server } from "../../../main"; // Adjust the import as needed

const UpdateProfileForm = ({ open, onClose, adminData, onUpdate }) => {
  const [name, setName] = useState(adminData.name);
  const [email] = useState(adminData.email); // Keep email as is, without setEmail
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem("adminAuthToken");
    try {
      const response = await axios.put(
        `${server}/admin/${adminData.id}`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      onUpdate(response.data); // Call the callback to update admin data in parent
      onClose(); // Close the dialog after successful update
    } catch (error) {
      console.error("Error updating admin data:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Profile</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          value={email}
          disabled // Disable the email field
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={isSubmitting} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateProfileForm;
