const patchData = async (url, action, data) => {
  
    try {
      const response = await fetch(url, {
        method: action,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        credentials: "include"
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  
  export default patchData;
  