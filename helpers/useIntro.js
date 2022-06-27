import { useEffect } from 'react';

const useIntro = () => {

    if(typeof window !== "undefined") {
        const storage = typeof window !== "undefined" ? window?.localStorage : false;
        const currTimestamp = Date.now();
        const timestamp = JSON.parse(storage.getItem('timestamp') || '1000');

        const timeLimit = 3 * 60 * 60 * 1000; // 3 hours

        const hasTimePassed = currTimestamp - timestamp > timeLimit;

        useEffect(() => {
            hasTimePassed ? 
                storage.setItem('timestamp', currTimestamp.toString()) 
                : 
                storage.setItem('timestamp', timestamp.toString());
        }, []);

        return hasTimePassed;
    } 

    return true;
    
};

export default useIntro;