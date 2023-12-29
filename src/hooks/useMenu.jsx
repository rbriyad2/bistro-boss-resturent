import { useQuery } from "@tanstack/react-query";

const useMenu = () => {


    const {data: menu =[], isLoading: loading, refetch}= useQuery({
        queryKey:['menu'],
        queryFn: async() =>{
            const res= await fetch('https://bistro-boss-server-g9yh1l47b-rbriyad2gmailcoms-projects.vercel.app/menu')
            return res.json()
        }
    })
    return [menu, loading, refetch];
};

export default useMenu;
//fetch useeffect emaon na kore usequery diye use korci easyly

    // const [menu, setMenu] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);

    // useEffect(() => {
    //     fetch('https://bistro-boss-server-g9yh1l47b-rbriyad2gmailcoms-projects.vercel.app/menu')
    //         .then(res => {
    //             if (!res.ok) {
    //                 throw new Error(`HTTP error! Status: ${res.status}`);
    //             }
    //             return res.json();
    //         })
    //         .then(data => {
    //             setMenu(data);
    //             setLoading(false);
    //         })
    //         .catch(error => {
    //             setError(error.message);
    //             setLoading(false);
    //         });
    // }, []);