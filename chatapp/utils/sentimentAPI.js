const FormData = require('form-data');
const axios = require('axios');

async function apiCallPOST(url, formData) {
    try {
        const response = await axios.post(url, formData, { headers: formData.getHeaders() });
        return response.data;
    } catch (error) {
        console.error(`Error sending data to ${url}:`, error);
        throw error;
    }
}


function stringToFormData(text) {
    const formData = new FormData();
    formData.append('text', text);
    return formData;
}

module.exports = { apiCallPOST, stringToFormData };