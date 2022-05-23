# INTRO
This project shows a complete solution to store and visualize metrics.

# STRUCTURE
- docker: docker configuration
- frontend-app: web to consume and to create data
- rest-api: REST API using PHP and Symfony 5

# ARCHITECTURE
The frontend create and read data through and REST API.
This API is developed with PHP and Symfony 5.
The data are stored in an InfluxDB database. I have chosen this DB because it let us to store time-series data.

# PREREQUISITES
- To have docker installed.

# GETTING STARTED
* Go to docker folder
* Run `docker-compose up -d`
* Open 'localhost:3000' in the browser

# IMPROVEMENTS

## FRONTEND
- Add more tests (now, components Button and Input have tests)
- Add input validation
- Add API errors handler
- Add chart to visualize data
- Add active class to buttons

## BACKEND
- Add more tests (for instance, to check exception cases)
- Add a better way to handle group clause