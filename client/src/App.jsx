// Import React hooks and components
import { useState, useEffect } from 'react';
import * as api from './services/api'; // API service functions
import DonationForm from './components/DonationForm.jsx'; // Form for adding/updating donations
import DonationList from './components/DonationList.jsx'; // List of donation entries

// Import MUI components for layout and styling
import { CssBaseline, Container, Typography, Stack, Alert } from '@mui/material';

function App() {
    // State to hold list of donations
    const [donations, setDonations] = useState([]);

    // State to track donation currently being edited
    const [editingDonation, setEditingDonation] = useState(null);

    // State to hold error messages for display
    const [error, setError] = useState('');

    // Fetch donations from API on component mount
    useEffect(() => {
        fetchDonations();
    }, []);

    // Fetch all donation entries from the backend
    const fetchDonations = async () => {
        try {
            const response = await api.getDonations();
            setDonations(response.data);
            setError('');
        } catch (error) {
            console.error("Error fetching donations:", error);
            setError("Failed to fetch donations. Please check the server connection.");
        }
    };

    /**
     * Handles form submission for both creating and updating donations
     * @param {Object} donationData - Data submitted from the form
     */
    const handleFormSubmit = async (donationData) => {
        try {
            if (editingDonation) {
                // If editing, update the existing donation
                await api.updateDonation(editingDonation.id, donationData);
            } else {
                // Otherwise, create a new donation
                await api.createDonation(donationData);
            }
            // Refresh the donation list after submission
            fetchDonations();
            setError('');
        } catch (error) {
            console.error("Error saving donation:", error);
            setError("Failed to save the donation. Please check your input and try again.");
        } finally {
            // Clear the editing state
            setEditingDonation(null);
        }
    };

    /**
     * Trigger edit mode for a selected donation
     * @param {Object} donation - Donation to edit
     */
    const handleEdit = (donation) => {
        setEditingDonation(donation);
        window.scrollTo(0, 0); // Scroll to top to show the form
    };

    /**
     * Delete a donation after user confirmation
     * @param {string|number} id - ID of the donation to delete
     */
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this donation?')) {
            try {
                await api.deleteDonation(id);
                fetchDonations(); // Refresh list
                setError('');
            } catch (error) {
                console.error("Error deleting donation:", error);
                setError("Failed to delete the donation.");
            }
        }
    };

    // Render the application UI
    return (
        <>
            <CssBaseline /> {/* Resets browser styles for consistent look */}
            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <header>
                    <Typography
                        variant="h3"
                        component="h1"
                        align="center"
                        gutterBottom
                        sx={{ mt: 4, mb: 4, color: 'primary.main', fontWeight: 'bold' }}
                    >
                        Shelter Donation Tracker
                    </Typography>
                </header>
                <main>
                    <Stack spacing={4} sx={{ mt: 4 }}>
                        {/* Display error messages if any */}
                        {error && <Alert severity="error">{error}</Alert>}
                        
                        {/* Donation form with optional pre-filled data for editing */}
                        <DonationForm 
                            onSubmit={handleFormSubmit} 
                            initialData={editingDonation} 
                            onCancelEdit={() => setEditingDonation(null)}
                        />

                        {/* List of all donations with edit/delete options */}
                        <DonationList 
                            donations={donations} 
                            onEdit={handleEdit} 
                            onDelete={handleDelete} 
                        />
                    </Stack>
                </main>
            </Container>
        </>
    );
}

export default App;
