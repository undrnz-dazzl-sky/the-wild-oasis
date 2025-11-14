import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth.js';
import toast from 'react-hot-toast';

export const useLogin = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { isLoading, mutate: login } = useMutation({
        mutationFn: ({ email, password }) => loginApi({ email, password }),

        onSuccess: data => {
            queryClient.setQueryData(['user'], data.user);
            toast.success('Login successful');
            navigate('/dashboard', { replace: true });
        },

        onError: error => toast.error(`${error.message}: ${error.cause.message}`),
    });

    return { login, isLoading };
};