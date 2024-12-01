export type ProfileState = { status: 'login' } | { status: 'logged-in'; username: string; id: number };

export type LoadDataState = 'pagination' | 'infinite';

export type TabState = 'all' | 'pending' | 'completed';
