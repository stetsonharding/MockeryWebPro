//Crate Mock POST
export const createMock = async (e, token, createMockInputs, workspaceId, router, tag) => {
  e.preventDefault()
 //Headers
 const options = {
   method: "POST",
   headers: {
     "Content-Type": "application/json",
     Authorization: `Bearer ${token}`,
   },
   body: JSON.stringify(createMockInputs),
 };
 //API endpoint
 const url = `/api/workspaces/${workspaceId}/mocks`;
 try {
   // let validJson = validateJSON(usersCreateMockData.mock.content);
   //fetch API
   const promise = await fetch(url, options);
   const res = await promise.json();
   if(res){
    router.push(`/mocksDashboard?id=${workspaceId}`)
   }
 } catch (error) {
  console.log(error)
 }
};


//Function to make sure no duplicate tags
// const duplicateTags = (mockData, tag) => {
//   console.log(mockData)
// for(let mock of mockData) {
//   if(mock.tag === tag) return console.log('dup tag')
// }
// }



//Delete Mock POST
export const deleteMock = async (mockId, token, setMocksList, workspaceId) => {
  const deleteConfirmation = confirm(
    "Are you sure you want to delete this mock?"
  );
  if (!deleteConfirmation) return;
  // const token = data?.accessToken;
  try {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const url = `/api/workspaces/${workspaceId}/mocks/${mockId}`;

    const deletePromise = await fetch(url, options);
    if (deletePromise.ok) {
      //Remove the deleted mock from mocksList
      setMocksList((prevMocks) =>
        prevMocks.filter((mock) => mock.id !== mockId)
      );
    }
  } catch (error) {
    console.log("Error deleting mock:", error.message);
  }
};


//fetch a single mock GET
export const fetchUpdatedMock = async (token, workspaceId, id) => {
  // Headers
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  const url = `/api/workspaces/${workspaceId}/mocks/${id}`;

  try {
    const mockPromise = await fetch(url, options);
    const singleMockData = await mockPromise.json();
    return singleMockData;
  } catch (error) {
    console.log(error.message);
  }
};




