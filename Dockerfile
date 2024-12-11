# Dockerfile para API Gateway
FROM node

# Define o diretório de trabalho no contêiner
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./
COPY package-lock*.json ./
# Instala as dependências
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Define a porta que será exposta pelo contêiner
EXPOSE 4000

# Comando para iniciar o serviço
CMD ["node", "index.js"]