<br># 🛡️ Sentinel — Network Threat Detection System

An end-to-end machine learning pipeline for detecting phishing attacks in network traffic. Built with a modern **Sentinel**-themed dark UI, this system ingests network data from MongoDB, trains multiple classifiers with hyperparameter tuning, tracks experiments with MLflow, and serves real-time predictions via a FastAPI web application.

> **Live Demo**: [Deploy your own for free on Render →](#-deploy-to-render-free)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Screenshots](#-screenshots)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [ML Pipeline Details](#-ml-pipeline-details)
- [API Endpoints](#-api-endpoints)
- [Deploy to Render (Free)](#-deploy-to-render-free)
- [Docker Deployment](#-docker-deployment)
- [Experiment Tracking](#-experiment-tracking)
- [Environment Variables](#-environment-variables)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🔍 Overview

This project builds a **phishing detection classifier** that analyzes network traffic features to distinguish between legitimate and phishing activity. It follows a modular, production-style ML pipeline architecture with:

- 🔄 **Automated data ingestion** from MongoDB
- ✅ **Data validation** with schema enforcement and drift detection
- 🧹 **Feature transformation** using KNN Imputation for missing values
- 🤖 **Multi-model training** with hyperparameter tuning across 5 classifiers
- 📊 **Experiment tracking** via MLflow + DagsHub
- 🌐 **Modern web UI** with dark/light themes and animated dashboard
- 🚀 **One-click deployment** to Render (free tier)
- 🐳 **Dockerized** for consistent environments

---

## 📸 Screenshots

| Dashboard | Analyze (Upload) | Train Model |
|:---------:|:-----------------:|:-----------:|
| Dark-themed hero with pipeline stats | CSV upload with drag-and-drop | One-click training trigger |

> The UI features a modern **Sentinel** design with glassmorphism cards, dot-grid backgrounds, scroll-reveal animations, and a dark/light theme toggle.

---

## 🏗️ Architecture

```
┌──────────────┐     ┌────────────────┐     ┌──────────────────┐     ┌───────────────┐
│   MongoDB    │────▶│ Data Ingestion │────▶│  Data Validation │────▶│    Data        │
│  (Raw Data)  │     │  (Train/Test   │     │  (Schema Check,  │     │ Transformation │
│              │     │    Split)      │     │   Drift Report)  │     │ (KNN Imputer)  │
└──────────────┘     └────────────────┘     └──────────────────┘     └───────┬────────┘
                                                                            │
                          ┌──────────────┐     ┌──────────────────┐         │
                          │  FastAPI     │◀────│  Model Trainer   │◀────────┘
                          │  (Sentinel   │     │  (5 Classifiers, │
                          │   Web UI)    │     │   MLflow Track)  │
                          └──────────────┘     └──────────────────┘
```

---

## 🧰 Tech Stack

| Category              | Technology                                     |
|-----------------------|------------------------------------------------|
| **Language**          | Python 3.10+                                   |
| **ML Framework**      | Scikit-learn                                   |
| **Web Framework**     | FastAPI + Uvicorn                              |
| **Frontend**          | Jinja2 Templates, Vanilla CSS, JavaScript      |
| **Database**          | MongoDB (via PyMongo)                          |
| **Experiment Tracking** | MLflow + DagsHub                             |
| **Data Processing**   | Pandas, NumPy                                  |
| **Containerization**  | Docker                                         |
| **Deployment**        | Render (Free Tier)                             |

---

## 📁 Project Structure

```
networksecurity/
├── app.py                        # FastAPI application (routes + API)
├── main.py                       # Standalone pipeline runner (CLI)
├── push_data.py                  # Load CSV data into MongoDB
├── setup.py                      # Package configuration
├── requirements.txt              # Python dependencies
├── dockerfile                    # Docker container setup
├── render.yaml                   # Render deployment blueprint
│
├── networksecurity/              # Core Python package
│   ├── components/               # Pipeline stage implementations
│   │   ├── data_ingestion.py         # Fetch data from MongoDB, train/test split
│   │   ├── data_validation.py        # Schema validation & data drift detection
│   │   ├── data_transformation.py    # KNN Imputation preprocessing pipeline
│   │   └── model_trainer.py          # Multi-model training with MLflow tracking
│   │
│   ├── pipeline/                 # Pipeline orchestration
│   │   ├── training_pipeline.py      # End-to-end training pipeline
│   │   └── batch_prediction.py       # Batch prediction pipeline
│   │
│   ├── entity/                   # Data classes
│   │   ├── config_entity.py          # Pipeline configuration objects
│   │   └── artifact_entity.py        # Pipeline artifact objects
│   │
│   ├── constant/                 # Pipeline constants & hyperparameters
│   │   └── training_pipeline/        # All pipeline-related constants
│   │
│   ├── utils/                    # Utility functions
│   │   ├── main_utils/               # General utilities (save/load objects)
│   │   └── ml_utils/                # ML utilities (model estimator, metrics)
│   │
│   ├── exception/                # Custom exception handling
│   └── logging/                  # Custom logging configuration
│
├── static/                       # Frontend assets
│   ├── css/style.css                 # Sentinel theme (dark/light)
│   └── js/dotgrid.js                 # Animated dot-grid background
│
├── templates/                    # Jinja2 HTML templates
│   ├── base.html                     # Base layout with navbar & theme toggle
│   ├── index.html                    # Dashboard / landing page
│   ├── analyze.html                  # CSV upload & prediction page
│   ├── train.html                    # Model training trigger page
│   └── table.html                    # Prediction results table
│
├── Network_Data/                 # Raw network traffic data (CSV)
├── data_schema/                  # YAML schema definitions
├── Artifacts/                    # Pipeline artifacts (per-run outputs)
├── final_model/                  # Production-ready model & preprocessor
├── valid_data/                   # Validated data samples
└── logs/                         # Application log files
```

---

## 🚀 Getting Started

### Prerequisites

- **Python 3.10+**
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/atlas) — free tier available)
- **Git**
- **Docker** (optional, for containerized deployment)

### 1. Clone the Repository

```bash
git clone https://github.com/its-me-meax/networksecurity.git
cd networksecurity
```

### 2. Create a Virtual Environment

```bash
python -m venv venv

# Windows
venv\Scripts\activate

# macOS / Linux
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create a `.env` file in the project root:

```env
# MongoDB Connection
MONGODB_URL_KEY=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
MONGO_DB_URL=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority

# MLflow / DagsHub (optional — for experiment tracking)
MLFLOW_TRACKING_URI=https://dagshub.com/<your-username>/networksecurity.mlflow
MLFLOW_TRACKING_USERNAME=<your-dagshub-username>
MLFLOW_TRACKING_PASSWORD=<your-dagshub-token>
```

### 5. Load Data into MongoDB

```bash
python push_data.py
```

This reads `Network_Data/phisingData.csv`, converts it to JSON records, and inserts them into the `Pradyumansh.NetworkData` collection in MongoDB.

---

## 📖 Usage

### Run the Training Pipeline (CLI)

```bash
python main.py
```

This executes the full pipeline: **Ingestion → Validation → Transformation → Training**, and saves the best model to `final_model/`.

### Start the Web Application

```bash
python app.py
```

The server starts at `http://localhost:8080`. You'll see the Sentinel dashboard with options to:

- **Upload a CSV** for phishing predictions (`/analyze`)
- **Train the model** from the web UI (`/train-model`)
- **Toggle dark/light themes** using the navbar button

---

## 🤖 ML Pipeline Details

### Data Ingestion
- Connects to MongoDB and exports the `NetworkData` collection
- Splits data into **train** (80%) and **test** (20%) sets

### Data Validation
- Validates data against the schema defined in `data_schema/schema.yaml`
- Generates a **drift report** (`report.yaml`) to detect feature distribution changes

### Data Transformation
- Uses **KNN Imputer** (k=3, uniform weights) to handle missing values
- Saves the fitted preprocessor as a `.pkl` artifact

### Model Training
The system trains and compares **5 classification models** with hyperparameter tuning:

| Model                  | Tuned Hyperparameters                                  |
|------------------------|-------------------------------------------------------|
| **Random Forest**      | `n_estimators`: [8, 16, 32, 128, 256]                 |
| **Decision Tree**      | `criterion`: [gini, entropy, log_loss]                 |
| **Gradient Boosting**  | `learning_rate`, `subsample`, `n_estimators`           |
| **Logistic Regression**| Default parameters                                     |
| **AdaBoost**           | `learning_rate`, `n_estimators`                        |

- The **best model** (by score) is selected automatically
- Evaluated using **F1 Score**, **Precision**, and **Recall**
- Minimum expected score threshold: **0.6**
- Overfitting/underfitting threshold: **0.05**

---

## 🌐 API Endpoints

| Method | Endpoint      | Description                                             |
|--------|--------------|--------------------------------------------------------|
| `GET`  | `/`          | Dashboard — Sentinel landing page                      |
| `GET`  | `/analyze`   | CSV upload page for phishing predictions               |
| `GET`  | `/train-model`| Model training trigger page                           |
| `GET`  | `/train`     | **API**: Triggers the full ML training pipeline        |
| `POST` | `/predict`   | **API**: Upload a CSV → get phishing predictions       |

### Predict Endpoint Example

```bash
curl -X POST "http://localhost:8080/predict" \
  -F "file=@your_network_data.csv"
```

The response renders an HTML table with predictions appended as a `predicted_column` (0 = legitimate, 1 = phishing).

---

## ☁️ Deploy to Render (Free)

[Render](https://render.com) offers a **free tier** for web services with Docker support — perfect for this project.

### Option A: One-Click Deploy (Recommended)

1. **Push your code** to a GitHub repository
2. Go to [render.com/new](https://dashboard.render.com/create) and sign up (free)
3. Click **"New" → "Web Service"**
4. **Connect your GitHub repo** (`networksecurity`)
5. Render will auto-detect the `dockerfile` and `render.yaml`. Configure:
   - **Name**: `networksecurity` (or any name you prefer)
   - **Region**: Choose the closest to you
   - **Plan**: **Free**
6. **Add Environment Variables** in the Render dashboard:

   | Key                       | Value                                |
   |--------------------------|--------------------------------------|
   | `MONGODB_URL_KEY`        | Your MongoDB connection string       |
   | `MONGO_DB_URL`           | Your MongoDB connection string       |
   | `MLFLOW_TRACKING_URI`    | Your DagsHub MLflow URL (optional)   |
   | `MLFLOW_TRACKING_USERNAME`| Your DagsHub username (optional)    |
   | `MLFLOW_TRACKING_PASSWORD`| Your DagsHub token (optional)       |

7. Click **"Create Web Service"** — Render will build the Docker image and deploy automatically!

### Option B: Using Render Blueprint

The project includes a `render.yaml` blueprint file. You can use it for automated setup:

1. Push code to GitHub
2. Go to [render.com/blueprints](https://dashboard.render.com/blueprints)
3. Click **"New Blueprint Instance"**
4. Select your GitHub repo
5. Render will read `render.yaml` and configure everything automatically
6. Fill in the environment variables when prompted
7. Deploy!

### After Deployment

- Your app will be live at `https://networksecurity-xxxx.onrender.com`
- The free tier spins down after ~15 min of inactivity (first request after sleep takes ~30s to wake up)
- Render auto-deploys on every push to `main`

> **💡 Tip**: To keep the app awake, you can set up a free cron job on [cron-job.org](https://cron-job.org) to ping your URL every 14 minutes.

---

## 🐳 Docker Deployment

### Build the Image

```bash
docker build -t networksecurity .
```

### Run the Container

```bash
docker run -p 8080:8080 --env-file .env networksecurity
```

The API will be available at `http://localhost:8080`.

---

## 📊 Experiment Tracking

All training runs are tracked with **MLflow** via **DagsHub**:

- **Metrics logged**: F1 Score, Precision, Recall (for both train and test sets)
- **Models logged**: Best sklearn model is registered as `NetworkSecurityModel`
- **Dashboard**: [DagsHub MLflow UI](https://dagshub.com/its-me-meax/networksecurity.mlflow)

To set up your own tracking:

1. Create a free [DagsHub](https://dagshub.com) account
2. Connect your GitHub repo to DagsHub
3. Copy the MLflow tracking URI, username, and token
4. Add them to your `.env` file

---

## 🔐 Environment Variables

| Variable                  | Required | Description                           |
|--------------------------|----------|---------------------------------------|
| `MONGODB_URL_KEY`        | ✅       | MongoDB connection string             |
| `MONGO_DB_URL`           | ✅       | MongoDB connection string (duplicate) |
| `MLFLOW_TRACKING_URI`    | ❌       | DagsHub MLflow tracking URL           |
| `MLFLOW_TRACKING_USERNAME`| ❌      | DagsHub username                      |
| `MLFLOW_TRACKING_PASSWORD`| ❌      | DagsHub access token                  |

> **⚠️ Security**: Never commit your `.env` file. It's already in `.gitignore`.

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/your-feature`)
3. **Commit** your changes (`git commit -m 'Add your feature'`)
4. **Push** to the branch (`git push origin feature/your-feature`)
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Pradyuman Sharma** — [@its-me-meax](https://github.com/its-me-meax)
