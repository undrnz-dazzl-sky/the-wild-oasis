import supabase from './supabase.js';

export async function signup({ fullName, email, password }) {
    const { data, error } = await supabase.auth.signUp({
        email, password, options: {
            data: {
                fullName,
                avatar: '',
            }
        }
    })

    if (error) {
        throw new Error('Login error', { cause: error });
    }

    return data;
};

export const login = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        throw new Error('Login error', { cause: error });
    }

    return data;
};

export const getCurrentUser = async () => {
    const { data: session, error: sessionError } = await supabase.auth.getSession();

    if (sessionError) throw new Error('Login error', { cause: sessionError });
    if (!session?.session) return null;

    const { data: user, error: userError } = await supabase.auth.getUser();

    if (userError) throw new Error('Login error', { cause: userError });

    return user?.user;
};

export async function logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
};