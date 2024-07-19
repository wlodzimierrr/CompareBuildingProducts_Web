# Building Products Comparison Website - Front End

# Live Website: [Compare Building Products](https://compareproducts.wlodzimierrr.co.uk/)

## Overview

This project is the front-end component of a building products comparison website, enabling users to compare prices, reviews and details from various hardware stores. The front end features a search bar and product categories for easy navigation.

## Architecture

### Front End

- **Technology**: Developed using Next.js.
- **Styling**: Uses Tailwind CSS for styling.
- **Components**: Built with Shadcn components.
- **Search**: Integrates Algolia Search for efficient product searches.
- **History**: Initially used PostgreSQL full-text search but Algolia was preferred for its accuracy. Also experimented with Pinecone and a custom Qdrant database (still in progress).

### Hosting

- **Platform**: Hosted on Google Cloud.

### CI/CD Pipeline

- **Automation**: Managed using GitHub Actions.
- **Containerization**: Dockerized and using GitHub Container Registry for container images.

### Server

- **Web Server**: Nginx for serving the application.
- **Monitoring and Logging**: 
  - **Promtail**: For Docker logging.
  - **Node Exporter**: For server metrics.
  - **cAdvisor**: For Docker container metrics.
  - **Grafana**: For visualization and monitoring (Hosted and connected to scrapers server).
  - **Prometheus**: For collecting metrics.
  - **Loki**: For log aggregation.
- **SSL/TLS**: Managed with Certbot for secure connections.

### Upcoming Features

- **Comparing Feature**: Working on enhancing the ability to find similar products within a product card for improved comparison.
