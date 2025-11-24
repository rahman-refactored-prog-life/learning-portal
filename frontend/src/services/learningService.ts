import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:2025/api';

export interface LearningModule {
  id: number;
  name: string;
  description: string;
  type: string;
  orderIndex: number;
  topicCount?: number;
}

export interface Topic {
  id: number;
  title: string;
  description: string;
  content?: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  orderIndex: number;
  estimatedMinutes: number;
  moduleId: number;
  moduleName?: string;
  questionCount?: number;
  codeExampleCount?: number;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

const learningService = {
  // Module operations
  getAllModules: async (): Promise<LearningModule[]> => {
    const response = await axios.get(`${API_BASE_URL}/learning/modules`);
    return response.data;
  },

  getModuleById: async (id: number): Promise<LearningModule> => {
    const response = await axios.get(`${API_BASE_URL}/learning/modules/${id}`);
    return response.data;
  },

  // Topic operations
  getTopicsByModule: async (
    moduleId: number,
    page: number = 0,
    size: number = 20,
    sortBy: string = 'orderIndex',
    sortDir: string = 'ASC'
  ): Promise<PaginatedResponse<Topic>> => {
    const response = await axios.get(
      `${API_BASE_URL}/learning/modules/${moduleId}/topics`,
      {
        params: { page, size, sortBy, sortDir }
      }
    );
    return response.data;
  },

  searchTopics: async (
    moduleId: number,
    searchTerm: string,
    page: number = 0,
    size: number = 20
  ): Promise<PaginatedResponse<Topic>> => {
    const response = await axios.get(
      `${API_BASE_URL}/learning/modules/${moduleId}/topics/search`,
      {
        params: { q: searchTerm, page, size }
      }
    );
    return response.data;
  },

  getTopicById: async (id: number): Promise<Topic> => {
    const response = await axios.get(`${API_BASE_URL}/learning/topics/${id}`);
    return response.data;
  },
};

export default learningService;
