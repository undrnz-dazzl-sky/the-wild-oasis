import supabase, { supabaseUrl } from './supabase.js';

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

export async function updateCurrentUser({ password, fullName, avatar }) {

    let updateData;
    if (password) updateData = { password };
    if (fullName) updateData = { data: { fullName } };

    const { data, error: dataUpdateError } = await supabase.auth.updateUser(
        updateData
    );

    if (dataUpdateError) throw new Error(dataUpdateError.message);

    console.log(data.user.user_metadata.avatar?.split("/").at(-1));
    if (!avatar) return data;

    const fileName = `avatar-${data.user.id}-${Math.random()}`;

    const hasImage = data.user.user_metadata.avatar;

    if (hasImage) {
        const existingFilePath = data.user.user_metadata.avatar.split("/")?.at(-1);

        const { data: imageDeleteData, error: imageDeleteError } =
            await supabase.storage.from("avatars").remove([existingFilePath]);

        if (imageDeleteError) throw new Error(imageDeleteError.message);
        console.log("Deleted image ", imageDeleteData);
    }

    const { error: imageUploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, avatar);

    if (imageUploadError) throw new Error(imageUploadError.message);

    const { data: avatarUpdatedData, error: avatarUpdateError } =
        await supabase.auth.updateUser({
            data: {
                avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
            },
        });

    if (avatarUpdateError) throw new Error(avatarUpdateError.message);

    return avatarUpdatedData;
}