export default function formatDate(isoDate) {
    const options = {
         year: 'numeric',
         month: 'long',
        //  month: 'short',
         day: 'numeric' 
        };
    
    return (new Date(isoDate).toLocaleDateString('bg-BG', options));
}


