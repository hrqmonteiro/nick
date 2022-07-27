import axios from 'axios';
import { url } from '../config/variables';

// Cria uma instância para fazer requisições GET, POST, PUT, DELETE
export const api = axios.create({
  baseURL: url,
  headers: {
    
  }
})