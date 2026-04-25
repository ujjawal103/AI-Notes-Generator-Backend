const axios = require("axios");
const https = require("https");

const generateNotes = async (req, res) => {
    try {
        const { topic } = req.body;

        if (!topic) {
            return res.status(400).json({ success: false, message: "Topic is required" });
        }

        const formattedTopic = encodeURIComponent(topic.trim());

        //         const prompt = `You are an expert teacher.

        // Generate detailed notes for the topic: ${topic}

        // Follow this structure strictly:

        // * Introduction (simple language)
        // * Key concepts (bullet points)
        // * Deep explanation with examples
        // * Add real-life analogy
        // * Include diagram suggestions (describe images)
        // * Important exam points
        // * Summary
        // * 5 practice questions

        // Make notes student-friendly, clear, and structured.

        // IMPORTANT:

        // * The output must be LONG and DETAILED (minimum equivalent of 10–12 pages)
        // * Use proper headings and subheadings
        // * Include image placeholders in markdown format:
        //   ![diagram](https://source.unsplash.com/800x400/?education,${formattedTopic})
        // * Maintain consistent formatting`;


        //         const prompt = `
        // You are an expert teacher.

        // Generate detailed notes for the topic: ${topic}

        // STRICT RULES:

        // - ALL section titles MUST be in markdown format using ## or ###
        // - Example:
        //   ## Introduction
        //   ## Key Concepts

        // Follow this structure:

        // ## Introduction
        // ## Key Concepts
        // ## Deep Explanation with Examples
        // ## Real-life Analogy
        // ## Important Exam Points
        // ## Summary
        // ## Practice Questions

        // IMPORTANT:

        // - Do NOT skip markdown headings
        // - Do NOT write plain text headings
        // - Only markdown headings allowed
        // - Only generate clean structured markdown notes
        // - Use proper headings (##, ###)
        // - Output must be detailed (10–12 pages equivalent)

        // Generate now.
        // `;



        const prompt = `
You are a highly experienced professor, technical writer, and system designer.

Your task is to generate EXTREMELY DETAILED, structured, and exam-ready notes for the topic:

"${topic}"

The output must resemble a complete study module or textbook chapter (minimum 10–12 pages equivalent).

-----------------------------
📌 OUTPUT STRUCTURE (STRICT)
-----------------------------

## 1. Introduction
- Explain the topic in simple and clear language
- Provide background and importance
- Include 2–3 paragraphs minimum

## 2. Key Concepts
- Provide well-defined bullet points
- Each concept must have a short explanation

## 3. Detailed Explanation
- Deep explanation of all subtopics
- Use multiple paragraphs
- Include real-world examples and use cases
- Break into sub-sections using ### headings

## 4. Visual Representations (MANDATORY)

You MUST include structured TEXT-BASED diagrams.

❌ DO NOT describe diagrams  
❌ DO NOT write "diagram suggestion"  
❌ DO NOT skip diagrams  

✅ You MUST DRAW diagrams using text formats like below:

### Flowchart
[Start] → [Planning] → [Execution] → [Testing] → [End]

### ER Diagram
User (id, name)
   |
   | places
   ↓
Order (id, amount)

### UML Class Diagram
+----------------------+
|      Project         |
+----------------------+
| name                 |
| deadline             |
+----------------------+
| start()              |
| complete()           |
+----------------------+

### DFD (Data Flow Diagram)
User → (Process Request) → System → Database

### Table (MANDATORY)

All tables MUST follow correct markdown format:

| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data     | Data     | Data     |

- Each row must be on a new line
- No broken formatting
- At least ONE proper table required

## 5. Important Exam Points
- Provide concise bullet points
- Focus on revision and scoring

## 6. Summary
- Short recap of entire topic

## 7. Practice Questions
- Provide at least 5 questions
- Include conceptual + descriptive questions

-----------------------------
⚠️ STRICT RULES
-----------------------------

- Output MUST be LONG and detailed (minimum 10–12 page equivalent)
- Use proper markdown formatting (##, ###, lists, tables)
- Each section must be clearly separated
- Do NOT generate short answers
- Do NOT skip any section
- Do NOT produce plain paragraph-only output
- Ensure diagrams are actually DRAWN using text

-----------------------------
🎯 GOAL
-----------------------------

The output should look like:
- A high-quality exam preparation note
- A textbook-level explanation
- A structured learning resource

Now generate the complete notes.
`;








        const apiKey = process.env.GEMINI_API_KEY;
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        // Axios request forcing IPv4 to resolve Windows Node fetch issues
        const response = await axios.post(url, {
            contents: [{ parts: [{ text: prompt }] }]
        }, {
            httpsAgent: new https.Agent({ family: 4 }),
            headers: { 'Content-Type': 'application/json' }
        });

        const text = response.data.candidates[0].content.parts[0].text;

        let notes = response.data.candidates[0].content.parts[0].text;

        // const getImage = (text) => {
        //     const formatted = encodeURIComponent(text);
        //     return `![diagram](https://source.unsplash.com/800x400/?${formatted},education)`;
        // };

        // notes = notes.replace(/(#+\s.+)/g, (match) => {
        //     const cleanTitle = match.replace(/#/g, "").trim();
        //     return `${match}\n\n${getImage(cleanTitle)}\n`;
        // });

        return res.status(200).json({
            success: true,
            notes: text
        });
    } catch (error) {
        let errorMessage = error.message;
        if (error.response && error.response.data) {
            errorMessage = JSON.stringify(error.response.data);
        }
        console.error("Notes Generation Error: ", errorMessage);
        return res.status(500).json({
            success: false,
            message: "Failed to generate notes: " + errorMessage
        });
    }
};

module.exports = {
    generateNotes
};
