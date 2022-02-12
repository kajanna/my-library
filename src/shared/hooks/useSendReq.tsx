import React, { useState } from 'react';

interface UseSendReqProps {
    url: string,
    method: "POST" | "GET" | "PACTH" | "DELETE",
    body: {} | null,
    headers: {} | null
}

function useSendReq({ url, method }: UseSendReqProps) {
    
    const [ error, setError ] = useState<string | null>(null);
    const [ loading, setLoading ] = useState<boolean>(false);
    
    const sendRequest =  async (url : string, method = 'GET', body=null, headers= {}) => {
        setLoading(true);
        try {
            const response = await fetch (url, {
                method: method,
                headers: headers,
                body: body, 
                });
            
            const responseData = await response.json();
            if (!response.ok) {
                setError(responseData.message);
            }
            setLoading(false);
            return responseData;
        } catch(err:any) {
                setError(err.message || 'Something went wrong!');
                setLoading(false);      
        }
        
        };
    
    const clearErrror = () => {
        setError(null);
    }
  
    return { loading, error, sendRequest, clearErrror };  
             
    }


export default useSendReq;