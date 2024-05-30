import Api from './Api'

const getUsers = async () => {
    try{
        const response = await Api().get('/getUsers')
        return response
    }catch (error) {
        throw error;
    }
}

const addUser = async (userData) => {
    try {
        const response = await Api().post('/addUser', userData);
        return response;
    } catch (error) {
        throw error;
    }
};

const deleteUser = async (userId) => {
    try{
        const response = await Api().delete(`/deleteUser/${userId}`)
        return response
    }catch (error) {
        throw error;
    }
}

const updateUser = async (userId, updatedData) => {
    try {
      const response = await Api().put(`/updateUser/${userId}`, updatedData);
      return response
    } catch (error) {
      throw error;
    }
  };

export {
    getUsers,
    addUser,
    deleteUser,
    updateUser
}


