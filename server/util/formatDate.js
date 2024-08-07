const formatDate = (isoDate) => {
    const options = {
         year: 'numeric',
         month: 'long',
         day: 'numeric' 
        };
    
    return new Date(isoDate).toLocaleDateString('bg-BG', options);
};


module.export = formatDate;