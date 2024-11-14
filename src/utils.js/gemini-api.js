import axios from "axios"

export default async function callGemini(prompt, selectedLength) {
    try {
        const res = await axios.get(`/api/generate-paragraph/${prompt}/${selectedLength}`)
        return res.data.filteredReponse
    } catch (error) {
        console.log(error);

        throw error
    }
}
