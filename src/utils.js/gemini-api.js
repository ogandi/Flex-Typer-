import axios from "axios"

export default async function callGemini(prompt, selectedLength) {
    try {
        const res = await axios.get(`/api/generate-paragraph/${prompt}/${selectedLength}`)
        return res.data.filteredStory
    } catch (error) {
        console.error("API call failed:", error)
        throw error
    }
}
