import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import React, {useEffect, useState} from 'react';
import TodoListItem from '../components/TodoListItem';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [todos, setTodos] = useState([]);

  let state = "due";

  useEffect(() => {
    const fetchList = async () => {
      const res = await fetch('/api/todo?page=0&limit=10&sort=due');
      const data = await res.json();
      state = "due";
      setTodos(data);
    };
    fetchList();
  }, []);

  const priorityFetch = (append: boolean) => {
    const fetchList = async () => {
      const res = await fetch('/api/todo?page=0&limit=10&sort=priority');
      const data = await res.json();
      state = "priority";
      setTodos(data);
    };
    fetchList();
  }

  const dateFetch = (append: boolean) => {
    const fetchList = async () => {
      const res = await fetch('/api/todo?page=0&limit=10&sort=due');
      const data = await res.json();
      state = "date";
      setTodos(data);
    };
    fetchList();
  }

  const descFetch = (description, append: boolean) => {
    const fetchList = async () => {
      const res = await fetch('/api/todo?page=0&limit=10&sort=due&like='+description);
      const data = await res.json();
      state = "desc";
      setTodos(data);
    };
    fetchList();
  }

  const fetchState = () => {
    switch (state){
      case "due":
        dateFetch(true);
    }
  }



  return (
    <>
      <Head>
        <title>TODO List</title>
        <meta name="description" content="TODO List sorted" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>TODO List&nbsp;</p>
          <div>
            <a
              href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
            </a>
          </div>
        </div>

        <div className=" items-center justify-center h-screen">
            <div className="flex items-center mb-6">
              <h1 className="mr-6 text-4xl font-bold text-purple-600">TODO List</h1><br/>
            </div>
          <div className="flex">
            <button className="rounded bg-amber-300 m-2 p-1" onClick={() => priorityFetch(false)}>Priority</button>
            <button className="rounded bg-blue-300 m-2 p-1" onClick={() => dateFetch(false)}>Date</button>
            <form className="rounded m-2 p-1">
              <label>
                <input type="text"
                     onChange={(e) => descFetch( e.target.value, false)}/>
              </label>
            </form>
            {/*form here*/}
          </div>
          {/* use loaded list here*/}
          <ul>
            {todos?.map((todo) => (
                <TodoListItem key={todo.id} todo={todo} />
            ))}
          </ul>
          {todos?.length > 9 &&
              <button className="rounded bg-yellow-200 m-2 p-1" onClick={fetchState}>Load More</button>
          }
        </div>
      </main>
    </>
  )
}
