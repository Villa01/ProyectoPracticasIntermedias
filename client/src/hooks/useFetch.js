import { useEffect, useRef, useState } from "react"

export const useFetch = (url) => {

    const isMounted = useRef(true);

    const [state, setState] = useState({
        data: null,
        error : null,
        loading: true
    });

    useEffect(() => {
        // IsMounted gets false when the component has been mounted. 
        return () => {
            isMounted.current = false;
        }
    }, []);

    useEffect(() => {

        setState({
            data: null,
            error : null,
            loading: true
        });
        
        fetch( url )
            .then( resp => resp.json())
            .then( data => {
                // It will only be true if the componen is mounted
                if ( isMounted.current ){
                    setState({
                        data, 
                        loading : false,
                        error : null,
                    });
                }
            })
            .catch(() => {
                setState({
                    data: null,
                    error : 'Could not reach the information',
                    loading: true
                })
            });

    }, [url]);

    return state;
}
