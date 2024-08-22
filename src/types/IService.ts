interface IService {
  _id: string; 
  name: string;
  description: string;
  isBlocked: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export default IService;
