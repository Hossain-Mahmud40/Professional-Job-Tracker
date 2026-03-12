# Job Tracker

A simple and responsive job application tracker built with HTML, Tailwind CSS, DaisyUI, and vanilla JavaScript.

This project helps users keep track of job opportunities in one place, update application status, and manage progress through a clean UI. It was built as a beginner-friendly frontend project with a strong focus on DOM manipulation, local storage, and practical UI interactions.

## Live Demo

- Live Site: add-your-live-link-here
- GitHub Repository: add-your-repo-link-here

## Preview

![Job Tracker Screenshot](./jobs.png)

## Features

- Add new job applications with company name, role, details, and description
- View all saved jobs in a clean card-based layout
- Mark a job as `Interview` or `Rejected`
- Filter jobs by status
- Delete job entries
- See quick stats for total jobs, interviews, and rejections
- Toggle between light and dark theme
- Save data in `localStorage` so jobs stay available after refresh
- Responsive layout for desktop and mobile screens

## Tech Stack

- HTML5
- Tailwind CSS via CDN
- DaisyUI
- Vanilla JavaScript
- Font Awesome
- Local Storage API

## How It Works

The app starts with sample job data and stores everything in the browser using `localStorage`.

Users can:

1. Add a new job from the modal form
2. Update the job status to interview or rejected
3. Filter the list based on job status
4. Delete a job when it is no longer needed
5. Switch between light and dark theme

Every update is saved automatically in the browser.

## Project Structure

```text
.
|-- index.html
|-- jobs.png
|-- tailwind.config.js
`-- script/
    `-- machine.js
```

## Run Locally

Since this is a static frontend project, no installation is required.

1. Download or clone the repository
2. Open `index.html` in your browser

You can also use the VS Code Live Server extension for a smoother local development experience.

## What I Practiced

- DOM selection and event handling
- Dynamic rendering with JavaScript
- Form handling and validation
- Managing UI state with filters
- Persisting data with `localStorage`
- Building responsive layouts with Tailwind CSS and DaisyUI

## Challenges I Worked Through

As a beginner, some of the main challenges in this project were:

- Understanding how to update the UI after changing data
- Keeping the filter state and job counts in sync
- Saving and loading data correctly from `localStorage`
- Managing multiple interactions like add, delete, status update, and theme toggle without breaking the app
- Structuring JavaScript code so it stayed readable as the project grew

Working through those parts helped me better understand how real frontend apps manage state and user interaction.

## Future Improvements

- Add edit functionality for existing jobs
- Add more job statuses such as applied, offer, or saved
- Add search and sorting options
- Add due dates or follow-up reminders
- Connect the app to a backend database in the future

## Author

Built by Alemr as a frontend practice project.
