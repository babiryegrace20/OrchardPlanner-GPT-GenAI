# Orchard Planner GPT - Interactive Prototype

## Project Overview & Purpose

Orchard Planner GPT is a mobile-first web application designed for small-scale community fruit orchard owners (5-100 acres). The primary goal of this application is to help growers transition from reactive "guesswork" to proactive, data-driven decision-making.

It achieves this by providing simple-to-use tools for orchard management, including:
- A central **Dashboard** for a quick overview of weather, tasks, and alerts.
- A **Task Manager** for organizing daily and seasonal work.
- A **Field Log** for recording crucial observations from the orchard.
- A powerful **AI Assistant** and **Alerts System** powered by the Google Gemini API.

By analyzing user-logged data and live weather information, the app provides simple, actionable advice on pest control, irrigation, and yield prediction, helping growers save time, reduce costs, and prevent crop loss.

## Hosting on GitHub Pages

This project is configured to run directly on static hosting services like GitHub Pages without needing a separate build step.
Live Project Link: https://babiryegrace20.github.io/OrchardPlanner-GPT-GenAI/

**Instructions:**
1.  Create a new repository on GitHub.
2.  Upload all the project files (`index.html`, `index.tsx`, `components/`, etc.) to the repository.
3.  In your repository's settings, navigate to the "Pages" section (under "Code and automation").
4.  Under "Build and deployment", select "Deploy from a branch" as the source.
5.  Choose the branch you want to deploy from (usually `main`) and the `/(root)` folder, then save.
6.  GitHub will build and deploy your site. The live URL will be provided in the Pages settings section, typically in the format `https://<your-username>.github.io/<your-repository-name>/`.

## Use of AI in this Project

This project leverages the Google Gemini API to provide two core intelligent features. The AI is prompted to act as "OrchardAI," an expert agronomist and data analyst.

### 1. Proactive Alert Generation

- **What it does:** This is the primary AI-driven feature. It synthesizes user observations with weather data to generate predictive alerts.
    - **Input:**
        1.  A text description from the user's **Field Log** (e.g., "Saw 10 apple scab lesions in Block B").
        2.  Mock weather data context (e.g., "Temp 75F, Humidity 80%, Rain in 2 days").
    - **AI Task:** The Gemini model is given a system instruction to act as an agronomist. It analyzes the user's log against the weather context and its internal knowledge of horticultural models (e.g., pest and disease life cycles).
    - **Output:** The model returns a structured JSON object containing a risk assessment and a recommended action (e.g., `{ "risk": "High", "recommendation": "High risk of apple scab spread due to upcoming rain. Recommend applying preventative fungicide within 48 hours." }`). This JSON is then used to create a new alert in the app.

### 2. AI Assistant Chat

- **What it does:** This feature provides a conversational interface for users to ask specific questions.
    - **Input:**
        1. A natural language question from the user (e.g., "What's the best way to prune Honeycrisp apple trees for better sun exposure?").
        2. The preceding conversation history for context.
    - **AI Task:** The Gemini model uses its general horticultural knowledge to formulate a concise, helpful answer.
    - **Output:** A plain-text response that directly answers the user's question, which is then displayed in the chat interface.

### Why AI Was Chosen and How It Supports the Product Goal

The core challenge for small orchard owners is the lack of access to affordable, expert-level agronomic advice. Hiring consultants or subscribing to expensive agri-tech software is often not feasible.

**AI was chosen to bridge this gap.** By integrating a powerful language model like Gemini, Orchard Planner GPT can:
1.  **Democratize Expertise:** The AI acts as an on-demand agronomist, providing valuable insights that would otherwise be out of reach.
2.  **Enable Data-Driven Decisions:** The app's goal is to move growers from "guesswork" to informed action. The AI is the engine that drives this transition. It transforms raw data (a simple field log) into a predictive, actionable insight (a high-risk alert), telling the grower not just *what* is happening, but *what to do about it* and *why*.
3.  **Provide Proactive, Not Just Reactive, Support:** Instead of just being a record-keeping tool, the AI allows the app to actively monitor conditions and warn the user of potential problems *before* they become critical, directly supporting the goal of preventing crop loss and reducing costs.