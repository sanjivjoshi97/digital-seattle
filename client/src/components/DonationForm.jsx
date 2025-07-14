// React hooks
import { useState, useEffect } from 'react';
import dayjs from 'dayjs'; // A lightweight date manipulation library

// MUI layout and utility components
import { Stack } from '@mui/material';
import { Box, TextField, Button, Grid, MenuItem, Typography, Paper } from '@mui/material';
import { AddCircleOutline, Edit, Cancel } from '@mui/icons-material';

// MUI X Date Picker components
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// List of allowed donation types
const donationTypes = ['Money', 'Food', 'Clothing', 'Supplies', 'Other'];

/**
 * A form component for adding or editing a donation.
 *
 * @param {Object} props
 * @param {function(Object):void} props.onSubmit - Callback for submitting the form.
 * @param {Object|null} [props.initialData=null] - Donation data to pre-fill in edit mode.
 * @param {function():void} props.onCancelEdit - Callback when cancelling edit mode.
 */
const DonationForm = ({ onSubmit, initialData = null, onCancelEdit }) => {
    // Initialize form state
    const [formData, setFormData] = useState({
        donor_name: '',
        donation_type: 'Money',
        quantity: '',
        donation_date: dayjs() // Default to today's date
    });

    // Track errors
    const [errors, setErrors] = useState({});

    // Determine if the form is in "edit mode"
    const isEditing = initialData !== null;

    // Populate form with initial data if editing
    useEffect(() => {
        if (isEditing) {
            setFormData({
                donor_name: initialData.donor_name,
                donation_type: initialData.donation_type,
                quantity: initialData.quantity,
                donation_date: dayjs(initialData.donation_date) // Convert string to dayjs
            });
        } else {
            // Reset the form if switching from edit to add mode
            resetForm();
        }
    }, [initialData]);

    // Validation
    const validate = () => {
        let tempErrors = {};
        if (!formData.donor_name) {
            tempErrors.donor_name = "Donor's name is required.";
        } else if (formData.donor_name.length < 2) {
            tempErrors.donor_name = "Name must be at least 2 characters long.";
        }
        if (!formData.quantity || parseFloat(formData.quantity) <= 0) {
            tempErrors.quantity = "Quantity or amount must be a positive number.";
        }
        if (!formData.donation_date || !formData.donation_date.isValid()) {
            tempErrors.donation_date = "A valid date is required.";
        }
        setErrors(tempErrors);
        // Return true if form is valid (no keys in tempErrors object)
        return Object.keys(tempErrors).length === 0;
    };

    // Handle changes in text and select fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Handle date picker value change
    const handleDateChange = (newDate) => {
        setFormData(prev => ({ ...prev, donation_date: newDate }));
    };

    // Reset form to initial (blank) state and cancel edit mode if applicable
    const resetForm = () => {
        setFormData({
            donor_name: '',
            donation_type: 'Money',
            quantity: '',
            donation_date: dayjs()
        });
        if (isEditing) onCancelEdit(); // Notify parent to exit edit mode
    };

    // Submit handler: validate, transform, and send data upward
    const handleSubmit = (e) => {
        e.preventDefault();

        // Format date as a string (YYYY-MM-DD) for API compatibility
        if (validate()) {
            const submissionData = {
                ...formData,
                donation_date: formData.donation_date.format('YYYY-MM-DD')
            };

            onSubmit(submissionData);

            // Only reset form after a successful new entry (not edit)
            if (!isEditing) resetForm();
        }
    };

    return (
        // Needed for MUI's DatePicker to work with dayjs
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                    {isEditing ? 'Edit Donation' : 'Add New Donation'}
                </Typography>

                {/* Main donation form */}
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2}>
                        {/* Donor Name Field */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                name="donor_name"
                                label="Donor's Name"
                                value={formData.donor_name}
                                onChange={handleChange}
                                required
                                fullWidth
                                error={!!errors.donor_name}
                                helperText={errors.donor_name}
                            />
                        </Grid>

                        {/* Donation Type Dropdown */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                name="donation_type"
                                label="Donation Type"
                                value={formData.donation_type}
                                onChange={handleChange}
                                select
                                required
                                fullWidth
                            >
                                {donationTypes.map(option => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        {/* Quantity/Amount Field */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <TextField
                                name="quantity"
                                label="Quantity or Amount ($)"
                                type="number"
                                value={formData.quantity}
                                onChange={handleChange}
                                required
                                fullWidth
                                error={!!errors.quantity}
                                helperText={errors.quantity}
                                slotProps={{
                                    inputProps: {
                                        step: "0.01" // Allow decimal input
                                    }
                                }}
                            />
                        </Grid>

                        {/* Donation Date Field */}
                        <Grid size={{ xs: 12, sm: 6 }}>
                            <DatePicker
                                label="Donation Date"
                                value={formData.donation_date}
                                onChange={handleDateChange}
                                slotProps={{
                                    textField: {
                                        fullWidth: true,
                                        required: true,
                                        error: !!errors.donation_date,
                                        helperText: errors.donation_date
                                    }
                                }}
                            />
                        </Grid>

                        {/* Submit & Cancel Buttons */}
                        <Grid size={{ xs: 12 }}>
                            <Stack direction="row" spacing={2}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    startIcon={isEditing ? <Edit /> : <AddCircleOutline />}
                                >
                                    {isEditing ? 'Update Donation' : 'Add Donation'}
                                </Button>

                                {isEditing && (
                                    <Button
                                        variant="outlined"
                                        onClick={resetForm}
                                        startIcon={<Cancel />}
                                    >
                                        Cancel Edit
                                    </Button>
                                )}
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </LocalizationProvider>
    );
};

export default DonationForm;
