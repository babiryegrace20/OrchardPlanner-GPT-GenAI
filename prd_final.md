# Product Requirements Document (Final)

**Project:** Orchard Planner GPT
**Date:** December 05 2025
**Version:** 2.0 (Final Prototype Specification)

## 1. Product Overview

**Problem Statement**
Small-scale orchard owners (5-100 acres) and hobbyists often lack access to affordable, expert agronomic advice. This leads to a reactive management style—treating pests or diseases only after significant damage has occurred—resulting in preventable crop loss and excessive chemical usage.

**Target Audience**
The primary users are community orchard managers, hobbyist fruit growers, and small commercial farmers who need to manage daily tasks and monitor crop health but cannot justify the cost of enterprise agricultural software or full-time consultants.

**Current Product Status**
Orchard Planner GPT is a functional, mobile-first web application prototype. It currently bridges the expertise gap by combining standard farm management tools (task tracking, field logging) with an AI-powered "virtual agronomist." The prototype successfully demonstrates how unstructured field observations can be instantly converted into data-driven risk assessments using Generative AI.

## 2. Core Features & Status

| Feature | Description | Status | AI Dependency |
| :--- | :--- | :--- | :--- |
| **Dashboard** | A centralized view displaying daily weather (mocked), high-priority tasks, and the latest critical alert. | **Implemented** | Conventional |
| **Task Manager** | A full CRUD interface allowing users to add, prioritize, and complete orchard tasks. | **Implemented** | Conventional |
| **Field Log** | A structured input form for recording text-based scouting observations. | **Implemented** | **AI Trigger** |
| **AI Alerts** | Analyses field logs against weather context to generate risk levels and actionable recommendations. | **Implemented** | **High** |
| **AI Assistant** | A conversational chat interface for general horticultural questions and advice. | **Implemented** | **High** |
| **Weather Widget** | Displays current temperature and conditions to provide context for decision-making. | **Implemented** (Mock Data) | Conventional |

## 3. AI Specification (Final)

The application leverages the **Google Gemini API** (specifically `gemini-2.5-flash`) to power two distinct features.

### A. Proactive Alert System
*   **Task:** Analyze a specific field observation in the context of current weather conditions to predict pest/disease risk.
*   **User Flow:** User submits a text entry in the **Field Log** $\rightarrow$ System sends data to Gemini $\rightarrow$ Application parses response $\rightarrow$ **Dashboard** and **Alerts** page are updated with a new Alert card.
*   **Inputs:**
    1.  **User Log:** Free text (e.g., "Noticed white powdery spots on the apple leaves in Block A").
    2.  **Weather Context:** System-injected string (Mocked as: "5-day forecast: Temp 75F, Humidity 80%, Rain in 2 days").
*   **Outputs:** A structured JSON object enforcing the following schema:
    ```json
    {
      "risk": "High", // Enum: Low, Medium, High
      "recommendation": "Immediate application of fungicide X recommended due to high humidity..."
    }
    ```
*   **Constraints:** The system instruction explicitly forces the AI to act as an "expert agronomist," strictly adhere to JSON output for parsing, and cite sources or confidence levels where appropriate.

### B. Intelligent Assistant
*   **Task:** Provide general agronomic advice and answer ad-hoc questions.
*   **User Flow:** User navigates to **Assistant** $\rightarrow$ Types a natural language question $\rightarrow$ Receives a text response.
*   **Inputs:** Full chat history context + new user message.
*   **Outputs:** Unstructured natural language text.
*   **Constraints:** The system prompt constrains the persona to be "concise, clear, and actionable" and mandates a disclaimer to "consult local extension offices" for high-stakes decisions.

## 4. Technical Architecture (Reality Check)

The prototype is built as a client-side Single Page Application (SPA).

*   **Frontend Framework:** React 19 (via AI Studio CDN) utilizing TypeScript for type safety.
*   **Build/Runtime:** In-browser transpilation using Babel Standalone (no local build step required for the prototype).
*   **Styling:** Tailwind CSS (via CDN) for rapid, responsive UI development.
*   **AI Layer:** Direct client-side calls to the Gemini API using the `@google/genai` SDK. API keys are accessed via `process.env`.
*   **Data Persistence:** Application state (Tasks, Logs, Alerts) is held in React `useState` and is ephemeral (resets on page reload).
*   **External Services:** Weather data is currently hardcoded for prototype stability but designed to be swapped for an API (e.g., OpenWeatherMap).

## 5. Prompting & Iteration Summary

The "vibe coding" process involved iterative tuning of the System Instructions to move from generic chat to specific, app-integrated utility.

*   **Key Prompt 1 (The Persona):** *"You are 'OrchardAI,' an expert agronomist... Your advice must be based on horticultural best practices."*
    *   *Evolution:* Initially, the AI was too chatty. We added "Be concise, clear, and actionable" to fit the mobile UI context.
*   **Key Prompt 2 (The Structure):** *"Your response must be a valid JSON object matching the provided schema."*
    *   *Evolution:* Early attempts to get alerts resulted in paragraphs of text that the UI couldn't color-code. Implementing the `responseSchema` was the turning point that allowed the "High Risk" (Red) vs "Low Risk" (Green) UI logic to function reliably.
*   **Key Prompt 3 (The Guardrails):** *"Always state your confidence level and advise users to consult a local expert."*
    *   *Evolution:* Added after realizing the ethical implication of an AI potentially advising a farmer to ignore a disease.

## 6. UX & Limitations

**Intended User Journey:**
1.  **Morning Check:** User opens the Dashboard to see the weather and top tasks.
2.  **Field Scout:** While walking the orchard, the user notices an issue and logs it in the **Field Log**.
3.  **Instant Analysis:** The app immediately flags this as "High Risk" on the Dashboard based on the forecast.
4.  **Action:** The user clicks the alert, reads the recommendation, and adds a corresponding task to the **Task Manager**.

**Limitations:**
*   **Data Loss:** As a frontend-only prototype, all data is lost upon refreshing the browser.
*   **Mock Weather:** The AI analysis relies on hardcoded weather strings, meaning real-time accuracy is currently simulated.
*   **Connectivity:** The AI features require an active internet connection to query the Gemini API.

**Ethical & Trust Limitations:**
*   Users should **not** rely solely on this tool for financial-critical decisions (e.g., ripping out trees). The AI is a decision-support tool, not a replacement for professional human pathology verification.

## 7. Future Roadmap

If significantly more time were available, the following would be prioritized:

1.  **Live Weather API Integration:** Replace mock data with OpenWeatherMap or similar to provide hyper-local, real-time context for the AI analysis.
2.  **Multimodal Diagnostics:** Enable image upload in the Field Log. Using Gemini's vision capabilities, users could snap a photo of a leaf, and the AI would identify the specific pathology (e.g., Apple Scab vs. Powdery Mildew).
3.  **Backend & Auth:** Implement Firebase or Supabase to store user logs and learn from historical data, enabling trend analysis (e.g., "You always get mildew in Block B in June").
4.  **Offline Mode:** Implement PWA capabilities to allow logging data while deep in the orchard without signal, syncing when connectivity is restored.
