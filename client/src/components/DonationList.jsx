// Import date formatting utility
import dayjs from 'dayjs';

// Import MUI components for building tables and styling
import { 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
    Paper, Typography, IconButton, Tooltip 
} from '@mui/material';

// Import MUI icons
import { Edit, Delete } from '@mui/icons-material';

/**
 * Renders a table of donations with options to edit or delete each entry.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.donations - List of donation objects to display.
 * @param {string|number} props.donations[].id - Unique identifier for the donation.
 * @param {string} props.donations[].donor_name - Name of the donor.
 * @param {string} props.donations[].donation_type - Type of the donation (e.g., 'Money', 'Item').
 * @param {string|number} props.donations[].quantity - Quantity or amount donated.
 * @param {string|Date} props.donations[].donation_date - Date the donation was made.
 * @param {function(Object):void} props.onEdit - Callback when the user clicks the edit button. Receives the full donation object.
 * @param {function(string|number):void} props.onDelete - Callback when the user clicks the delete button. Receives the donation ID.
 * @returns {JSX.Element} Donation list UI.
 */
const DonationList = ({ donations, onEdit, onDelete }) => {
    // Show a friendly message if there are no donations
    if (!donations || donations.length === 0) {
        return (
            <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="subtitle1">
                    No donations recorded yet. Add one above to get started!
                </Typography>
            </Paper>
        );
    }

    return (
        <TableContainer component={Paper} elevation={3}>
            <Table sx={{ minWidth: 650 }} aria-label="donations table">
                {/* Table header with styled column names */}
                <TableHead sx={{ backgroundColor: 'primary.main' }}>
                    <TableRow>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Donor Name</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Type</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="right">Quantity/Amount</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Date</TableCell>
                        <TableCell sx={{ color: 'white', fontWeight: 'bold' }} align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>

                {/* Table body iterates over each donation */}
                <TableBody>
                    {donations.map((donation) => (
                        <TableRow
                            key={donation.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {/* Donor's name */}
                            <TableCell component="th" scope="row">
                                {donation.donor_name}
                            </TableCell>

                            {/* Type of donation */}
                            <TableCell>{donation.donation_type}</TableCell>

                            {/* Quantity or Amount */}
                            <TableCell align="right">
                                {donation.donation_type === 'Money' 
                                    ? `$${parseFloat(donation.quantity).toFixed(2)}` // Format money with 2 decimals
                                    : donation.quantity}
                            </TableCell>

                            {/* Date formatted nicely */}
                            <TableCell align="center">
                                {dayjs(donation.donation_date).format('MM/DD/YYYY')}
                            </TableCell>

                            {/* Action buttons: Edit and Delete, wrapped in tooltips */}
                            <TableCell align="center">
                                <Tooltip title="Edit">
                                    <IconButton onClick={() => onEdit(donation)} color="secondary">
                                        <Edit />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                    <IconButton onClick={() => onDelete(donation.id)} color="error">
                                        <Delete />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default DonationList;
