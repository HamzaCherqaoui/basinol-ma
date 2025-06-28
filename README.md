# BASINOL Website Clone - French Version

This project is a French language clone of the [BASINOL website](https://www.basinol.de/en/), created using HTML, CSS, and JavaScript.

## Project Structure

```
basinol-ma/
├── index.html                # Home page
├── produits.html             # Products page
├── entreprise.html           # Company page
├── partenaires.html          # Sales Partners page
├── actualites.html           # News page
├── contact.html              # Contact page
├── css/
│   ├── normalize.css         # CSS reset/normalize
│   ├── style.css             # Main stylesheet
│   └── responsive.css        # Responsive design rules
├── js/
│   ├── main.js               # Main JavaScript file
│   ├── slider.js             # Hero slider functionality
│   ├── language.js           # Language switching
│   ├── partners-map.js       # Partners map functionality
│   ├── news-filter.js        # News filtering functionality
│   ├── contact-form.js       # Contact form validation
│   └── faq.js                # FAQ accordion functionality
└── images/
    ├── logo/                 # Logo files
    ├── hero/                 # Hero slider images
    ├── products/             # Product images
    ├── team/                 # Team member photos
    └── icons/                # UI icons
```

## Features

- Responsive design that works on mobile, tablet, and desktop
- Interactive hero slider on the home page
- Product categories and detailed product information
- Company information with team members
- Interactive partners map with filtering by region
- News section with category filtering
- Contact form with validation
- FAQ section with accordion functionality
- Language switching between French (default) and English (simulated)
- Cookie notice with local storage

## How to Run

Since this is a static website, you can simply open the `index.html` file in a web browser to view the site. However, for the best experience, it's recommended to use a local development server.

### Using VS Code Live Server

If you have Visual Studio Code installed:

1. Install the "Live Server" extension
2. Right-click on `index.html` and select "Open with Live Server"
3. The website will open in your default browser

### Using Python's built-in HTTP server

If you have Python installed:

```bash
# For Python 3.x
python -m http.server

# For Python 2.x
python -m SimpleHTTPServer
```

Then open your browser and navigate to `http://localhost:8000`

### Using Node.js

If you have Node.js installed:

```bash
# Install http-server globally if you haven't already
npm install -g http-server

# Run the server
http-server
```

Then open your browser and navigate to `http://localhost:8080`

## Notes

- This is a static website clone for demonstration purposes only
- The contact form does not actually send emails
- The language switcher simulates switching between French and English
- The website uses placeholder images and content

## Future Improvements

- Add actual content and images
- Implement a real backend for the contact form
- Create full English translations for all pages
- Add more product details and specifications
- Implement a product search functionality
- Add a product comparison feature
- Improve accessibility features
