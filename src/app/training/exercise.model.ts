export interface Exercise {
    id: string;
    name: string;
    duration: number;
    calories: number;
    // optional
    date?: Date;
    // optional OR
    state?: 'completed' | 'cancelled' | null;

}