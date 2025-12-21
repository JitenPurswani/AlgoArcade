FROM motiadev/motia:latest

WORKDIR /app

# Install Node dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy application code
COPY . .

# Extra safety: ensure Python steps are installed
RUN npx motia@latest install

EXPOSE 3000

CMD ["npm", "run", "start"]
