# Implementation & Ethics Memo

**To:** Emelia Hughes (Generative AI Professor)

**From:** Grace Babirye (Generative AI Student)

**Subject:** Building Orchard Planner GPT – AI Implementation & Ethical Considerations

### 1. How I Used AI While Building

During the development of Orchard Planner GPT, I leveraged AI not just as a feature within the app, but as a core part of the engineering workflow. I utilized Google AI Studio and the Gemini models to accelerate the initial scaffolding of the React application. Specifically, I used "vibe coding" techniques—iteratively describing the desired look and feel, to generate the Tailwind CSS classes that give the application its distinct "organic/agricultural" aesthetic (greens, browns, and clean surfaces).

For the logic, AI was instrumental in debugging TypeScript interfaces. When defining the data structures for `Tasks` and `Alerts`, I used AI to ensure my types were consistent across the `App.tsx` state management and the component props.

However, human judgment was critical when defining the **System Instructions** for the AI agent. The raw model output was often too verbose or confident. I had to manually rewrite prompts to enforce a tone of "cautious expertise" and strictly define the JSON schema for the alert system. The code for parsing the AI response (`services/geminiService.ts`) required manual refinement to handle edge cases where the model might return Markdown formatting around the JSON, ensuring the app wouldn't crash.

### 2. Why the AI Feature Looks the Way It Does

I chose to focus on the **Field Log Analysis** (Text-to-Alert) as the primary AI feature because it represents the highest value leverage point for a farmer. Farmers already take notes; the friction lies in analyzing those notes against complex environmental factors like weather and pest lifecycles.

I prioritized **text-based analysis** over image recognition for this prototype to ensure stability and focus on the reasoning capabilities of the model (`gemini-2.5-flash`). While image diagnosis is flashy, the reasoning engine—deciding *why* a pest is a risk based on humidity and temperature—is where the actual decision support happens.

This feature directly connects to the core value proposition: moving from reactive to proactive. By surfacing a "High Risk" alert immediately after a log entry, we close the loop between observation and action, which is often where small-scale growers fail.

### 3. Risks, Trade-offs, and Integrity

**Reliability & Over-reliance:**
The most significant risk in an agricultural tool is the "hallucination" of advice. If the AI suggests the wrong chemical or fails to identify a critical blight, the financial consequences for a farmer could be real. To mitigate this, I explicitly designed the UI to include a disclaimer on the Alerts page. I also tuned the system prompt to explicitly state confidence levels. The choice to use "High/Medium/Low" buckets rather than specific quantitative probabilities was a deliberate design choice to present the output as a *heuristic* rather than a calculated fact.

**Data Privacy:**
In a production version, sending farm data to an LLM raises privacy concerns regarding proprietary yield data. For this prototype, I made the trade-off of using a client-side API call where the key is exposed in the environment (standard for prototypes, but not production). I considered the implication that user logs are being sent to a third-party API (Google) and would need to disclose this clearly in a real-world privacy policy.

**Bias:**
I was conscious that the model's training data likely favors large-scale commercial agriculture (monocultures) over small-scale permaculture or organic orchards. This might bias the advice toward chemical interventions rather than holistic management. I attempted to counter this by prompting the persona to be an expert in "small fruit farms," but the underlying model bias remains a limitation users should be aware of.

### 4. What I Learned About Building with GenAI

The biggest surprise was the effectiveness of **schema enforcement**. I initially struggled to get the AI to trigger the correct UI badges (Red/Yellow/Green). I learned that treating the LLM as a "reasoning engine that outputs code" (JSON) is far more reliable than treating it as a "chatbot that outputs text."

If I were teaching another founder, I would emphasize that **Prompt Engineering is actually Systems Engineering**. You cannot just ask the AI to "be helpful." You must define the inputs (weather strings, logs), the constraints (JSON only, specific enums), and the failure modes (try/catch blocks around JSON parsing) just as strictly as you would with a traditional API.

This project has shifted my perspective on my future ventures. I no longer view AI as just a "content generator" but as a "logic bridge." It allows me to connect unstructured user behavior (typing a messy note) with structured business logic (triggering a specific high-priority alert) without writing complex regex or rule-based engines.
