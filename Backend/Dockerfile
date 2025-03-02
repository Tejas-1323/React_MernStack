# ✅ Use a lightweight Node.js base image
FROM node:18-alpine

# ✅ Set the working directory inside the container
WORKDIR /app

# ✅ Copy package.json and package-lock.json first (for efficient caching)
COPY package*.json ./

# ✅ Install dependencies
RUN npm install

# ✅ Copy the rest of the application files
COPY . .

# # ✅ Set environment variables (update as needed)
# ENV PORT=5000
# ENV MONGO_URI=mongodb://mongo:27017/student_db

# ✅ Expose the port
EXPOSE 5000

# ✅ Start the application
CMD ["npm", "start"]
