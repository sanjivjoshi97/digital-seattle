// React and Recharts imports
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Material UI components
import { Paper, Typography } from '@mui/material';

// Define a set of colors to be used for the pie slices
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

/**
 * A pie chart component that summarizes donation data by category/type.
 *
 * @component
 * @param {Object} props
 * @param {Array<{ name: string, value: number }>} props.data - Data for the pie chart.
 * @returns {JSX.Element|null} A styled pie chart, or null if no data is provided.
 */
const DonationSummary = ({ data }) => {
    // Return nothing if there's no data to display
    if (!data || data.length === 0) {
        return null;
    }

    return (
        // Card-like container with elevation and padding
        <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
                Donations by Category
            </Typography>

            {/* Ensures the chart resizes based on parent container size */}
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}                   // The donation summary data
                        cx="50%"                      // X position of the center
                        cy="50%"                      // Y position of the center
                        labelLine={false}             // Disable the line from pie to label
                        outerRadius={100}             // Radius of the pie chart
                        fill="#8884d8"                // Default fill color
                        dataKey="value"               // Field used for the numeric value
                        nameKey="name"                // Field used for category name
                        label={({ name, percent }) => 
                            `${name} ${(percent * 100).toFixed(0)}%`
                        }                             // Show name + percentage as label
                    >
                        {/* Map each slice to a unique color from the COLORS array */}
                        {data.map((entry, index) => (
                            <Cell 
                                key={`cell-${index}`} 
                                fill={COLORS[index % COLORS.length]} 
                            />
                        ))}
                    </Pie>

                    {/* Tooltip on hover, formatted with dollar sign */}
                    <Tooltip formatter={(value, name) => [`$${value.toFixed(2)}`, name]} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </Paper>
    );
};

export default DonationSummary;
