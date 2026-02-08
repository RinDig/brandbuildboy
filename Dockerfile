FROM node:22-bookworm-slim

WORKDIR /app

ENV PYTHONUNBUFFERED=1

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
    python3 \
    python3-venv \
    python3-pip \
    ca-certificates \
  && rm -rf /var/lib/apt/lists/*

RUN python3 -m venv /opt/venv
ENV PATH="/opt/venv/bin:${PATH}"
ENV PYTHON_BIN="/opt/venv/bin/python"

COPY package.json package-lock.json ./
COPY studio-eduba.io/package.json studio-eduba.io/package-lock.json ./studio-eduba.io/
COPY requirements.txt ./requirements.txt
COPY agent/requirements.txt ./agent/requirements.txt

RUN npm ci \
  && pip install --upgrade pip \
  && pip install -r requirements.txt

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start"]

