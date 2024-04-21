export function areAllValuesNull(obj) {
    for (const key in obj) {
      if (obj[key] !== null) {
        return false; // Return false if any value is not null
      }
    }
    return true; // Return true if all values are null
}

export function nestedIntersection(array1, array2) {
  // Use filter to return subarrays present in both arrays
  return array1.filter(subArray1 => {
    return array2.some(subArray2 => {
      // Check if every element in subArray1 is included in subArray2
      return subArray1.every((element, index) => element === subArray2[index]);
    });
  });
}