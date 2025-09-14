import { User } from '../types/auth';

// In-memory user storage (replace with database in production)
class UserStore {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async create(userData: Omit<User, 'id' | 'createdAt'>): Promise<User> {
    const user: User = {
      id: Date.now().toString(), // Simple ID generation (use UUID in production)
      ...userData,
      createdAt: new Date()
    };
    
    this.users.push(user);
    return user;
  }

  async getAll(): Promise<User[]> {
    return this.users;
  }
}

export const userStore = new UserStore();