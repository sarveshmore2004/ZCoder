import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiThumbsUp, FiMessageCircle } from 'react-icons/fi';
import { IoArrowBack } from "react-icons/io5";
import { FaEye } from 'react-icons/fa';
import Header from '../components/Header';

const BlogDetailPage = () => {
  const { id } = useParams();

  // Mock data for a blog post
  const blog = {
    title: 'How to optimize algorithms',
    author: 'JohnDoe',
    date: 'May 25, 2024',
    problemLink: 'https://example.com/problem',
    commentsCount: 12,
    upvotes: 42,
    views: 120,
    tags: ['Optimization', 'Algorithms'],
    content: `
      In this post, we will explore several ways to optimize your algorithms for competitive programming. 
      Optimization is crucial when dealing with large datasets and complex problems.
      
      1. **Use Efficient Data Structures:** Choose the right data structures like heaps, hashmaps, and balanced trees.
      2. **Avoid Unnecessary Computations:** Cache results and avoid redundant calculations.
      3. **Understand Algorithm Complexity:** Be aware of time and space complexity to make better choices.
      4. **Optimize Recursive Algorithms:** Convert recursive solutions to iterative ones if possible to save stack space.
      
      Following these tips will help you create more efficient and faster algorithms.
    `,
  };

  // Mock data for comments
  const comments = [
    { author: 'Commenter1', content: 'Great post! Very informative.' },
    { author: 'Commenter2', content: 'Thanks for the tips on data structures.' },
    { author: 'Commenter3', content: 'I found the section on recursive algorithms particularly useful.' },
  ];

  return (
    <>
      <div className="w-full flex justify-center bg-background drop-shadow-2xl">
        <Header />
      </div>
      <div className="min-h-screen bg-background text-primary_text p-4 flex flex-col items-center">
        
        <div className="w-full lg:w-2/3 bg-background p-4 rounded-lg shadow-lg">
          <div className="mt-4 self-start flex items-center">
            <IoArrowBack className="text-primary "/>
            <Link to="/dashboard" className="text-primary underline"> Back to Dashboard</Link>
          </div>
          <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
          <div className="flex items-center text-secondary_text mb-4">
            <p className="text-sm">by {blog.author}</p>
            <p className="text-sm ml-4">{blog.date}</p>
          </div>
          <p className="text-primary mb-4">
            Problem Link: <a href={blog.problemLink} className="text-primary underline">{blog.problemLink}</a>
          </p>
          <div className="mb-4">
            {blog.tags.map((tag, index) => (
              <span key={index} className="bg-primary/10 text-primary_text/70 px-2 py-1 rounded-full mr-2 text-sm">
                #{tag}
              </span>
            ))}
          </div>
          <div className="flex items-center text-secondary_text mb-4">
            <span className="flex items-center mr-4">
              <FiThumbsUp className="mr-2" /> {blog.upvotes}
            </span>
            <span className="flex items-center mr-4">
              <FiMessageCircle className="mr-2" /> {blog.commentsCount}
            </span>
            <span className="flex items-center mr-4">
              <FaEye className="mr-2" /> {blog.views}
            </span>
          </div>
          <div className="mb-8">
            <p>{blog.content}</p>
          </div>
          <section className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Comments</h2>
            <div className="space-y-4">
              {comments.map((comment, index) => (
                <div key={index} className="bg-background p-4 rounded-lg shadow border border-secondary/80">
                  <p className="text-secondary_text text-sm mb-2">by {comment.author}</p>
                  <p className="text-primary_text">{comment.content}</p>
                </div>
              ))}
            </div>
          </section>
          
        </div>
      </div>
    </>
  );
};

export default BlogDetailPage;
