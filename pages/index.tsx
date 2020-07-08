import Head from "next/head";
import React from "react";
import { GetStaticProps } from "next";
import axios from "axios";

type BlogType = {
  id: string;
  name: string;
};

export const getStaticProps: GetStaticProps = async () => {
  const key = {
    headers: { "X-API-KEY": process.env.API_KEY },
  };

  const response = await axios.get(
    "https://kano.microcms.io/api/v1/portfolio",
    key
  );
  const blogs = (await response.data.contents) as BlogType[];

  return {
    props: {
      blogs,
    },
  };
};

const Index: React.FC<{
  blogs: BlogType[];
}> = ({ blogs }) => {
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {blogs.map((blog) => (
        <li key={blog.id}>{blog.name}</li>
      ))}
    </div>
  );
};

export default Index;
