export const formattedDate = (date) => {
    const mth=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    const createdAtDate = new Date(date);
    const day = createdAtDate.getDate();
    const month = createdAtDate.getMonth(); 
    const year = createdAtDate.getFullYear();
  
    return `${day} ${mth[month]}, ${year}`;
}
