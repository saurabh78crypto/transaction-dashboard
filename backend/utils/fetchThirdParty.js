import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const fetchThirdPartyData = async () => {
    try {
        const response = await axios.get(process.env.THIRD_PARTY_API);
        return response.data;
    } catch (error) {
        console.error("Error fetching third-party data:", error);
        throw error;
    }
};

export default fetchThirdPartyData;
