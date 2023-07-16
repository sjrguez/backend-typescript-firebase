import { TaskDto } from "../interfaces/task.dto";
import { dataBaseCollection } from '../../config/database'

export class TaskRepository {
    public db: dataBaseCollection
    constructor( private readonly opts: any){
        this.db = this.opts.db
    }


    getAllTasks = async (): Promise<TaskDto[]> => {
        const snapshot = await this.db.collection('tasks').get();
        return snapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data(),
        })) as TaskDto[];
    };

    createTask = async (taskData: Partial<TaskDto>): Promise<string> => {
        const docRef = await this.db.collection('tasks').add(taskData);
        return docRef.id;
    };

    updateTask = async (taskId: string, taskData: Partial<TaskDto>): Promise<string> => {
        await this.db.collection('tasks').doc(taskId).update(taskData);
        return taskId
    };

    deleteTask = async (taskId: string): Promise<string> => {
        await this.db.collection('tasks').doc(taskId).delete();
        return taskId
    };

    async getTaskById(id: string): Promise<TaskDto | null> {
        const snapshot = await this.db.collection('tasks').doc(id).get();
    
        if (!snapshot.exists) {
          return null;
        }
        const taskData = snapshot.data() as TaskDto;
        taskData.id = snapshot.id;
        return taskData;
      }
}