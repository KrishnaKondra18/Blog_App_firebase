import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState, useCallback } from 'react';
import { useParams } from "react-router-dom";
import BlogSection from "../Components/BlogSection";
import Spinner from "../Components/Spinner";
import { db } from "../firebase";

const CategoryBlog = ({ setActive }) => {
  const [categoryBlogs, setCategoryBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const { category } = useParams();

  // Define getCategoryBlogs using useCallback to ensure stable reference
  const getCategoryBlogs = useCallback(async () => {
    setLoading(true);
    const blogRef = collection(db, "blogs");
    const categoryBlogQuery = query(blogRef, where("category", "==", category));
    const docSnapshot = await getDocs(categoryBlogQuery);
    let categoryBlogs = [];
    docSnapshot.forEach((doc) => {
      categoryBlogs.push({ id: doc.id, ...doc.data() });
    });
    setCategoryBlogs(categoryBlogs);
    setLoading(false);
  }, [category]);

  useEffect(() => {
    getCategoryBlogs();
    setActive(null);
  }, [getCategoryBlogs, setActive]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="blog-heading text-center py-2 mb-4">
            Category: <strong>{category.toLocaleUpperCase()}</strong>
          </div>
          {categoryBlogs?.map((item) => (
            <div className="col-md-6" key={item.id}>
              <BlogSection {...item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryBlog;
