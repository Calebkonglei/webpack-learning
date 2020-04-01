import { useState, useEffect } from 'react';

function useNumber() {
    const [number, setNumber] = useState<number>(0);

    useEffect(() => {
        const interval =  setInterval(() => {
            setNumber(number => number + 1);
        }, 1000);

        return () => {
            clearInterval(interval)
        }
    }, []);

    return [number, setNumber]
}

export default useNumber;