
export  function getInitials(fullName){
    
    const names = fullName.split(" ")    //string into an array of names based on spaces.
   
   const initials= names.slice(0,2).map((name)=> name[0].toUpperCase());

   const initialsStr= initials.join("")  //Joins the array of uppercase initials into a single string without any separator.

   return initialsStr;
}   


