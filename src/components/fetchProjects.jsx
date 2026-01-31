import { createClient } from "contentful";
import { useState, useEffect } from "react";
// This file defines a custom React hook to fetch project data from Contentful CMS
// Setup Contentful client with space ID, environment, and access token from environment variables
const client = createClient({
  space: import.meta.env.VITE_SPACE_ID,
  environment: "master",
  accessToken: import.meta.env.VITE_ACCESS_TOKEN,
});
// Custom hook to fetch projects data from Contentful
const useFetchProjects = () => {
  // State to track loading status
  const [isLoading, setIsLoading] = useState(true);
  // State to store fetched projects
  const [projects, setProjects] = useState([]);
  // Async function to fetch data from Contentful
  const fetchData = async () => {
    try {
      // Request entries of content type 'oshriPortfolio'
      const response = await client.getEntries({
        content_type: "oshriPortfolio",
      });
      // Map over response items to extract relevant fields for each project
      const projects = response?.items.map((item) => {
        const { title, text, img, url, github, stack } = item.fields;
        const id = item?.sys?.id;
        const imageSrc = img?.fields?.file?.url;
        return { title, url, id, imageSrc, text, github, stack };
      });
      // Update state with fetched projects and mark loading as false
      setProjects(projects);
      setIsLoading(false);
    } catch (error) {
      // Log any errors and mark loading as false
      console.log(error?.response);
      setIsLoading(false);
    }
  };

  // useEffect to trigger fetchData once on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Return loading state and projects data to consuming components
  return { isLoading, projects };
};

export default useFetchProjects;
