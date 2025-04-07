#!/bin/bash

echo "🚀 Iniciando ambiente de desenvolvimento TechHub..."

# Inicia o backend
echo "🔧 Iniciando backend..."
cd backend
npm run dev &

# Inicia o frontend
echo "🎨 Iniciando frontend..."
cd ../frontend
npm run dev &

echo "✅ Ambos frontend e backend foram iniciados."
echo "🌍 Frontend: http://localhost:5173"
echo "🛠️ Backend: http://localhost:5000"
