import Head from "next/head";
import styles from "../styles/Home.module.css";
import Hello from "../components/Hello";
import Counter from "../components/Counter";
import { connectToDatabase } from "../configs/mongodb";
import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setData } from "../redux/features/dataSlice";

export default function Home({ isConnected }) {
  // Local state
  const [isData, setisData] = useState(false);

  const data = useSelector((state) => state.data.data);
  const dispatch = useDispatch();

  const sampleFetcher = () => {
    axios({
      url: "http://localhost:3000/api/hello",
      method: "get",
    }).then((res) => {
      if (res.status === 200) {
        dispatch(setData(res.data));
        setisData(true);
      } else {
        window.alert("Data fetch failed.");
      }
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Theo's NextJS - Redux - Tailwind starter pack.</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hello />
      <Counter />
      {isConnected ? (
        <h2 className="bg-green-400">You are connected to MongoDB</h2>
      ) : (
        <h2 className="bg-red-400">
          You are NOT connected to MongoDB. Check the <code>README.md</code> for
          instructions.
        </h2>
      )}

      <button
        className="bg-gray-900 text-gray-50 text-lg px-8"
        onClick={() => sampleFetcher()}
      >
        Get DATA
      </button>
      {isData
        ? data.map((i) => (
            <div className="bg-gray-500">{JSON.stringify(i)}</div>
          ))
        : null}
    </div>
  );
}

export async function getServerSideProps(context) {
  const { client } = await connectToDatabase();

  const isConnected = await client.isConnected();

  return {
    props: { isConnected },
  };
}
