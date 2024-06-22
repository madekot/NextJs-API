import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface Options {
    isError: boolean;
    redirectPath: string;
    delay?: number;
}

const useErrorRedirect = ({ isError, redirectPath, delay }: Options) => {
    const router = useRouter();

    useEffect(() => {
        if (!isError) {
            return
        }

        const timer = setTimeout(() => {
            router.push(redirectPath);
        }, delay);

        return () => clearTimeout(timer);

    }, [isError, redirectPath, delay, router]);
};

export default useErrorRedirect;