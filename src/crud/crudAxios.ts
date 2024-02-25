import axios from 'axios';



export const getDatos = async (url :string ) : Promise<any> => {
    
    const resultado = await axios.get(url)      
    return resultado.data
}

