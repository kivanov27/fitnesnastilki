export function isAppRouter() {
    return process.env.NEXT_PUBLIC_IS_APP_ROUTER === 'true';
}

export function useCompatibleRouter() {
    if (isAppRouter()) {
        return require('next/navigation').useRouter();
    }
    else {
        return require('next/router').useRouter();
    }
}
