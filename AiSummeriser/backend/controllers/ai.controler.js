import { aiSummerizer } from "../aiService/ai.js";

export const aSummerizerCntroller = async (req, res) => {
    try {
        const { text } = req.body;
        console.log("long text", text);

        if (!text && text.trim()) {
            return res.status(400).json({
                success: false,
                message: "Text should be exist."
            })
        };

        // const prompt = `Summerize the following text in 3 bullet point.
        // Text ${text} Return only in 3 bullets points.`;

//         const prompt = `Summarize the following text in approximately 50 words.

// Text:
// ${text}

// Return only the summary.`;

// const prompt = `Summarize the following text using very simple language that a beginner can understand.

// Text:
// ${text}

// Return only the summary.`;

// const prompt = `Summarize the following text.

// Give exactly 3 important points.
// Each point must be on a separate line.

// Text:
// ${text}

// Return only the 3 points.`;

const prompt = `Summarize the following text in exactly 20 words.

Do not add any information that is not present in the original text.

Text:
${text}

Return only the summary.`

        const summmrizeRespn = await aiSummerizer(prompt);
        if (!summmrizeRespn) {
            return res.status(404).json({
                success: false,
                message: "Response not generated."
            })
        };

        return res.status(200).json({
            success: true,
            message: "Text generated.",
            summmrizeRespn
        })


    } catch (error) {
        console.log("Error", error);
        return res.status(500).json({
            success: false,
            message: "Soething went wrong."
        })

    }
}