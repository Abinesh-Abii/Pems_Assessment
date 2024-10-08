import { BaseUrl } from "./Common";

export const fetchUsersDatas = async (page) => {
    try {
      const response = await fetch(`${BaseUrl}users?_page=${page}&_limit=5`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error; 
    }
  };
  

  export const fetchUserPosts = async (userId, page) => {
    try {
      const response = await fetch(`${BaseUrl}posts?userId=${userId}&_page=${page}&_limit=5`);
      const data = await response.json();
      return data; // Return the fetched data
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error; // Optionally rethrow the error for handling in the component
    }
  };