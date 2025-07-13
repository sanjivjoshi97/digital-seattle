import axios from 'axios';

// Define our endpoint associated with donations.
const API_URL = '/api/donations';

/**
 * Fetches all donations from the server.
 * @returns {Promise<AxiosResponse<any>>} A promise that resolves to the server's response.
 */
export const getDonations = () => {
    return axios.get(API_URL);
};

/**
 * Creates a new donation.
 * @param {object} donation - The donation object to create.
 * @returns {Promise<AxiosResponse<any>>}
 */
export const createDonation = (donation) => {
    return axios.post(API_URL, donation);
};

/**
 * Updates an existing donation.
 * @param {number} id - The ID of the donation to update.
 * @param {object} donation - The updated donation data.
 * @returns {Promise<AxiosResponse<any>>}
 */
export const updateDonation = (id, donation) => {
    return axios.put(`${API_URL}/${id}`, donation);
};

/**
 * Deletes a donation.
 * @param {number} id - The ID of the donation to delete.
 * @returns {Promise<AxiosResponse<any>>}
 */
export const deleteDonation = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};